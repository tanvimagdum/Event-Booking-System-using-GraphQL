import { React } from "react";
import { Link } from 'react-router-dom';
import './MainNavigation.css';
import '../../index.css';
import AuthContext from '../../context/auth-context';

function MainNavigation() {

    return (
        <AuthContext.Consumer>
            {(context) => (
                <div className="container">
                    <div className="row bg-header-purple my-5 rounded-3">
                        <div className="col-3 my-3 mx-3">
                            <h2 className="heading">ticketWise</h2>
                        </div>
                        <div className="col my-3 mx-3">
                            {context.token && 
                                <button className="btn btn-secondary rounded-pill float-end mx-4 my-1" onClick={context.logout}>
                                    Logout
                                </button>}
                            <nav className="nav nav-tabs">
                                {!context.token && <Link className="nav-link text-dark" to="/auth">User Authentication</Link>}
                                <Link className="nav-link text-dark" to="/events">Events</Link>
                                {context.token && <Link className="nav-link text-dark" to="/bookings">Bookings</Link>}
                            </nav>  
                        </div>
                    </div> 
                </div>
            )}
        </AuthContext.Consumer>
    );
}

export default MainNavigation;