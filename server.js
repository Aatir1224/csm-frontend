const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.static(__dirname + "/dist/csm-frontend"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/csm-frontend/index.html");
});

app.listen(PORT || 4200);
