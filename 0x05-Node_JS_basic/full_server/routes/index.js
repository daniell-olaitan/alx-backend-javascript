import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

const { Router } = require('express');

const router = Router();

router.get('/', AppController.getHomepage);
router.get('/students', StudentsController.getAllStudents);
router.get('/students/:major', StudentsController.getAllStudentsByMajor);
export default router;
