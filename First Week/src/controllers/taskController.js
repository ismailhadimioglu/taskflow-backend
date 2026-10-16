const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

const VALID_STATUSES = ['pending', 'completed'];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

const readTasks = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const writeTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
};

// ID üretme fonksiyonu güvenli hale getirildi (Number dönüşümü eklendi)
const generateId = (tasks) =>
  tasks.length > 0 ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1 : 1;

const createTask = (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body || {};

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request: "title" alanı zorunludur.'
      });
    }

    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Bad Request: "status" şu değerlerden biri olmalıdır: ${VALID_STATUSES.join(', ')}`
      });
    }

    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Bad Request: "priority" şu değerlerden biri olmalıdır: ${VALID_PRIORITIES.join(', ')}`
      });
    }

    const tasks = readTasks();

    const newTask = {
      id: generateId(tasks),
      title: title.trim(),
      description: description || '',
      status: status || 'pending',
      priority: priority || 'medium',
      assignee: assignee || '',
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeTasks(tasks);

    return res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası: görev oluşturulamadı.'
    });
  }
};

const getAllTasks = (req, res) => {
  try {
    const tasks = readTasks();
    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası: görevler listelenemedi.'
    });
  }
};

const getTaskById = (req, res) => {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: `Not Found: ${req.params.id} id'li görev bulunamadı.`
      });
    }

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası: görev getirilemedi.'
    });
  }
};

const updateTask = (req, res) => {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Not Found: ${req.params.id} id'li görev bulunamadı.`
      });
    }

    const { title, description, status, priority, assignee } = req.body || {};

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Bad Request: "title" boş olamaz.'
      });
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Bad Request: "status" şu değerlerden biri olmalıdır: ${VALID_STATUSES.join(', ')}`
      });
    }

    if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: `Bad Request: "priority" şu değerlerden biri olmalıdır: ${VALID_PRIORITIES.join(', ')}`
      });
    }

    const existing = tasks[index];

    const updatedTask = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      description: description !== undefined ? description : existing.description,
      status: status !== undefined ? status : existing.status,
      priority: priority !== undefined ? priority : existing.priority,
      assignee: assignee !== undefined ? assignee : existing.assignee,
      id: existing.id,
      createdAt: existing.createdAt
    };

    tasks[index] = updatedTask;
    writeTasks(tasks);

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası: görev güncellenemedi.'
    });
  }
};

const deleteTask = (req, res) => {
  try {
    const id = Number(req.params.id);
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Not Found: ${req.params.id} id'li görev bulunamadı.`
      });
    }

    const [deletedTask] = tasks.splice(index, 1);
    writeTasks(tasks);

    return res.status(200).json({
      success: true,
      message: 'Görev başarıyla silindi.',
      data: deletedTask
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Sunucu hatası: görev silinemedi.'
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};