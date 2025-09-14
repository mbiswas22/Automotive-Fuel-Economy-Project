const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'cars.json');
let cars = [];
let idCounter = 1;
// try {
//   cars = JSON.parse(fs.readFileSync(DATA_PATH));
//   console.log(`Loaded ${cars.length} records from data file.`);
// } catch (err) {
//   console.error('Failed to load data:', err);
// }

// Load CSV file on startup
const csvFilePath = path.join(__dirname, 'data', "auto-mpg.csv");
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const normalizedRow = normalizeKeys(row);
    normalizedRow.id = idCounter++; // add incremental ID
    cars.push(normalizedRow);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

  // Utility to replace spaces in keys with underscores
function normalizeKeys(obj) {
  const newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = key.replace(/\s+/g, "_");
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
}

app.get('/api/health', (req, res) => res.json({ok:true, time: new Date()}));

app.get('/api/cars', (req, res) => {
  let out = cars.slice();
  const q = (req.query.q || '').toLowerCase();
  if (q) {
    out = out.filter(c => JSON.stringify(c).toLowerCase().includes(q));
  }
  if (req.query.min_mpg) {
    const min = parseFloat(req.query.min_mpg);
    out = out.filter(c => parseFloat(c.mpg) >= min);
  }
  if (req.query.cyl) {
    const cyl = parseInt(req.query.cyl);
    out = out.filter(c => parseInt(c.cylinders) === cyl);
  }
  const page = parseInt(req.query.page || '1');
  const per = parseInt(req.query.per || '50');
  const start = (page-1)*per;
  res.json({meta:{total: out.length, page, per}, data: out.slice(start, start+per)});
});

app.get('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = cars.find(c => parseInt(c.id) === id);
  if (!item) return res.status(404).json({error:'not found'});
  console.log(item);
  res.json(item);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('API listening on', PORT));
