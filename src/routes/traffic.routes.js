const express = require("express")
const routes = express.Router();

const trafficController = require("../controllers/traffic.controller")

routes.get("/:cameraId/raw", trafficController.getAllRaw)
routes.get("/:cameraId", trafficController.getAll)
routes.get("/:cameraId/search", trafficController.getByHour)
routes.get("/:cameraId/count", trafficController.filterVehicleCountByHour)

module.exports = routes
