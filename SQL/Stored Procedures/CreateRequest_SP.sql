DELIMITER $$
CREATE PROCEDURE `CreateRequest`(IN StartDate DATE, IN EndDate DATE, IN UserID INT)
BEGIN
select id into @status_id from status 
where request_status like '%Pending%';
INSERT INTO request(start_date, end_date, personnel_information_id,status_id) values(StartDate, EndDate, UserID, @status_id);
SELECT last_insert_id() as RequestID;
END$$
DELIMITER ;
