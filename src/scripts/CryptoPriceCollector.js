const envData = require('dotenv');
const request = require('request')
const path = require('path')
const emailService = require('../service/EmailService');
const db = require('../models/sqlite');

envData.config({path: path.resolve(__dirname, '../env/.env')});

/**
 * Function to get crypto price from ConGecko
 */
async function pollBTCData() {
    
    return new Promise(async function (resolve, reject) {
        var coinGeckoBTCUrl = process.env.COIN_GECKO_BTC_API;
        console.log(coinGeckoBTCUrl)
        var options = {
            method: 'GET',
            url: coinGeckoBTCUrl
        }

        request(options, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                var btcData = JSON.parse(body);
                resolve(btcData);
            }
        });
    });
}

async function collect() {
    try {
        var btcData = await pollBTCData();        
        var price = Math.round(btcData.market_data.current_price.usd)
        console.log(`Crypto price collected ${price}`)
        db.insert("btc", price, getCurrentDate());  
        emailService.notify(price);
        
    } catch(error) {
        console.log("Error occured while collecting prices "+ error);
    }
}

function getCurrentDate() {

    var currentDate = new Date();    
    var month = currentDate.getMonth() + 1; // javascript months start from 0, Add 1 to get accurate month
    console.log(month);
    if (month < 10) month = "0" + month;
    var dateOfMonth = currentDate.getDate();
    if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
    var year = currentDate.getFullYear();
    var formattedDate = dateOfMonth + "-" + month + "-" + year;
    console.log(formattedDate);
    return formattedDate;

}

async function start() {
    const interval = setInterval(() => {
        collect();
    }, process.env.COLLECTION_INTERVAL);
}

start();