
const crypto = require('crypto');
const JSEncrypt = require('node-jsencrypt');


// const publicEncrypt = (data) => {
//     const buffer = Buffer.from(data, 'utf8');
//     return crypto.publicEncrypt(publicKey, buffer).toString('base64');
// }

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAsyEUtkE/nwhK5LgaqhYd91iFrxajcuX3JUI6ShdEzXWIJAF+
Y0mu3IVHZ63e03b/RC03G8DHPicLKAm6uc875aD5zlTlCwcWu2QV6Zq1wkSHbp8y
vaAptszJfMVkaBX7YoYRk5W4LulEoVacQr+vBfCEEI3eXyU+xLssc1ly22VhmmRM
O4V8ZmGoFnMf0nBw6doNHdS1KrJ0AJyV++Pw7u8p3dlzEsWpmb47VANuIN8OuifW
EJzUxd2o9PXvbeKIt/qDYdKGDh7ChG8dMtZXVShB9ggiBXP6Pz1XTqEOrPU8IEl/
6tWPudkh1UMSJd0FWbZuvgL65agKvlfjVjnIiQIDAQABAoIBABBurHO7sJZqMFSi
/u8zcDRMjpbtQLk9l1p3pNk/ITSn34FOEcYR8FSSdWZxcMt9UxVyAGgvWxe8hS17
FwIMnLYH+mKPLyO/1roCCHCRnLLhjnr7Z7A1jR4T0zf686cIvTLgkaQ0S90h0QXr
6BHHe8rTsYnDOe8If6WUdhNu1TaDAv9gpGiKgSvUtF260HAW2v2B67kKzkfiXEwn
vVknl6y+koTtHtfNxblcxw9C5v1mqrg+SSP/V4EfWB/4fn2F8xETRMLXSGThPxgJ
k0JwlcUN0yTocFyv66JJqWCic8dAcEIIlCiRGF9V/joYM7/FbQ4cCgkxTxusLzmZ
QBT8O7ECgYEA4/zeecKnvnl9coiDoSoGMkJic3gBVQj/Ogkd/8qs/202Ya4QGvA/
obSwy15oYN+FaxXxRJ3aP5n1UG6mIInnGvYRqmrfrnpOlwk4/7xVm1iafPxAknaQ
AZAJx9DOW9OMXus25/txQ1Wy3t8oYncyxfjxniUQBzzQw3gKfS3tJ2cCgYEAySNq
EXE/b6Vx6XxBq4AT7bveFYTYWAMDnNGuNsWHTUxQZ0riOMFpWdu/lJPs4frDv0fa
iH599mhsIAFuXK+sX1I/H+aYbnq0lAG9jeCfYlNEWblp/2oWi2lQBOst+c16Qhr6
JL73P/BlugP3sOAuC3LG2kDrGp9VMj+jrsqbSo8CgYBf5iryzqVeop3ZAoFT1mh6
1Z+x8GWnDjzFfbZHtUoluxun5N7TZgFuFKJVOSXwsbTeQYGWGkwGes1Mgu6QO1Gh
7qWpqIDkVIAgWfnG4MKlsJRzRGwo74RNk/f5O+TBjW+7MXeMByEycKbnxrinCnqp
+bgwjGh8kuFBh4np89qQuwKBgQCaHrnCnb0W5nXPi7eiGuSqUD7OzFkdr0mQWxab
v2V6dFRToYyQIpuAECLPTT3Atm5RXlR0LECGk+Lt70rKWI3DCHl4DzCTzxAZLPA7
C3f1VopUGf+/h2G49zwqWK6E786TYqpzh6Ra6PB5xVqAvHZrrUnzqLS9VINqmlro
rzSovwKBgHu3EQ8jfNwaE5Q1+ypnvWOM5yTuDhrV2+tPaYMfxLUSq1Tx+nw1BvhV
/iNB1RBLnd2BAWoyze1OXU6l6j6Tozgd/R4zcMN5KdC1QJKuWtfZHREjBIx8uZce
ZMbpselV5TudhrbwnXDALlfXJmsWnsTwvnMrab/SI+DnkSuFvy8/
-----END RSA PRIVATE KEY-----`;

const privateDecrypt = (data) => {
    // const buffer = Buffer.from(data, 'base64');
    // return crypto.privateDecrypt(privateKey, buffer).toString('utf8');
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    return encrypt.decrypt(data);
}

module.exports = { privateDecrypt }