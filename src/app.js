const express = require('express');
const logger = require('./middleware/logger');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found: ${req.method} ${req.originalUrl} endpoint'i bulunamadı.`
  });
});

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      success: false,
      message: 'Bad Request: Geçersiz JSON formatı.'
    });
  }
  res.status(500).json({
    success: false,
    message: 'Sunucu hatası.'
  });
});

app.listen(PORT, () => {
  console.log(`TASKFLOW API http://localhost:${PORT} adresinde çalışıyor.`);
});