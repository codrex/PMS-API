const app = require('./app');
const { PORT } = require('../constants');

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('App is listening on port', PORT);
});
