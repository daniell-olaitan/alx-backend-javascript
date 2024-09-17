import readDatabase from "../utils";

export default class StudentsController {
    static getAllStudents(req, res) {
        res.statusCode = 200;
        readDatabase(process.argv[2])
          .then((data) => {
            const response = [
                'This is the list of our students',
                `Number of students in CS: ${data.cs.length}. List: ${data.cs.join(', ')}`,
                `Number of students in SWE: ${data.swe.length}. List: ${data.swe.join(', ')}`,
            ].json('\n');
            res.end(response);
        })
        .catch(() => {
            res.statusCode = 500;
            res.end('Cannot load the database');
        });
    }

    static getAllStudentsByMajor(req, res) {
        res.statusCode = 200;
        const param = req.params.major;
        if (!['CS', 'SWE'].includes(param)) {
            res.statusCode = 500;
            res.end('Major parameter must be CS or SWE');
        }
        readDatabase(process.argv[2])
          .then((data) => {
            if (param === 'CS') {
                res.end(`List: ${data.cs.join(', ')}`);
            } else if (param === 'SWE') {
                res.end(`List: ${data.swe.join(', ')}`);
            }
        })
        .catch(() => {
            res.statusCode = 500;
            res.end('Cannot load the database');
        });
    }
}
