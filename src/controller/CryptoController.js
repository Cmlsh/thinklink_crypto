const express = require('express')
const fs = require("fs");
const app = express()
const cryptoService = require('../service/CryptoService');

/**
 * API endpoint to access crypto prices stored in db
 */
app.route('/api/prices/btc') 
    .get(async (req,res) => {
        var date = req.query.date;
        var offset = req.query.offset;
        var limit = req.query.limit;

        if(date == null || offset == null || limit == null) {
            res.status(400).send({
                message: "Parameters can not be empty"
            });
        }

        var cryptos = await 
        cryptoService.findAll(date, offset, limit);
        res.send(cryptos)

    });

app.listen(3000 , ()=>{
    console.log("server running");
});
