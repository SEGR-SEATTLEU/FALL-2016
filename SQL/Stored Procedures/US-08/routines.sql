use `wta`;

DROP PROCEDURE IF EXISTS Inventory;
CREATE PROCEDURE Inventory() READS SQL DATA
	SELECT gr.gender, sz.size, gi.`name`, gi.total_quantity total 
		FROM gear_item gi 
        JOIN size sz on gi.size_id=sz.id 
        JOIN gender gr on gi.gender_id=gr.id;

DROP PROCEDURE IF EXISTS ReservedItems;
CREATE PROCEDURE ReservedItems(IN `PickupDate` DATE, IN `ReturnDate` DATE) READS SQL DATA
   SELECT gr.gender, sz.size, gi.name, SUM(ri.quantity) AmountReserved
	FROM reserved_item ri 
	JOIN gear_item gi ON ri.item_id = gi.id
	JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
	JOIN request rq ON ri.request_id = rq.id
	WHERE
	rq.end_date >= PickupDate AND rq.start_date <= ReturnDate
	GROUP BY gender, size, name;

DROP PROCEDURE IF EXISTS AvailableItems;
CREATE PROCEDURE AvailableItems(IN `PickupDate` DATE, IN `ReturnDate` DATE) READS SQL DATA
	SELECT inv.gender, inv.size, inv.name, (inv.total - IFNULL(res.total, 0)) as AvailableAmount
    FROM
   /* Inventory */
   (SELECT gr.gender, sz.size, gi.`name`, gi.total_quantity total from gear_item gi join size sz on gi.size_id=sz.id join gender gr on gi.gender_id=gr.id)
   as inv
   LEFT JOIN
   /* Reserved items */
   (SELECT gr.gender, sz.size, gi.`name`, SUM(ri.quantity) total
	FROM reserved_item ri 
	JOIN gear_item gi ON ri.item_id = gi.id
	JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
	JOIN request rq ON ri.request_id = rq.id
	WHERE
	rq.end_date >= PickupDate AND rq.start_date <= ReturnDate
	GROUP BY gender, size, name) as res
    ON inv.gender = res.gender AND inv.size = res.size AND inv.name = res.name;
    
DROP PROCEDURE IF EXISTS RequestsDueForReturn;
CREATE PROCEDURE RequestsDueForReturn() READS SQL DATA
	SELECT rq.id request_id, rq.end_date due_date, st.`status`, cr.`name` borrower, cr.email, 
			gr.gender, sz.size, gi.`name`, ri.quantity
		FROM request rq
        JOIN `status` st ON rq.status_id = st.id
        JOIN personnel_info cr ON rq.customer_id = cr.id
        JOIN reserved_item ri ON rq.id = ri.request_id
        JOIN gear_item gi ON ri.item_id = gi.id
        JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
        WHERE st.id = 3;
        
DROP PROCEDURE IF EXISTS SetRequestStatus;
CREATE PROCEDURE SetRequestStatus(IN `RequestId` INT, IN `Status` INT)
	UPDATE request set status_id=`Status` WHERE request.id = RequestId;
    
DROP PROCEDURE IF EXISTS MarkRequestReturned;
CREATE PROCEDURE MarkRequestReturned(IN `RequestId` INT)
	UPDATE request set status_id=4 WHERE request.id = RequestId;
    
DROP PROCEDURE IF EXISTS ViewRequestDetail;
CREATE PROCEDURE ViewRequestDetail(IN `RequestId` INT) READS SQL DATA
	SELECT rq.id request_id, rq.end_date due_date, st.`status`, cr.`name` borrower, cr.email, 
			gr.gender, sz.size, gi.`name`, ri.quantity
		FROM request rq
        JOIN `status` st ON rq.status_id = st.id
        JOIN personnel_info cr ON rq.customer_id = cr.id
        JOIN reserved_item ri ON rq.id = ri.request_id
        JOIN gear_item gi ON ri.item_id = gi.id
        JOIN size sz ON gi.size_id = sz.id JOIN gender gr on gi.gender_id = gr.id
        WHERE rq.id = RequestId;

/*

CALL ViewRequestDetail(1);

CALL SetRequestStatus(1, 7);
CALL SetRequestStatus(2, 6);
CALL SetRequestStatus(3, 7);

CALL SetRequestStatus('1', '8');
CALL RequestsDueForReturn();

Examples:
CALL Inventory;
CALL ReservedItems('2016-11-04', '2016-11-08');
CALL AvailableItems('2016-11-04', '2016-11-08');
*/