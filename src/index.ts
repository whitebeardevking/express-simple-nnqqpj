import { createServer } from './server';

const app = createServer();
const port = 3100;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
