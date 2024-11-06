var path = require('path');
var express = require('express')
var router = express.Router()

router.post('/csp-report', (req, res) => {
    const jsonData = req.body;
    console.log('csp-report: ', jsonData);

    const data = {
        status: "Ok"
    }

    res.status(200).send(JSON.stringify(data))
})

module.exports = router