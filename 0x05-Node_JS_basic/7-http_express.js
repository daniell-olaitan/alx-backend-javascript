const fs = require('fs');
const express = require('express');

const app = express();
const port = 1245;

function handleData(data) {
  const lines = data.split('\n').filter((line) => line !== '');
  const headers = lines.shift().split(',');
  const fieldIndex = headers.indexOf('field');
  const cs = [];
  const swe = [];
  const students = lines.map((line) => line.split(','));
  for (const student of students) {
    if (student) {
      if (student[fieldIndex] === 'CS') {
        cs.push(student[0]);
      } else if (student[fieldIndex] === 'SWE') {
        swe.push(student[0]);
      }
    }
  }

  return (
    `Number of students: ${students.length}\n`
    + `Number of students in CS: ${cs.length}. List: ${cs.join(', ')}\n`
    + `Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`
  );
}
async function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        resolve(handleData(data));
      }
    });
  });
}
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});
app.get('/students', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  try {
    const data = await countStudents(process.argv[2]);
    res.statusCode = 200;
    res.send(`This is the list of our students\n${data}`);
  } catch (err) {
    res.statusCode = 404;
    res.send(`This is the list of our students\n${err.message}`);
  }
});
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
module.exports = app;
