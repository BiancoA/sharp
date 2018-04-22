'use strict';
const fs = require('fs');
const sharp = require('./');

console.log('starting test:');
console.log('----------------------------------------------');
let outputDir = 'result/';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
let filenameNew = outputDir+"/newtiff.tiff"
sharp('./test/fixtures/uncompressed_tiff.tiff')
  .toFile(filenameNew)
  .then(info => {
    console.log("TIFF processed, trying to remove it");
    try {
      fs.unlinkSync(filenameNew);
      console.log("Success: removed");
    } catch (error) {
      console.log("File not removed, reason: " + error.message);
    }
  });
