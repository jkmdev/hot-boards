/*
 * File: migrate.js
 *
 * Function: to be run from the root folder; copies contents from dev mongo database to a folder
 *           on the production server, for early development purposes (before the app goes live)
 *           Not very elegantly written, meant to be temporary, since this script would override production data
 * 
 * Usage: yarn migrate --user <prod server username>
 *        Then in production, each file is imported into db manually
 */

const fs = require('fs');
const mongoose = require('mongoose');
const { execSync } = require('child_process');
const argv = require('yargs').argv
require('dotenv').config();

// list collections we're not interested in migrating
const exclusions = [
    'system.indexes'
];

const serverAddress = "68.183.207.3";
var user = argv.user;
const migrationFolder = "migration";

// connect database to application
mongoose.connect(
    process.env.DB, 
    { useNewUrlParser: true },
    () => {
        console.log('Connected to mongodb');
    }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;

// handle db connetion events
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback () {

    console.log("MongoDB connection open");
    console.log("Obtaining collection data from db");
    
    // obtain all current collections in db
    mongoose.connection.db.listCollections().toArray(function (err, collections) {

        var collectionLength = collections.length;
        var processedCollections = 0;

        // export every collection (as JSON data) we're interested in from db
        // to migrationFolder
        collections.forEach((collection)=> {

            const name = collection.name;
            const notExcluded = exclusions.every(
                (elem)=> elem !== name
            );

            if(notExcluded) {

                try {
                    let prc = execSync(`mongoexport -d hb -c ${name} -o ${migrationFolder}/${name}.json`);
                    console.log(`mongoexport of collection ${name} successful`);
                    processedCollections++;

                } catch (error) {
                    console.log(`mongoexport of collection ${name} unsuccessful (exit code ${error.status})`);
                    console.log(error.message);
                }

            } else {
                collectionLength--;
            }

        });

        console.log("Migrating exported db data to production server");

        // send exported db files to production server
        // initial check prevents migration from happening if no new valid collections have been exported
        if(processedCollections === collectionLength) {
            try {
                let prc = execSync(`scp -r migration ${user}@${serverAddress}:hot-boards/${migrationFolder}`);
                console.log(`File migration to prod successful`);
            } catch(error) {
                console.log(`File migration to prod unsuccessful (exit code ${error.status})`);
                console.log(error.message);
            }
        }

    });

    db.close();

});

db.on('connected', function() {
    console.info("MongoDB connection established successfully");
});
