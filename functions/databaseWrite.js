/*
 *   Copyright (c) 2020 Dimitri Lambrou
 *   All rights reserved.
 *   Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential
 */
const PouchDB = require('pouchdb-node');
let { publicIP, username, password } = require('../config.json');
const CryptoJS = require("crypto-js");
const fs = require('fs');

/**
 * Write into a Couch DB database to collect information
 *
 * @param {object} data // Document
 * @param {string} database // Database to write
 * @param {boolean} [bulk=false] // Bulk Write
 * @param {Client} [client=undefined] // give discord client
 * @returns
 */
module.exports = async (data, database, bulk = false, client = undefined) => {
    // Make sure there is a client
    if(!client) throw Error('Missing client in Write!');

    // Decrypt data
    const usernameBytes = CryptoJS.AES.decrypt(username, client.user.id);
    const passwordBytes = CryptoJS.AES.decrypt(password, client.user.id);
    username = usernameBytes.toString(CryptoJS.enc.Utf8);
    password = passwordBytes.toString(CryptoJS.enc.Utf8);


    // Initiate DB
    let db = new PouchDB(`http://${username}:${password}@${publicIP}:5984/${database}`);
    console.info(`Writing to database <${database}> using ID: <${data._id}>`);

    // See if we can collect the database information
    await db.info().catch((err) => {
        const publicIp = require('public-ip');

        // Change Public IP if connection failed
        fs.readFile('./config.json', async (err, data) => {
            if (err) throw err;

            const fileData = JSON.parse(data);

            console.log(`Previous IP String: ${fileData.publicIP}`);
            fileData.publicIP = await publicIp.v4();
            console.log(`New IP String:\n\n${fileData.publicIP}:5984/${database}`);

            db = new PouchDB(`http://${username}:${password}@${fileData.publicIP}:5984/${database}`);
            await db.info();

            fs.writeFile("./config.json", JSON.stringify(fileData), (err) => {
                if (err) throw err;
                console.log(`Public IP successfully changed.`);
            });
        });
    });


    if (bulk == false) {
        await db.put(data).catch(async (err) => {
            console.error(`Writing to database: ${database}`, err.stack);

            await db.put(data).catch((err) => {
                console.log("second attempt unsuccessful");
            });
        });
    }

    if (bulk == true) {
        return await db.bulkDocs(data).catch(async function (err) {
            console.error(`Writing Bulk from ${database}`, err);
        });
    }

    // Encrypt Data
    fs.readFile('./config.json', async (err, data) => {
        if (err) throw err;

        const fileData = JSON.parse(data);

        // Encrypt
        fileData.username = CryptoJS.AES.encrypt(username, client.user.id).toString();
        fileData.password = CryptoJS.AES.encrypt(password, client.user.id).toString();


        fs.writeFile("./config.json", JSON.stringify(fileData), (err) => {
            if (err) throw err;
        });
    });
};
