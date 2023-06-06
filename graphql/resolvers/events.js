const Event =  require('../../models/event');
const { transformEvent } = require("./merge");

module.exports = {
    events: () => {
        return Event
        .find()
        .then(events => {
            return events.map(event => {
                return transformEvent(event);   
            });
        })
        .catch(err => {
            throw err;
        });
    },
    createEvent: args => {
        const event = new Event ({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '647eb540c1c73161e7c8b685'
        });
        let createdEvent;
        return event
        .save()
        .then(result => {
            createdEvent = transformEvent(result);
            return User.findById('647eb540c1c73161e7c8b685');
        })
        .then(user => {
            if(!user) {
                throw new Error("User not found");
            }
            user.createdEvents.push(event);
            return user.save();
        })
        .then(result => {
            return createdEvent;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }
};