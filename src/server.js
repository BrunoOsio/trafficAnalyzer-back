require("dotenv").config();
const express = require("express")
const path = require("path")
const app = express();

   
const trafficRoutes = require("./routes/traffic.routes")

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/traffic", trafficRoutes)

app.listen(process.env.PORT, () => {
    console.log(`TrafficAnalyzer server listening on port ${process.env.PORT}`)
});