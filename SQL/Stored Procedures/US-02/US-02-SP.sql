use `wta`;

DROP PROCEDURE IF EXISTS GetMoreGearDetails;
CREATE PROCEDURE GetMoreGearDetails(IN `GearId` INT)
	SELECT id, `name`, image_url, care_maintenance, sizing_table, description FROM gear_item WHERE gear_item.id = GearId;
    
	/*SELECT image_url.gi, care_maintenance.gi, sizing_table.gi, description.gi FROM gear_item gi WHERE id = '20';*/
    
/*CALL GetMoreGearDetails(10);*/