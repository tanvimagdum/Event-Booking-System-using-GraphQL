import React from 'react';
import BookingItem from './BookingItem';


const BookingList = (props) => {
    const bookings = props.bookings.map(booking => {
        return(
            <BookingItem key={booking._id} 
            bookingId={booking._id} 
            eventTitle={booking.event.title}
            eventPrice={booking.event.price}
            createdAt={booking.createdAt}
            onCancel={props.onCancelBooking}/>
        );
    });

    return(
        <div className="list-group mt-5 mx-5">
            {bookings}
        </div>
    );
    
}

export default BookingList;
