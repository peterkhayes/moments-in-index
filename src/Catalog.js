const fs      = require("fs");
const path    = require("path");
const React   = require("react");
const Card    = require("./Card");

function loadCSV (filepath) {
  const rows = fs.readFileSync(filepath)
    .toString()
    .split("\r\n")
    .filter((row) => !row.startsWith("User"));

  return rows
    .map((row) => row.split("\t"))
    .map(([userId, itemId, itemType, itemTypeModifier, category, categoryNum, description, nearby]) => ({
      userId, itemId, itemType, itemTypeModifier, category, categoryNum, description, nearby,
      totalUserCount: rows.length,
    }));
}

let data = fs.readdirSync(path.join(__dirname, "../data"))
  .filter((filename) => filename.startsWith("Inventory"))
  .map((filename) => path.join(__dirname, "../data", filename))
  .map(loadCSV)
  .reduce((acc, data) => acc.concat(data), []);

// show only longest one for styling testing.
if (process.env.LONGEST) {
  data = [data.reduce((longest, current) => {
    return longest.description.length < current.description.length ? current : longest;
  }, {description: ""})];
}

data.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (item[key] == null) {
      throw new Error(`Item ${JSON.stringify(item)} has null key ${key}`);
    }
  })
})

module.exports = function Catalog () {

  return (
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.2.3/paper.css" />
        <link rel="stylesheet" type="text/css" href="/page.css" />
      </head>
      <body>
        {data.map((item) => <Card {...item} /> )}
      </body>
    </html>
  );
}