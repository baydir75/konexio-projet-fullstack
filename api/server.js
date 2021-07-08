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
                capital: COUNTRIES_DATA[i].capital,
                region: COUNTRIES_DATA[i].region
            });
        }
    }
})

APP.get("/capital/:capital", (req, res) => {
    for (i = 0; i < COUNTRIES_DATA.length; i++) {
        if (req.params.capital.toUpperCase() === COUNTRIES_DATA[i].capital.toUpperCase()) {
            res.json({
                capital: COUNTRIES_DATA[i].capital,
                region: COUNTRIES_DATA[i].region,
                name: COUNTRIES_DATA[i].name
            });
        }
    }
})

APP.get("/region/:region", (req, res) => {
    for (i = 0; i < COUNTRIES_DATA.length; i++) {
        let result = COUNTRIES_DATA.filter((country) => req.params.region.toUpperCase() === country.region.toUpperCase())
        res.json({
            data: result
        })
    }
})



APP.listen(PORT, () => {
    console.log("Test !")
})