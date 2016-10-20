DELIMITER $$
CREATE PROCEDURE `ReserveItem`(IN RequestID INT, IN Quantity INT, IN GearID INT)
BEGIN
INSERT INTO reserved_item(quantity, request_id, gear_item_id) values(Quantity, RequestID, GearID);
END$$
DELIMITER ;
