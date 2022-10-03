#!/usr/bin/env node

//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
//                        Classification: UNCLASSIFIED
//==============================================================================
//                Copyright, Belford DBA Consulting, LLC, 2022
//                      Unpublished, All Rights Reserved
//==============================================================================
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/
//
// Section ##: <title>
// Lesson: ###
//
//--*----1----*----2----*----3----*----4----*----5----*----6----*----7----*----8
// NOTES: 
//------------------------------------------------------------------------------
// 
// nodejs.org/api 
// node --inspect-brk <prjctNm>
//
//--*----|----*----|----*----|----*----|----*----|----*----|----*----|----*----/

const fs = require ('fs');

const prjctNm = "List"
const debug   = 1;    // 0: Off   1: On

if (debug > 0) {
    console.log('DEBUG: Hi there from ' + prjctNm + '!');
    console.log('DEBUG: ' + prjctNm);
};

fs.readdir(process.cwd(), (err, fileNames) => {
    if (err) {
        if (debug > 0) {
            console.log('ERROR: ' + err);
            // throw new Error(err);
        };
    };

    console.log('DEBUG: ' + fileNames); 
    console.log(fileNames); 
});



