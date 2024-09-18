import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

/**
 * Bind the routes to the appropriate handler
 * @param {Express} app The Express app.
 */
const mapRoutes = (app) => {
  app.get('/', AppController.getHomepage);
  app.get('/students', StudentsController.getAllStudents);
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

export default mapRoutes;
module.exports = mapRoutes;
