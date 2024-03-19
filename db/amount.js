const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("epay.db");

const getTransactionAmount = (id, callback) => {
    db.get(`SELECT amount FROM "Transaction" WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(`Error getting amount: ${err}`);
            return callback(err);
        }
        callback(null, row.amount);
    });
}

// 插入交易记录
const insertTransaction = (amount, callback) => {
    db.run(`INSERT INTO "Transaction" (amount) VALUES (?)`, [amount], function(err) {
        if (err) {
            console.error(`Error inserting transaction: ${err}`);
            return callback(err);
        }
        callback(null, this.lastID);
    });
}

module.exports = { getTransactionAmount, insertTransaction }