const trafficService = require("../services/traffic.service")

module.exports = {
    async getAllRaw(req, res) {
        const {cameraId} = req.params;

        data = await trafficService.getAllRaw(cameraId)

        return res.json(data)
    },

    async getAll(req, res) {
        const {cameraId} = req.params;

        data = await trafficService.getAll(cameraId)

        return res.json(data)
    },

    async getByHour(req, res) {
        const {cameraId} = req.params;

        const {hour} = req.query

        data = await trafficService.getByHour(cameraId, hour)

        return res.json(data)
    },

    async filterVehicleCountByHour(req, res) {
        const {cameraId} = req.params;

        date = {
            year: req.query.year,
            month: req.query.month,
            day: req.query.day
        }

        points = {
            start: req.query.start,
            final: req.query.final
        }

        data = await trafficService.filterVehicleCountByHour(cameraId, date, points)

        return res.json(data)
    },
}