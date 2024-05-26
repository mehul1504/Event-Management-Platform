class Event {
    constructor(id, date, time, description, organizerId) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.description = description;
        this.organizerId = organizerId;
        this.participants = [];
    }
}

const events = [];

module.exports = { Event, events };
