CREATE DEFINER=`root`@`localhost` PROCEDURE `getUpcomingPickUps`(IN DAYS_FROM_PICK_UP INT)
BEGIN
SELECT personal_information.name, email
	FROM personal_information
    INNER JOIN request
    ON personal_information.id = request.personal_information_id
    /* find email when request start date - DAYS_FROM_PICK_UP equals today and the request
       status is approved */
	WHERE SUBDATE(start_date, INTERVAL DAYS_FROM_PICK_UP DAY) = CURDATE() 
		AND
		status_id = 5;
END