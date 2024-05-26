const { Event, events } = require('../models/eventModel');
const { users } = require('../models/userModel');
const { setCache, getCache } = require('../utils/cache');
const { validateEvent } = require('../helpers/validation');
const jwt = require('jsonwebtoken');

// Middleware to verify token and extract user info
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

const createEvent = async (req, res) => {
    try {
        const errors = validateEvent(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const { date, time, description } = req.body;
        const newEvent = new Event(events.length + 1, date, time, description, req.user.userId);
        events.push(newEvent);
        
        // Update cache
        await setCache('events', events);

        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const updateEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id);
        const event = events.find(e => e.id === eventId && e.organizerId === req.user.userId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        const errors = validateEvent(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        const { date, time, description } = req.body;
        event.date = date;
        event.time = time;
        event.description = description;

        res.json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id);
        const eventIndex = events.findIndex(e => e.id === eventId && e.organizerId === req.user.userId);

        if (eventIndex === -1) {
            return res.status(404).json({ message: 'Event not found or unauthorized' });
        }

        events.splice(eventIndex, 1);

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const registerForEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id);
        const event = events.find(e => e.id === eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.participants.includes(req.user.userId)) {
            return res.status(400).json({ message: 'User already registered for this event' });
        }

        event.participants.push(req.user.userId);

        res.json({ message: 'Registered for event successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

const getEvents = async (req, res) => {
    try {
        const cacheKey = 'events';
        try{
        const cachedEvents = await getCache(cacheKey);
    } catch (error) {
        // Cache miss, proceed to fetch events
    }

    // Fetch events and set cache
    await setCache(cacheKey, events);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEvents,
    authenticate
};
