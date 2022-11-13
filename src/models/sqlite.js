var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('thinklink');

db.serialize(function() {
    db.run("CREATE TABLE if not exists crypto (type TEXT, price INTEGER, date TEXT)");    
});

async function insert(type, price, date) {

    var stmt = db.prepare("INSERT INTO crypto VALUES(?,?,?)");
    stmt.run(type, price,date);
    stmt.finalize();
}

async function findAll(date, offset, limit) {

    
    return new Promise(async function (resolve, reject) {
        cryptos = []
        db.all(`SELECT * FROM crypto WHERE date = '${date}' limit ${offset}, ${limit}`, function(err, rows) {
            rows.forEach(function (row) {
                cryptos.push(row)
            });
            resolve(cryptos)
        });
    });
}

module.exports = {insert, findAll};