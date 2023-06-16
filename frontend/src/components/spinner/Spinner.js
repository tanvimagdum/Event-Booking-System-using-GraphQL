import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return(
        <div className='text-center'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Spinner;


