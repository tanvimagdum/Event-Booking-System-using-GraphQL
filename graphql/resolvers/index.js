const bcrypt = require("bcryptjs");
const Event =  require('../../models/event');
const User =  require('../../models/user');

const events = eventIds => {
    return Event
    .find({_id: {$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return { 
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            }
        });
    })
    .catch(err => {
        throw err;
    });
}

const user = userId => {
    return User
    .findById(userId)
    .then(user => {
        return { 
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    })
    .catch(err => {
        throw err;
    })
}


module.exports = {
    events: () => {
        return Event
        .find()
        .then(events => {
            return events.map(event => {
                return { 
                    ...event._doc, 
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator) 
                };
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
            createdEvent = { 
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator) 
            };
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
    },
    createUser: args => {
        return User
        .findOne({ email: args.userInput.email })
        .then(user => {
            if(user) {
                throw new Error ("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
        })
        .then(hashedPassword => {
            const user = new User ({
                email: args.userInput.email,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            return { ...result._doc, password: null };
        })
        .catch(err => {
            throw err;
        });
        
    }
}