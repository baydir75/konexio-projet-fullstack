const EXPRESS = require("express");
const APP = EXPRESS();
const CORS = require('cors');
APP.use(CORS());
const PORT = 8000;
const COUNTRIES_DATA = require("./CountriesData.json");

APP.get("/all", (req, res) => {
    res.send(COUNTRIES_DATA);
})

APP.get("/:country", (req, res) => {
    for (i = 0; i < COUNTRIES_DATA.length; i++) {
        if (req.params.country.toUpperCase() === COUNTRIES_DATA[i].name.toUpperCase()) {
            res.json({
                Capital : COUNTRIES_DATA[i].capital,
                Region : COUNTRIES_DATA[i].region
            });
        }
    }
})

APP.get("/capital/:capital", (req, res) => {
    for (i = 0; i < COUNTRIES_DATA.length; i++) {
        if (req.params.capital.toUpperCase() === COUNTRIES_DATA[i].capital.toUpperCase()) {
            res.json({
                Capital : COUNTRIES_DATA[i].capital,
                Region : COUNTRIES_DATA[i].region,
                Name : COUNTRIES_DATA[i].name
            });
        }
    }
})

APP.listen(PORT, () => {
    console.log("Test !")
})