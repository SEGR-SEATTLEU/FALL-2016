-- Inserting Values Into Tables
INSERT INTO Role(name)values('Trip Leader');
INSERT INTO personnel_information(name, role_id,email,phone_number) values('Bob', 1, 'abc@null.com', '222-222-2222');
INSERT INTO size(name_of_size) values('XL');
INSERT INTO gender(name) values('Male');
INSERT INTO gender(name) values('Female');
INSERT INTO gear_item(name, description, image_url, care_and_maintenance, sizing_table, 
				total_quantity, size_id, gender_id) 
	values('Fleece Jacket', 'This is a fleece jacket, nothing special.', 
		'link to sizing table', 'Hand wash only', 'link to sizing table', 20, 1, 1);

INSERT INTO `wta_new`.`status` (`request_status`) VALUES ('Approved');
INSERT INTO `wta_new`.`status` (`request_status`) VALUES ('Completed');
INSERT INTO `wta_new`.`request` (`start_date`, `end_date`, `personnel_information_id`, `status_id`) VALUES ('2016-10-02', '2016-10-04', '1', '1');
INSERT INTO `wta_new`.`request` (`start_date`, `end_date`, `personnel_information_id`, `status_id`) VALUES ('2016-10-06', '2016-10-08', '1', '1');
INSERT INTO `wta_new`.`request` (`start_date`, `end_date`, `personnel_information_id`, `status_id`) VALUES ('2016-10-03', '2016-10-07', '1', '1');
INSERT INTO `wta_new`.`reserved_item` (`quantity`, `request_id`, `gear_item_id`) VALUES ('4', '1', '1');
INSERT INTO `wta_new`.`reserved_item` (`quantity`, `request_id`, `gear_item_id`) VALUES ('7', '2', '1');
INSERT INTO `wta_new`.`reserved_item` (`quantity`, `request_id`, `gear_item_id`) VALUES ('2', '3', '1');


