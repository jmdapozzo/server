//Packages
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const pkginfo = require("pkginfo")(module, "version", "description");

//Setup the Express app
const app = express();
app.use(morgan("short"));
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());

app.get("/", (req, res) => {
    res.send(module.exports);
});

const fireRisks = [
    {id : 1, region : "Maniwaki", fireRisk : 3 },
    {id : 2, region : "Montreal", fireRisk : 1 },
    {id : 3, region : "Hull", fireRisk : 2 }
]

app.get("/api/sopfeu/fire-risks", (req, res) => {
    res.send(fireRisks);
});

app.get("/api/sopfeu/fire-risks/:id", (req, res) => {
    const fireRisk = fireRisks.find(fr => fr.id === parseInt(req.params.id));
    if (!fireRisk) return res.status(404).send(`The requested region with ID ${req.params.id} was not found`);

    res.send(fireRisk);
});


const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));