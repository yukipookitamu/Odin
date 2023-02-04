const express = require('express');
const SibApiV3 = require('sib-api-v3-sdk');
const app = express();
require("dotenv").config();

// send email endpoint
app.post("/sendemail", (req, res, next) => {
    const email = req.query.email;
    console.log(email);
    let apikey = process.env.SIB_API_KEY

    // auth + setup
    let defaultClient = SibApiV3.ApiClient.instance;
    let apiKey = defaultClient.authentifications('api-key');
    apiKey.apiKey = apikey;

    // creaste contact
    let apiInstance = new SibApiV3.ContactsApi();
    let createContact = new SibApiV3.CreateContact();
    createContact.email = email;
    createContact.listIds = [2];

    // call SIB api
    apiInstance.createContact(createContact).then(data => {
        res.status(200);
        res.send("success");
    } ,function (error) {
        res.status(500);
        res.send("failure");
    })

    res.send("success");
})

// file endpoint
app.use((req, res, next) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, () => {
    console.log("app running on port 3000")
})