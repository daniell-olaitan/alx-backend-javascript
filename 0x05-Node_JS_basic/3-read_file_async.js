const fs = require('fs');

function handleData(data) {
  const lines = data.split('\n').filter((line) => line !== 'firstname,lastname,age,field');
  const cs = [];
  const swe = [];
  const students = lines.map((line) => line.split(','));
  for (const student of students) {
    if (student) {
      if (student[3] === 'CS') {
        cs.push(student[0]);
      } else if (student[3] === 'SWE') {
        swe.push(student[0]);
      }
    }
  }
  console.log(`Number of students: ${cs.length + swe.length}`);
  console.log(`Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`);
  console.log(`Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
}
function countStudents(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load database'));
      } else {
        handleData(data);
        resolve();
      }
    });
  });
}
module.exports = countStudents;
