'use strict';

const express = require('express');

const app = express();

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Hello from DevOps Intern Task!',
    status: 'running'
  });
});

if (require.main === module) {
  const port = process.env.PORT || 8080;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
