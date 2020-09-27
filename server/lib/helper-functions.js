const pool = require('./db');

const convertToNested = function(rows) {
  let data = {};
  let imageArr = [];

  for (let row of rows) {
      imageArr.push(row['image_url'])
    }
    data = rows[0];
    delete data['image_url'];
    data['image_url'] = imageArr;
}

const convertAllToNested = function(rows) {

}

exports.convertToNested = convertToNested;
