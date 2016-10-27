DELIMITER $$

DROP PROCEDURE IF EXISTS gear_availability$$
DROP TABLE IF EXISTS output$$
DROP TABLE IF EXISTS temp$$
SET SQL_SAFE_UPDATES=0$$

CREATE PROCEDURE gear_availability(begin_date DATE, end_date DATE)
BEGIN

	DECLARE temp_item_id INT;
    DECLARE temp_quantity INT;
    DECLARE temp_date DATE;
    DECLARE sum_quantity INT;
    DECLARE done INT DEFAULT 0;
    
    DECLARE item_cur CURSOR FOR
		SELECT id, total_quantity FROM gear_item;
        
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

	CREATE TEMPORARY TABLE output
			(item_id INT, availability INT);

	CREATE TEMPORARY TABLE temp
			(requested_date DATE, availability INT);
	
    OPEN item_cur;
    item_loop:
    LOOP FETCH item_cur INTO temp_item_id, temp_quantity;

			IF done = 1 THEN
				LEAVE item_loop;
			END IF;
            
            SET temp_date = begin_date;
            DELETE FROM temp;
            
            /*Loops through each date of given date range*/
			WHILE(temp_date <= end_date) DO
                
                /*Calcuates approved quantity for each date*/
				SELECT sum(grd.quantity) INTO sum_quantity FROM REQUEST gr, RESERVED_ITEM grd 
				WHERE gr.id = grd.request_id AND gr.status_id = 1 
				AND temp_date between gr.start_date and gr.end_date
				AND grd.gear_item_id=temp_item_id;
                
				INSERT INTO temp VALUES(temp_date, temp_quantity-sum_quantity);
                SET temp_date = temp_date + 1;
                
			END WHILE;
            INSERT INTO output VALUES(temp_item_id, (SELECT MIN(availability) FROM temp));

	END LOOP item_loop;
    CLOSE item_cur;

	/*Item Name and their available quantity for the given date range*/
	SELECT i.name AS 'ItemName', s.name_of_size AS 'Size', i.total_quantity AS 'TotalQuantity', o.availability AS 'AvailableQuantity' 
    FROM output o ,gear_item i, size s where i.id=o.item_id AND i.size_id=s.id AND o.availability <> 0 ;
    
	DROP TABLE output;
    DROP TABLE temp;
    SET SQL_SAFE_UPDATES=0;

END$$
