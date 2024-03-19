
const crypto = require('crypto');
const JSEncrypt = require('node-jsencrypt');


// const publicEncrypt = (data) => {
//     const buffer = Buffer.from(data, 'utf8');
//     return crypto.publicEncrypt(publicKey, buffer).toString('base64');
// }

const privateKey = `MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDeMpxoZG/dsewd7GdHuqxXd3eBiGycbb+zGKSqH4cjZYqyS9dSaQoYEVDWp7PJr4zUtrBijRYsqAeEDAvOVZF8As6P6g5lvhvwOpMqarHipmBSW6DMABPBmtlOTepb/YoSgIC/mOO60Kmb9oDgnGtQXQPclDPYdFXO5dcRJXIwDnVwMDTFSr2aZGSRhp9um5pmFhw3zdRfG6eFl5H23X1o89j1U6bTL0twErdzYjgvgF5r+g1R6ZW8NC/fZcL+WeF5I+oVhMKDc+A9B5XQuM/W4x1y2Hg2wRwE6YtDBGrF73H4D3MuYkOt5phiBGJz/9+7i6azAN+foyfZskmZy1cnAgMBAAECggEAQZL0H8bMUMPqZ+ZVkJChvepu5VZqnzuwYF18cwx86FBWP0oskJCZPwMVNVQmtfXN/RSxN1Rl3+Xy2eBoN4t/NPbrGQO9Hf+d5SaUOedk+fuZ35RU/v9i1TcqvHY4HM/VSKKN3H11b7OW6oU0AZWIAh6BPj6qkk266SVhdBj1+wIscfOBM+L6uUG7ptDbB7kGEkTKB2TacegSjcD91glYDcIkIJZFAwYbFx4I7QdrjMJoOOQSCvmvRYXHGxRApuj2CcN0qKOkOYtLsCoE1C4TStkLwE7mdTLWzByuwSpWTyViy6Df+gyQq8LDp2siZsLn06jOG9wKYd1oamvDDdw7KQKBgQD5fi9SoiZwQmNAuUgDC635niM8sOJjjgoProEvngRlt+ywwxTSGCzsDH73QosEm550grbGeR0Q5WxGhlAblteByOrq7c1wU+fOC2h89/kWzDrj1UadLa4gFYlPP5n19qxrJQq4vcSy6dd2KSGNt0+XjMwtcljXzdI5iEf1BHatSwKBgQDj/i5tRTIqXuvAa73Fvd97Oe1Il8+AWIiemyxqHcXVMRyFioMOKH86PtT9tiMaX6qga5T1MUydam3lw0y/CrqnjQw2mZvpKvXncsKmPuFSttCj6QHPVVmctwleEmlCPb9ycnO37RFRtGG8ISgO8A3QXJbr1DX1V9x4GF2C9FlgFQKBgQDj27jAkVLlx9v56r23+lzD0wd/kFTSc5EAzXEy2fBOLfI/ZYuIbYfpdWgnzmBErxPCePcQwOAo5D9FEbnr2JGt+J+EO/calabpaUXejGKzzYYjOk+pkWSr7L9g30dvef/yQvxNyRLyC9s6EUqRsU9Bq9d10i8NuO48mRiOz6rLjQKBgASBTkuMdXxO2du4hUx1/weBUoX/sfL4TOLNcCg8pF8dFFIzNXm/JRxyh2ToB3OK9mUrGwtpSPlHVBqZLFgODzgmWlpt2J3X4noLU3tTfMJUqHTEsut05Utqdn3sYTYU4EaTqmO1BIWXyeKcyRzac3ttiPHqBJLvhIS+/oIK8AUtAoGBAL1Ik3j5+XVBjurucz8rvFcJR9/m+gbKlw5CgMqe0hVJiIFeiDwAmYqQcrtwuSwzl5HYer8+4biUsTxCMeqB9kJlpAkwGXkZghefQLOiHGWyBXDZZCwFbuiXWeOIgiAB9cWDiEc81lYuNE7wa46lncyanIqviQJFN6B4n0HSjAb+`;

const privateDecrypt = (data) => {
    // const buffer = Buffer.from(data, 'base64');
    // return crypto.privateDecrypt(privateKey, buffer).toString('utf8');
    const encrypt = new JSEncrypt();
    encrypt.setPrivateKey(privateKey);
    return encrypt.decrypt(data);
}

module.exports = { privateDecrypt }