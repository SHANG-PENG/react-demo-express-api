var path = require('path');
var fs = require('fs');
var express = require('express')
var router = express.Router()

var NodeRSA = require('node-rsa');

var { getRandomInt } = require('../common/utility');
const { insertTransaction } = require('../db/amount');


router.get('/load-form', (req, res) => {
    const { a } = req.query;
    const scriptPath = path.join(__dirname, '../assets/js/js-form.js'); // 替换为你的脚本文件的路径  

    const key = new NodeRSA({ b: 2048 }); // 你可以根据需要选择密钥长度，比如 512, 1024, 2048 等  

    // const publicKey = key.exportKey('public');  
    // const privateKey = key.exportKey('private');  
    // console.log('node-rsa-publicKey: ', publicKey);
    // console.log('node-rsa-privateKey: ', privateKey);

    const publicKey = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7aqhW99t23nJsgq3uJgT
    /qW6vKRS3ayB+9RO8zQKVHAFz34dyfgifZa9k7bvBfIN9Br3DipQ9fBMG3uj7IjY
    /IJevySdgcY1ySXxh0HBjT1r1gXf6Dj3uFOcpjDIViO9V9X06nzsXe0SiTdspk+s
    hJDliaxrPsJlofSlrorlHY2cV2JYKDzVuIMKX+neOgnJRkf+nA8UkOGlKnZlKPBd
    kI+Z1hkjC4WaxC6CB1deXSo+5gsnYTXeTd+9qiJWezX35YAfyM0CdPLxouW7m98T
    mccxxS8XH6wpnm9OS5sKcbr5d0ssczV78zNwzH5UvNiLBuqBdtaFgZP8ym3krJ4/
    2wIDAQAB
    -----END PUBLIC KEY-----`
    const privateKey = `-----BEGIN RSA PRIVATE KEY-----
    MIIEpgIBAAKCAQEA7aqhW99t23nJsgq3uJgT/qW6vKRS3ayB+9RO8zQKVHAFz34d
    yfgifZa9k7bvBfIN9Br3DipQ9fBMG3uj7IjY/IJevySdgcY1ySXxh0HBjT1r1gXf
    6Dj3uFOcpjDIViO9V9X06nzsXe0SiTdspk+shJDliaxrPsJlofSlrorlHY2cV2JY
    KDzVuIMKX+neOgnJRkf+nA8UkOGlKnZlKPBdkI+Z1hkjC4WaxC6CB1deXSo+5gsn
    YTXeTd+9qiJWezX35YAfyM0CdPLxouW7m98TmccxxS8XH6wpnm9OS5sKcbr5d0ss
    czV78zNwzH5UvNiLBuqBdtaFgZP8ym3krJ4/2wIDAQABAoIBAQCYF93zQWS4U5Pz
    0FAKXahOChkap74wBjmYwyFTGjaSGq5dPsQpgBXycQkZArSsBV9QnAEGm6X7/a92
    1wTsVhcmYPfpMrFpX0MEWrfaawZGMMxVxqSno+1DlJ5m7EkIdw6wq0d02EUbRp/a
    GBH7zHkGzQNXu3NWUmlf34Q30sMUyVMsfGemR6Dg5ReP+71wCmo9rxyVWJrf3sXL
    FRvXQGWgZi6jUAsSp3tNFlvyuyva4ETrQdDoWQZ4+mSXMEqi9Wv7u926Eq6S6Uba
    cR7xRQkYFTNeBzSxPv2M3Cjp31ns4AU3c5b0L9YTmKju5vYAYvefsEnxphRMScRZ
    eJLSgGlhAoGBAP5odVYOn//sjTiZCc7sTzs1vK8Ct+fhAh/CeIdIcNSSwu1hGax0
    O3RMIKKqa3p1t2pJ+HfXdmg5q3e7hfv3yx0cOIHLkY5rdr7Bj6+couZh08Sdid3j
    yAUKm8IExRHfyF9obGBfea85XtvJ4ZYZqA/HVmBvgs3zKH+/suM+73+fAoGBAO8n
    WnarVKrF2CCC5+N6gh2zzfoLCa1nhNrf7c7C551M7rDXvlsn0NcpsZMITTIrM6TB
    7N1UN3KmAqBPUQUDgKPX9F/pjPMJ2jBd+qZjXVGj4RfshNsh8GgvkIQDAcxzBnzo
    p5QLSwiY0/GrxAx0Zxl+3XCWhpZ1W0v+wtddmOZFAoGBAIpsteNkQ8SRpml0Q7T2
    OUojPA4RsZUWhfxX6RLa5KGVVUCqA7kk6TCnN16q0Z4pLOpFY095yfB96IFWZFms
    AzVMpKZi6EkQyeSTFyZbWPt3oS0q9tfn125+zi8sPzoxhCn9fHKXoHMqCSYX24m7
    Xglv0dzY79g1hQS1fpVNKi1LAoGBAMMqv3W2rlrLKGynx+vpb0QkF0UmOtiLcW1Z
    b23buz6wqN4iwpMLdDATM3pFPRJjFTswk0ewUau7dMs0z26jBBkxxJl9NGymrqvo
    FgQxdNeKQMjQWT+ne9TadDp3ZcFeYX4QM6nqaWpzpgtEXLK5T+YLlVUrUlx5G29y
    UbmGBaBtAoGBAPartGX288NTvB9fg24nRI5TYSc1Omtw4utEfGQloKljLRT6g7AX
    SvkLEOv6P2RMQOydA5Hs+obHK/9csC+i1SMMzdlG1uTUXJRQygBI/a4xcC3IVTRd
    JRV5+rRyPjZpFVjbfHhBXgRcy3DPbrQh/ZqJWwVDKPgtpBWl6DB3lX0v
    -----END RSA PRIVATE KEY-----`

    const publicKeyObject = new NodeRSA(publicKey);
    const privateKeyObject = new NodeRSA(privateKey);

    const gid = 'gid123', id = 1;

    // // 要加密的文本  
    // const textToEncrypt = JSON.stringify({"name": "John", "age": 30, "city": "New York", 'url': 'http://www.baidu.com'});  

    // // 使用公钥加密文本  
    // const encrypted = publicKeyObject.encrypt(textToEncrypt, 'base64');  
    // console.log('Encrypted:', encrypted);  

    // // 使用私钥解密文本  
    // const decrypted = privateKeyObject.decrypt(encrypted, 'utf8');  
    // console.log('Decrypted:', decrypted);

    const str = 'Hello, RSA Signature!';
    const signature = key.sign(str, 'base64', 'utf8');

    console.log('签名:', signature);

    const verified = key.verify(str, signature, 'utf8', 'base64');
    console.log('验证:', verified);

    // const ccc = privateKeyObject.decrypt(`sgnM4aOPN4Js3FmUq7Cs+riMCd/gtDqwMUDpFLOfajf45jzVPe9s+YU+DSk/6whbJQAqxes9l3kJfF6kF2CwnuJx6FVbLXFiv3w9E4W7sSasxtY9+E0KIWO+99f4HC2cobqRbxzzgAWMdvJR7fazgbdkRI0EQeZTzfjVjWP3Fw2QccyPkU8U7ozJjchSTmRMpz20pMHO4QlngVOdTq5L4r7WFfN+vqaxzfP4VaLSfJYf5PFJ4Tc8J1EGY79uFAVC1aVX8XG2TiODo3JfJKDiBW4/PLWxzxU/ipF7bzR6Yk3fRDHqnvqUb4ROWlxSrqEqQQSxdf1fhWKvoCz4i+0XWA==`, 'utf8')
    // console.log('ccc: ', ccc);

    const amount = getRandomInt(1, 100);
    insertTransaction(amount, (err, id) => {
        if (id > 0) {
            fs.readFile(scriptPath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading script file: ${err}`);
                    return res.status(500).send('Internal Server Error');
                }
                res.set('Content-Type', 'application/javascript'); // 设置响应头的内容类型  

                var nData = data.replace('$$Amount$$', `$${amount}.00`).replace(/\$\$gid\$\$/g, '123').replace(/\$\$id\$\$/g, id)
                console.log('nData: ', nData);
                res.send(nData); // 发送脚本内容  
            });
        }
    });
});

route.post('/post-order', (req, res) => {
    const jsonData = req.body;
    console.log('post-order: ', jsonData);
    const amount = jsonData.amount;
    
    insertTransaction(amount, (err, id) => {
        if (err) {
            console.error(`Error inserting transaction: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log(`Transaction inserted with id: ${id}`);
        res.send({
            id,
            amount,
        });
    });
})

router.post('/submit-form', (req, res) => {
    const jsonData = req.body;
    console.log('submit-form: ', jsonData);
    console.log('submit-form-data: ', jsonData.data);
    var data = privateDecrypt(jsonData.data);
    console.log('submit-form-decrypt: ', data);

    // 插入交易记录
    const amount = getRandomInt(1, 100);
    insertTransaction(amount, (err, id) => {
        if (err) {
            console.error(`Error inserting transaction: ${err}`);
            return res.status(500).send('Internal Server Error');
        }
        console.log(`Transaction inserted with id: ${id}`);
        res.send("ok");
    });
})

module.exports = router