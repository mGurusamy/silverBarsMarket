import app from './app';
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Live Order Board app is listening on port ${port}`);
});