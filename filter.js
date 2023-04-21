const fs = require('fs');

// Read from the input file
fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) throw err;
  var replace_key = "_id"
, add_key = "id"
  // varManipulate the data
  var  rwp = function rewriteProperties(obj) {
    if (typeof obj !== "object") return obj
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            obj[prop.replace(replace_key, add_key)] = rewriteProperties(obj[prop])
            if (prop.indexOf(replace_key) > -1) {
                delete obj[prop]
            }
        }
    }
    return obj;
  }
  var psts = [];

  const parsedData = JSON.parse(data, function (key, value) {
    if (key == "preference") {
      return psts.push(value);
    } 
    if (key == "skill") {
        return psts.push(value);
      }if (key == "dietRequirement") {
        return psts.push(value);
      
      }
      if (key == "content") {
        value=value+psts.toString();
        psts=[];
        return value}
      else {
      return value ;
    }
  }); 
  const newData = rwp(parsedData);
  console.log(newData);
  var stringified = JSON.stringify(parsedData);
  stringified = stringified.replace(/"id"/gm, 'id');
  stringified = stringified.replace(/"content"/gm, 'content');
  
  
  
  fs.writeFile('output.json', stringified, (err) => {
    if (err) throw err;
    console.log('The data has been written to output.json');
  });
});
 