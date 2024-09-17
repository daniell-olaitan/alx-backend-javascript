import { resolve } from 'path';

const fs = require('fs');

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
    return { cs, swe };
}

export default function readDatabase(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(new Error(err));
            } else {
                resolve(handleData(data));
            }
        });
    });
}
