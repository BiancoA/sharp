'use strict';
const fse = require('fs-extra');
const sharp = require('./');
const outputDir = 'result/';

console.log('starting test:');
console.log('----------------------------------------------');
async function test_return_promise() {
  if (!fse.existsSync(outputDir)) {
    fse.mkdirSync(outputDir);
  }
  let filenameNew = outputDir + "/newtiff.tiff"
  return sharp('./test/fixtures/uncompressed_tiff.tiff')
    .median(15)
    .toFile(filenameNew)
    .then(info => {
      console.log("TIFF processed, trying to remove it");
      try {
        fse.removeSync(filenameNew);
        console.log("Success: removed");
      } catch (error) {
        console.log("File not removed, reason: " + error.message);
      }
      return info;
    });
}

test_return_promise().then(info => {
  //fse.removeSync(path.join(outputDir, "gloss_nf.tif"));
  console.log(info);
}, reason => {
  console.log(reason);
});
