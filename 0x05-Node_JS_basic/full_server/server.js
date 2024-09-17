import router from './routes';

const express = require('express');

const app = express();
app.use('/', router);

app.listen(1245, () => {
  console.log('Server running on port 1245');
});

export default app;
