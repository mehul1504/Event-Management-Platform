const validateRegistration = (data) => {
    const errors = [];

    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
        errors.push('Please enter a valid email address.');
    }
    if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }
    if (!data.role || (data.role !== 'attendee' && data.role !== 'organizer')) {
        errors.push('Role must be either attendee or organizer.');
    }

    return errors;
};

const validateLogin = (data) => {
    const errors = [];

    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
        errors.push('Please enter a valid email address.');
    }
    if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    return errors;
};

const validateEvent = (data) => {
    const errors = [];

    if (!data.date || isNaN(Date.parse(data.date))) {
        errors.push('Please enter a valid date.');
    }
    if (!data.time || typeof data.time !== 'string') {
        errors.push('Please enter a valid time.');
    }
    if (!data.description || typeof data.description !== 'string') {
        errors.push('Description is required.');
    }

    return errors;
};

module.exports = {
    validateRegistration,
    validateLogin,
    validateEvent
};
