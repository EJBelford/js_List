#!/usr/bin/env node

//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
//                        Classification: UNCLASSIFIED
//==============================================================================
//                Copyright, Belford DBA Consulting, LLC, 2022
//                      Unpublished, All Rights Reserved
//==============================================================================
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/
//
// Section 24: Create Node Js Command Line Tools
// Lesson: 336
//
//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
// NOTES: 
//------------------------------------------------------------------------------
// 
// nodejs.org/api 
// node --inspect-brk <prjctNm>
//
// clear && node index.js;
// sudo npm link nls
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const chalk = require('chalk');
const fs    = require('fs');
const path  = require('path');
const util  = require('util');

const prjctNm = "List"
const debug   = 0;    // 0: Off   1: On

if (debug > 0) {
    console.log('DEBUG: Hi there from ' + prjctNm + '!');
    console.log('DEBUG: ' + prjctNm);
    console.log('ARGV:  ' + process.argv);
};

const targetDir = process.argv[2] || process.cwd();

// Option 2 - Method #2
// const lstat = util.promisify(fs.lstat);

// Option 2 - Method 3
const { lstat } = fs.promises; 

fs.readdir(targetDir, async (err, fileNames) => {
    if (err) {
        if (debug > 0) {
            console.log('ERROR: ' + err);
            // throw new Error(err);
        };
    };

    // console.log('DEBUG: ' + fileNames); 
    // console.log(fileNames); 

    // Bad Code Example!!!!
    /* for (let filename of filenames) {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log('ERROR: ' + err);
            }

            console.log(filename, stats.isFile());
        });
    } */
    // Bad Code Example!!!!

    // Option 1
    /* const allStats = Array(fileNames.length).fill(null); 

    for (let filename of fileNames) {
        const index = fileNames.indexOf(filename);
        

        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log('ERROR: ' + err);
            }

            allStats[index] = stats;

            const ready = allStats.every((stats) => {
                return stats;
            });

            if (ready) {
                allStats.forEach((stats, index) => {
                    console.log(fileNames[index], stats.isFile());
                });
            };
        });
    }  */
    // Option 1

    // Option 2
       /*  for (let filename of fileNames) {
            try {
            const stats = await lstat(filename);

            console.log(filename, stats.isFile());                
            } catch (err) {
                console.log('ERROR: ' + err);
            }
        } */
    // Option 2
    
    // Option 3
        const statPromises = fileNames.map(filename => {
            return lstat(path.join(targetDir, filename));
        });

        const allStats = await Promise.all(statPromises);

        for (let stats of allStats) {
            const index = allStats.indexOf(stats);

            if (stats.isFile()) {
                console.log(fileNames[index]);
            } else {
                console.log(chalk.blueBright(fileNames[index]));
            }
            //console.log(fileNames[index], stats.isFile());
        }
    // Option 3

});

// Option 2 - Method #1
/* const lstat = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.lstat(fileName, (err, stats) => {
            if (err) {
                reject(err);
            };

            resolve(stats);
     });
    });
}; */
