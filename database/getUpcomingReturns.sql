CREATE DEFINER=`root`@`localhost` PROCEDURE `getUpcomingReturns`(IN DAYS_FROM_RETURN INT)
BEGIN
SELECT personal_information.name, email
	FROM personal_information
    INNER JOIN request
    ON personal_information.id = request.personal_information_id
    /* find email when request start date - DAYS_FROM_PICK_UP equals today and the request
       status is 'picked up' */
	WHERE SUBDATE(end_date, INTERVAL DAYS_FROM_RETURN DAY) = CURDATE() 
		AND
		status_id = 7;
END