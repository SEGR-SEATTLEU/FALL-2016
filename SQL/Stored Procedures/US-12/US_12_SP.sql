USE WTA;
DELIMITER $$
CREATE PROCEDURE Gear_Availability(IN StartDate DATE, IN EndDate DATE)
BEGIN
	SELECT id,
	QuantityAvailable_by_request.name,
	MIN(QuantityAvailable) as QuantityAvailable 
	FROM(
		SELECT Inventory.id, Inventory.name,
		start_date,
		end_date,
		IFNULL(Inventory.total_quantity - SUM(ReservedGears_by_request.quantity), Inventory.total_quantity) as QuantityAvailable
		FROM ( 
			SELECT a.id as GearID, c.start_date, c.end_date, SUM(b.quantity) as quantity
			FROM gear_item as a
			JOIN reserved_item as b
				ON a.id = b.item_id
			JOIN request as c
				ON b.request_id = c.id
			JOIN status as d
				ON c.status_id = d.id
			WHERE (c.start_date between StartDate and EndDate && c.end_date between StartDate and EndDate) AND
				  (d.status LIKE '%requested%' OR d.status LIKE '%approved%' OR d.status like '%picked_up%')
			GROUP BY GearID, a.id, c.start_date, c.end_date) 
			as ReservedGears_by_Request
		RIGHT JOIN gear_item as Inventory
			ON Inventory.id = ReservedGears_by_Request.GearID
		JOIN size
			ON size.id = Inventory.size_id
		GROUP BY Inventory.id, Inventory.name, start_date, end_date 
	) as QuantityAvailable_by_request
	GROUP BY ID, QuantityAvailable_by_request.name;
 END$$
 DELIMITER ;
        
