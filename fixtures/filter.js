const fs = require('fs');

// Read from the input file
fs.readFile('input.json', 'utf8', (err, data) => {
  if (err) throw err;

  // Manipulate the data
  
  const parsedData = JSON.parse(data, function (key, value) {
    if (key == "text") {
      return value.replace(/(\r\n|\n|\r)/gm, "");
    } else {
      return ;
    }
  });
  const modifiedData = parsedData.toString().replace(/^\s+|\s+$/g,'').trim();
  

  // Write to the output file
  fs.writeFile('output.json', JSON.stringify(parsedData), (err) => {
    if (err) throw err;
    console.log('The data has been written to output.json');
  });
});
