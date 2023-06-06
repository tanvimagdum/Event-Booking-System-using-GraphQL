const Booking = require('../../models/booking');
const Event =  require('../../models/event');
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
    bookings: () => {
        return Booking
        .find()
        .then(bookings => {
            return bookings.map(booking => {
                return transformBooking(booking);
            });
        })
        .catch(err => {
            throw err;
        });
    },
    bookEvent: args => {
        return Event
        .findOne({ _id: args.eventId })
        .then(fetchedEvent => {
            const newBooking = new Booking({
                user: '647eb540c1c73161e7c8b685',
                event: fetchedEvent
            });

            return newBooking
            .save()
            .then(result => {
                return transformBooking(result);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
        });
    },
    cancelBooking: args => {
        let deletedBooking;
        return Booking
        .findById(args.bookingId)
        .populate('event')
        .then(booking => {
            if (!booking) {
                throw new Error('Booking not found');
            }
            deletedBooking = transformEvent(booking.event);
            return Booking.deleteOne({ _id: args.bookingId });
        })
        .then(() => {
            return deletedBooking;
        })
        .catch(err => {
            throw err;
        });

    }
}