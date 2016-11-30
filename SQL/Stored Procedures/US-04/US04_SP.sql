USE WTA;

DELIMITER ;
DROP PROCEDURE IF EXISTS update_request;
DELIMITER $$
CREATE PROCEDURE update_request(IN requestID INT,IN StartDate DATE, IN EndDate DATE, IN UserID INT)
BEGIN
-- This procedure updates the WTA Request

SET @gears := (SELECT JSON_EXTRACT(JSON_data, '$.gears'));

-- update request in request table

UPDATE request
SET start_date= StartDate, end_date= EndDate,customer_id= UserID 
WHERE id=@requestID;
-- Reserve the gear for the request
CALL reserve_gear(@gears, @request_id);
    
END$$
DELIMITER ;
DROP PROCEDURE IF EXISTS reserve_gear;
DELIMITER $$
CREATE PROCEDURE reserve_gear(IN gears JSON, IN requestID INT)
BEGIN
-- This procedure reserves the gears for the request
  DECLARE int_i INT DEFAULT 0;
  DECLARE int_length INT DEFAULT 0;
  DECLARE gear_id INT DEFAULT 0;
  DECLARE quantity INT DEFAULT 0;
  
  SET int_length := (SELECT JSON_LENGTH(gears));
 -- release the previously reserved gears
 DELETE FROM reserved_item 
 WHERE request_id=requestID;
 
 -- Looping through gears and inserted them in the reserved_item table
  label1 : LOOP
    IF(int_i < int_length) THEN
		SET gear_id := (SELECT JSON_EXTRACT(gears, CONCAT('$[',int_i,'].id')));
        SET quantity := (SELECT JSON_EXTRACT(gears, CONCAT('$[',int_i,'].quantity')));
		INSERT INTO reserved_item(Quantity, request_id, item_id) values(quantity, requestID, gear_id);
		SET int_i = int_i + 1;
		ITERATE label1;
    END IF;
	LEAVE label1;
  END LOOP;
END$$
DELIMITER ;

DROP FUNCTION IF EXISTS check_gear_availability;
DELIMITER $$
CREATE FUNCTION check_gear_availability(gears JSON, StartDate DATE, EndDate DATE) RETURNS tinyint(1)
BEGIN
-- This functions checks if the gears are still available before submitting the request
  DECLARE int_i INT DEFAULT 0;
  DECLARE int_length INT DEFAULT 0;
  DECLARE gear_id INT DEFAULT 0;
  DECLARE quantity INT DEFAULT 0;
  SET int_length := (SELECT JSON_LENGTH(gears));
  
  
	DROP TEMPORARY TABLE IF EXISTS Gears_available;
	CREATE TEMPORARY Table Gears_available (
		ID INT NOT NULL,
        QuantityAvailable INT NOT NULL
    );
    
		INSERT INTO Gears_available			
			SELECT  Inventory.id,
            IFNULL(Inventory.total_quantity - SUM(ReservedGears.quantity), Inventory.total_quantity) as QuantityAvailable     
        FROM ( 
            SELECT a.id as GearID, SUM(b.quantity) as quantity
            FROM gear_item as a
            JOIN reserved_item as b
                ON a.id = b.item_id
            JOIN request as c
                ON b.request_id = c.id
            JOIN status as d
                ON c.status_id = d.id
            WHERE (c.start_date between StartDate and EndDate || c.end_date between StartDate and EndDate) AND
                  (d.status LIKE '%requested%' OR d.status LIKE '%approved%' OR d.status like '%picked_up%')
            GROUP BY GearID) 
            as ReservedGears
        right JOIN gear_item as Inventory
            ON Inventory.id = ReservedGears.GearID
        JOIN size
            ON size.id = Inventory.size_id
        GROUP BY Inventory.id;

  -- Looping through gears and inserted them in the reserved_item table
  label1 : LOOP
    IF(int_i < int_length) THEN
		SET gear_id := (SELECT JSON_EXTRACT(gears, CONCAT('$[',int_i,'].id')));
        SET quantity := (SELECT JSON_EXTRACT(gears, CONCAT('$[',int_i,'].quantity')));
        SET @value := (SELECT QuantityAvailable FROM gears_available WHERE gears_available.ID = gear_id);
        IF (@value < quantity) THEN
			DROP TEMPORARY TABLE IF EXISTS Gears_available;
			RETURN FALSE;
        END IF;
		SET int_i = int_i + 1;
		ITERATE label1;
    END IF;
	LEAVE label1;
  END LOOP;
  DROP TEMPORARY TABLE IF EXISTS Gears_available;
  RETURN TRUE;
END$$
DELIMITER ;