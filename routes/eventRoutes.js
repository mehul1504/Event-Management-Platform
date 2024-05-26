const express = require('express');
const { 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    registerForEvent, 
    getEvents, 
    authenticate 
} = require('../controllers/eventController');

const router = express.Router();

router.get('/events', authenticate, getEvents);
router.post('/events', authenticate, createEvent);
router.put('/events/:id', authenticate, updateEvent);
router.delete('/events/:id', authenticate, deleteEvent);
router.post('/events/:id/register', authenticate, registerForEvent);

module.exports = router;
