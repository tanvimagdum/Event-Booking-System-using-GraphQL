import React from 'react';
import { Container } from 'react-bootstrap';

const BookingsControls = props => {
    return (
        <Container>
        <div className='nav nav-tabs justify-content-center mt-4'>
            <button 
                className={`nav-link me-2 ${
                    props.activeOutputType === 'list' ? 'active' : ''
                }`} 
                onClick={props.onChange.bind(this, 'list')}>
                    List
            </button>
            <button 
                className={`nav-link me-2 ${
                    props.activeOutputType === 'chart' ? 'active' : ''
                }`} 
                onClick={props.onChange.bind(this, 'chart')}>
                    Chart
            </button>
        </div>
        </Container>
    );
}

export default BookingsControls;