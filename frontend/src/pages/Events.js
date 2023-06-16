import { React, useState, useRef, useContext, useEffect } from 'react';
import EventList from '../components/events/EventList';
import EventModal from '../components/modal/EventModal';
import Spinner from '../components/spinner/Spinner';
import AuthContext from "../context/auth-context";

function EventsPage() {

    const [isOpen, setIsOpen] = useState(false);
    const [isEvents, setIsEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const dateRef = useRef(null);
    const descriptionRef = useRef(null);

    const contextType = useContext(AuthContext);

    const showModal = () => {
      setIsOpen(true);
    };
  
    const hideModal = () => {
      setIsOpen(false);
      setSelectedEvent(null);
    };

    const confirmModal = () => {
        setIsOpen(false);
        const title = titleRef.current.value;
        const price = +priceRef.current.value;
        const date = dateRef.current.value;
        const description = descriptionRef.current.value;

        if(title.trim().length === 0 ||
            price <= 0 ||
            date.trim().length === 0 ||
            description.trim().length === 0
        ) {
            return;
        }

        const event = {title, price, date, description};
        console.log(event);

        const requestBody = {
            query: `
                mutation {
                    createEvent(eventInput: {
                        title: "${title}",
                        description: "${description}",
                        price: ${price},
                        date: "${date}" 
                    }) {
                        _id
                        title
                        description
                        date
                        price
                    }
                }
            `
        }
        
        const token = contextType.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        })
        .then(resData => {
            setIsEvents(prevEvents => [
                ...prevEvents,
                {
                  _id: resData.data.createEvent._id,
                  title: resData.data.createEvent.title,
                  description: resData.data.createEvent.description,
                  date: resData.data.createEvent.date,
                  price: resData.data.createEvent.price,
                  creator: {
                    _id: contextType.userId,
                  },
                },
              ]);
        })
        .catch(err => {
            console.log(err);
        });

    }

    const fetchEvents = () => {
        setIsLoading(true);
        const requestBody = {
            query: `
                query {
                    events {
                        _id
                        title
                        description
                        date
                        price
                        creator {
                            _id
                            email
                        }
                    }
                }
            `
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed!");
            }
            return res.json();
        })
        .then(resData => {
            const events = resData.data.events;
            setIsEvents(events);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const showDetailHandler = (eventId) => {
        const selectedEvent = isEvents.find(e => e._id === eventId);
        setSelectedEvent(selectedEvent);
      };

    const bookEventHandler = () => {}

    return (
        <>
            {isOpen && 
            <EventModal title="Add Event" 
                        canConfirm canCancel 
                        isOpen={isOpen} 
                        onHide={hideModal} 
                        onCancel={hideModal} 
                        onConfirm={confirmModal}
                        confirmText="Confirm">
                <form className='mx-3'>
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" ref={titleRef}/> <br/>
                    <label htmlFor="price">Price</label>
                    <input type="number" className="form-control" id="price" ref={priceRef}/><br/>
                    <label htmlFor="date">Date</label>
                    <input type="datetime-local" className="form-control" id="date" ref={dateRef}/><br/>
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" ref={descriptionRef}/><br/>
                </form>
            </EventModal>}

            {selectedEvent && 
            <EventModal title={selectedEvent.title} 
                        canConfirm canCancel 
                        isOpen={selectedEvent} 
                        onHide={hideModal} 
                        onCancel={hideModal} 
                        onConfirm={bookEventHandler}
                        confirmText="Book">
                <h1>{selectedEvent.title}</h1><br/>
                <h6>
                    {new Date(selectedEvent.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </h6>
                <h3>${selectedEvent.price}</h3>
                <p>{selectedEvent.description}</p>
            </EventModal>}

            {contextType.token && <div className="text-center">
                <h5>Share your Events now!!</h5> <br/>
                <button className="btn btn-primary" onClick={showModal}>Create Event</button>
            </div>}

            {isLoading ? <Spinner /> : 
            <EventList  events={isEvents}
                        authUserId={contextType.userId}
                        onViewDetail={showDetailHandler}/> }
        </>
    );
}

export default EventsPage;