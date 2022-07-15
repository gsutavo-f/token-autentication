const app = require('./app');
const port = 3000;

const routes = require('./routes');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
