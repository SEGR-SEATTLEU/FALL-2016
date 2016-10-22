DROP PROCEDURE Inventory;
CREATE PROCEDURE Inventory() READS SQL DATA
	SELECT gr.gender, sz.size, gi.`name`, gi.total_quantity total 
		FROM gear_item gi 
        JOIN size sz on gi.size_id=sz.id 
        JOIN gender gr on gi.gender_id=gr.id;

DROP PROCEDURE ReservedItems;
CREATE PROCEDURE ReservedItems(IN `PickupDate` DATE, IN `ReturnDate` DATE) READS SQL DATA
   SELECT gr.gender, sz.size, gi.name, SUM(ri.quantity) AmountReserved
	FROM reserved_item ri 
	JOIN gear_item gi ON ri.item_id = gi.id
	JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
	JOIN request rq ON ri.request_id = rq.id
	WHERE
	rq.end_date >= PickupDate AND rq.start_date <= ReturnDate
	GROUP BY gender, size, name;

DROP PROCEDURE AvailableItems;
CREATE PROCEDURE AvailableItems(IN `PickupDate` DATE, IN `ReturnDate` DATE) READS SQL DATA
    SELECT inv.gender, inv.size, inv.name, (inv.total - res.total) as AvailableAmount
    FROM
   /* Inventory */
   (SELECT gr.gender, sz.size, gi.`name`, gi.total_quantity total from gear_item gi join size sz on gi.size_id=sz.id join gender gr on gi.gender_id=gr.id)
   as inv
   JOIN
   /* Reserved items */
   (SELECT gr.gender, sz.size, gi.`name`, SUM(ri.quantity) total
	FROM reserved_item ri 
	JOIN gear_item gi ON ri.item_id = gi.id
	JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
	JOIN request rq ON ri.request_id = rq.id
	WHERE
	rq.end_date >= PickupDate AND rq.start_date <= ReturnDate
	GROUP BY gender, size, name) as res
    ON inv.gender = inv.res.gender AND inv.size = res.size AND inv.name = res.name;
    
DROP PROCEDURE RequestsDueForReturn;
CREATE PROCEDURE RequestsDueForReturn(IN `DueDate` DATE) READS SQL DATA
	SELECT rq.id request_id, rq.end_date due_date, cr.`name` borrower, cr.email, 
			gr.gender, sz.size, gi.`name`, ri.quantity
		FROM request rq
        JOIN personnel_info cr ON rq.customer_id = cr.id
        JOIN reserved_item ri ON rq.id = ri.request_id
        JOIN gear_item gi ON ri.item_id = gi.id
        JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
        WHERE rq.end_date <= DueDate;
        
CALL RequestsDueForReturn('2016-11-12');
/*
Examples:
CALL Inventory;
CALL ReservedItems('2016-11-04', '2016-11-08');
CALL AvailableItems('2016-11-04', '2016-11-08');
*/