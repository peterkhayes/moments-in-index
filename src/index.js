const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");
const Catalog = require("./Catalog");

const output = ReactDOMServer.renderToStaticMarkup(Catalog());

const DEST = path.join(__dirname, "..", "index.html");
fs.writeFileSync(DEST, output, "utf-8");