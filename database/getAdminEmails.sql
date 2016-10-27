CREATE DEFINER=`root`@`localhost` PROCEDURE `getAdminEmails`()
BEGIN
SELECT email
	FROM personal_information
	WHERE roles_id = 2;
END