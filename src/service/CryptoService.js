const db = require('../models/sqlite');

/**
 *  Save crypto  prices along with date
 */
async function saveCryptoPrices(cryptoType, cryptoPrice) {
    db.saveCryptoPrices(cryptoType, cryptoPrice)
}

/**
 * Find crypto prices based on date with pagination
 * @param {*} date 
 * @param {*} offset 
 * @param {*} limit 
 * @returns 
 */
async function findAll(date, offset, limit) {
    return new Promise(async function (resolve, reject) {
        resolve(db.findAll(date, offset, limit));
    });
}

module.exports = {saveCryptoPrices, findAll}