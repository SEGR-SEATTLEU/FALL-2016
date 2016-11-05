USE WTA;
DELIMITER ;
DROP PROCEDURE IF EXISTS get_gear_inventory;
DELIMITER $$
CREATE PROCEDURE `get_gear_inventory`()
BEGIN
		SELECT  Inventory.id, Inventory.name, 
			size.size,
			IFNULL(Inventory.total_quantity - SUM(ReservedGears.quantity), Inventory.total_quantity) as QuantityAvailable	 
		FROM ( 
			SELECT a.id as GearID, SUM(b.quantity) as quantity
			FROM gear_item as a
			JOIN reserved_item as b
				ON a.id = b.item_id
                GROUP BY GearID) 
			as ReservedGears
		right JOIN gear_item as Inventory
			ON Inventory.id = ReservedGears.GearID
		JOIN size
			ON size.id = Inventory.size_id
		GROUP BY Inventory.id, Inventory.name, size.size;
 END$$
DELIMITER ;

 CALL get_gear_inventory()