const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());

if(process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname,'../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path,join(__dirname,'../index.html'))
  });
};





app.use((req, res) => {
    res.status(404);
    res.sendFile(path.join(__dirname, './client/error.html'));
  });
  

app.use((err, req, res, next) => {
    // logic
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 400,
      message: { err: "An error occurred" },
    };
    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
  
  module.exports = app;