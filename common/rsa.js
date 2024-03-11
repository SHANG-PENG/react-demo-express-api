
const crypto = require('crypto');
const { publicKey, privateKey } = require('./config/rsa-key-pair');

const publicEncrypt = (data) => {
    const buffer = Buffer.from(data, 'utf8');
    return crypto.publicEncrypt(publicKey, buffer).toString('base64');
}

const privateDecrypt = (data) => {
    const buffer = Buffer.from(data, 'base64');
    return crypto.privateDecrypt(privateKey, buffer).toString('utf8');
}

module.exports = { publicEncrypt, privateDecrypt }