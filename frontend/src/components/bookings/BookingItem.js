import React from 'react';

const BookingItem = (props) => {
    const formattedDate = new Date(props.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return(
        <div key={props.bookingId} className="list-group-item container">
            <div className="row">
                <div className='col'>
                    <h4 className="mt-2 mb-2">{props.eventTitle}</h4>
                    <small>Paid ${props.eventPrice}</small><br/>
                    <small>{formattedDate}</small>
                </div>
                <div className='col-2 align-self-center text-center'>
                    <button className='btn btn-primary' onClick={props.onCancel.bind(this, props.bookingId)}>Cancel Booking</button>
                </div>
            </div>
        </div>
    );
}

export default BookingItem;