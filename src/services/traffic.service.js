const knex = require("../database/config");
const Date = require("../helpers/date.helpers");

module.exports = {
    async getAllRaw(cameraId) {
        try {
            const data = await knex
            .select()
            .from("tb_traffic as a")
            .innerJoin("tb_point as b", "a.id_point", "b.id_point")
            .innerJoin("tb_vehicle as c", "a.id_vehicle", "c.id_vehicle")
            .innerJoin("tb_type as d", "c.id_type", "d.id_type")
            .where("a.id_camera", cameraId)
            .orderBy("a.timestamp")
    
            return data
        } catch (error) {
           console.error(error) 
        }  
    },

    async getAll(cameraId) {
        try {
            const data = await knex
            .select([
                "tb_traffic.id_traffic as id",
                "tb_traffic.id_camera as cameraId", 
                "tb_point.first_point as startingPoint", 
                "tb_point.last_point as finalPoint", 
                "tb_type.id_type as vehicleTypeId",
                knex.raw("time(tb_traffic.timestamp) as timestamp"), 
            ])
            .from("tb_traffic")
            .innerJoin("tb_point", "tb_point.id_point", "tb_traffic.id_point")
            .innerJoin("tb_vehicle", "tb_vehicle.id_vehicle", "tb_traffic.id_vehicle")
            .innerJoin("tb_type", "tb_type.id_type", "tb_vehicle.id_vehicle")
            .where("a.id_camera", cameraId)
            .orderBy("tb_traffic.timestamp")
    
            return data
        } catch (error) {
           console.error(error) 
        }    
    },

    async filterByHour(cameraId, hour) {
        try {
            const data = await knex
            .select([
                "tb_traffic.id_traffic as id",
                "tb_traffic.id_camera as cameraId", 
                "tb_point.first_point as startingPoint", 
                "tb_point.last_point as finalPoint", 
                "tb_type.id_type as vehicleTypeId",
                knex.raw("time(tb_traffic.timestamp) as time"),
            ])
            .from("tb_traffic")
            .innerJoin("tb_point", "tb_point.id_point", "tb_traffic.id_point")
            .innerJoin("tb_vehicle", "tb_vehicle.id_vehicle", "tb_traffic.id_vehicle")
            .innerJoin("tb_type", "tb_type.id_type", "tb_vehicle.id_vehicle")
            .where("a.id_camera", cameraId)
            .andwhere(knex.raw("hour(tb_traffic.timestamp)"), hour)
    
            return data

        } catch (error) {
           console.error(error) 
        }  
    },

    async filterVehicleCountByHour(cameraId, date, points) {
        let dataArray = [];
        if(Date.isUndefined(date))
            date = Date.setToNow()

        const API_DATE_FORMAT = "YYYY-M-D";
        newDate = Date.format(API_DATE_FORMAT, date);

        let {year, month, day} = newDate;
        console.log("DEBUG"+"\n"+year + "\n" + month + "\n" + day)
        const STARTING_HOUR = 0 //0:00 A.M.
        const FINAL_HOUR = 23 //23:00 P.M.

        try {
            for(let hour=STARTING_HOUR; hour<=FINAL_HOUR; hour++){
                const data = await knex
                .select("c.id_type as type")
                .count("a.id_vehicle as count")
                .sum("c.pcu_value as pcu")
                .from("tb_traffic as a")
                .innerJoin("tb_vehicle as b", "a.id_vehicle", "b.id_vehicle")
                .innerJoin("tb_type as c", "b.id_type", "c.id_type")
                .innerJoin("tb_point as d", "a.id_point", "d.id_point")
                .where("a.id_camera", cameraId)
                .andWhere(knex.raw("hour(a.timestamp)"), hour)
                .andWhere(knex.raw("day(a.timestamp)"), day)
                .andWhere(knex.raw("month(a.timestamp)"), month)
                .andWhere(knex.raw("year(a.timestamp)"), year)
                .andWhere((builder) => {
                    const {start, final} = points

                    if (start && final) {
                        builder.where("d.first_point", start)
                        builder.where("d.last_point", final)
                    }
                })
                .groupBy("b.id_type");

                dataArray.push({[hour]: {"vehicles": data}})
            }

            return dataArray

        } catch (error) {
           console.error(error) 
        }  
    },
}