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
 * Read into a Couch DB database to collect information
 *
 * @param {number} [id=undefined] // Document ID
 * @param {string} database // Database name
 * @param {boolean} [bulk=false] // Read bulk
 * @param {Client} [client=undefined] // give discord client
 * @returns {document}
 */
module.exports = async (id = undefined, database, bulk = false, client = undefined) => {
    // Make sure there is a client
    if(!client) throw Error('Missing client in Read!');


    // Decrypt data
    const usernameBytes = CryptoJS.AES.decrypt(username, client.user.id);
    const passwordBytes = CryptoJS.AES.decrypt(password, client.user.id);
    username = usernameBytes.toString(CryptoJS.enc.Utf8);
    password = passwordBytes.toString(CryptoJS.enc.Utf8);


    let db = new PouchDB(`http://${username}:${password}@${publicIP}:5984/${database}`);
    console.info(`Reading to database <${database}> using ID: <${id}>`);

    // See if we can collect the database information
    await db.info().catch((err) => {
        const publicIp = require('public-ip');

        // Change Public IP if connection failed
        fs.readFile('./config.json', async (err, data) => {
            if (err) throw err;

            const fileData = JSON.parse(data);

            console.log(`Previous IP String: ${fileData.publicIP}`);
            fileData.publicIP = await publicIp.v4();
            console.log(`New IP String:\n${fileData.publicIP}:5984/${database}`);

            db = new PouchDB(`http://${username}:${password}@${fileData.publicIP}:5984/${database}`);
            await db.info().catch(err => console.log(err));

            fs.writeFile("./config.json", JSON.stringify(fileData), (err) => {
                if (err) throw err;
                console.log(`Public IP successfully changed.`);
            });
        });
    });

    if (bulk == false) {
        return await db.get(id).then(async function (doc) {
            // Grab our document
            return doc;
        }).catch(async function (err) {

            // If there was no document, Create one.
            if (err.status == "404") {
                console.log(`ID: ${id} from ${database} did not have a document.`);
                return;
            }

            if (err.status == "401") {
                console.log(`You don't have permission for database ${database}!!!`);
                return;
            }

            console.error(`error reading ${database}, ID: ${id}`, err);
            return;
        });
    }

    if (bulk == true) {
        return await db.allDocs({ include_docs: true }).catch(async function (err) {
            console.error(`Reading Bulk from ${database}`, err);
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