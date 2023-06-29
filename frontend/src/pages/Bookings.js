import { React, useState, useEffect, useContext } from "react";
import BookingList from '../components/bookings/BookingList';
import BookingsChart from "../components/bookings/BookingsChart";
import BookingsControls from "../components/bookings/BookingsControls/BookingsControls";
import Spinner from '../components/spinner/Spinner';
import AuthContext from "../context/auth-context";

function BookingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [outputType, setOutputType] = useState('list');
    const contextType = useContext(AuthContext);

    const fetchBookings = () => {
        setIsLoading(true);
        const requestBody = {
            query: `
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            price
                            date
                        }
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
            const bookings = resData.data.bookings;
            console.log(bookings);
            setBookings(bookings);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    const cancelBookingHandler = (bookingId) => {
        setIsLoading(true);
        const requestBody = {
            query: `
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id) {
                        _id
                        title
                    }
                }
            `,
            variables: {
                id: bookingId
            }
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
            setIsLoading(false);
            setBookings(prevBookings => {
                const updatedBookings = prevBookings.filter(booking => {
                    return booking._id !== bookingId;
                });
                return updatedBookings;
            });
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }

    const changeOutputTypeHandler = outputType => {
        if (outputType === 'list') {
            setOutputType('list');
        } else {
            setOutputType('chart');
        }

    }

    let content = <Spinner />;
    if (!isLoading) {
        content = (
            <>
                <BookingsControls 
                    activeOutputType={outputType}
                    onChange={changeOutputTypeHandler}/>
                <div>
                    {outputType === 'list' ? <BookingList  bookings={bookings} onCancelBooking={cancelBookingHandler}/> :
                        <BookingsChart bookings={bookings} /> }
                </div>
            </>
        )
    }
    return (
        <div>
            {content}
        </div>
    );
}

export default BookingsPage;