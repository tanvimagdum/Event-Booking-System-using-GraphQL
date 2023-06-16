import React from 'react';
import EventItem from './EventItem';

const EventList = (props) => {
    const events = props.events.map(event => {
        return(
            <EventItem key={event._id} 
            eventId={event._id} 
            eventTitle={event.title} 
            eventDescription={event.description} 
            eventPrice={event.price}
            eventDate={event.date}
            userId={props.authUserId}
            creatorId={event.creator._id}
            onDetail={props.onViewDetail}/>
        );
    });

    return(
        <div className="list-group mt-5 mx-5">
            {events}
        </div>
    );
    
}

export default EventList;