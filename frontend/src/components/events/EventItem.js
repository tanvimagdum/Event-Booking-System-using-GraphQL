import React from 'react';

const EventItem = (props) => {
    const formattedDate = new Date(props.eventDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return(
        // <div key={props.eventId} className="list-group-item flex-column align-items-start">
        //     <div className="d-flex w-100 justify-content-between">
        //         <h5 className="mt-2 mb-2">{props.eventTitle}</h5>
        //         <button className='btn btn-primary'>View Details</button>
        //         {/* <small>{event.date}</small> */}
        //     </div>
        //     {/* <p className="mb-2 mt-2">{props.eventDescription}</p> */}
        //     <small>${props.eventPrice}</small>
        // </div>

        <div key={props.eventId} className="list-group-item container">
            <div className="row">
                <div className='col'>
                    <h4 className="mt-2 mb-2">{props.eventTitle}</h4>
                    <small>${props.eventPrice}</small><br/>
                    <small>{formattedDate}</small>
                </div>
                {props.userId === props.creatorId ? <div className='col-3 align-self-center'>
                    <p>You are the owner of this event.</p>
                </div> :
                <div className='col-2 align-self-center text-center'>
                    <button className='btn btn-primary' onClick={props.onDetail.bind(this, props.eventId)}>View Details</button>
                </div>}
            </div>
        </div>
    );
}

export default EventItem;