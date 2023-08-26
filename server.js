const express = require("express");
const app = express();

app.use(express.static(__dirname + "/dist/csm-frontend"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/csm-frontend/index.html");
});

app.listen(process.env.PORT || 4200);
