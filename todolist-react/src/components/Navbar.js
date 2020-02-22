import React, { Component } from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logout} from "../actions/securityActions"

class Navbar extends Component {
    
    logout() {
        this.props.logout();
        window.location.href = "/";
    }
    render() {
        const {validToken, user} = this.props.security;
        const userLogined = (
            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                    className="nav-link"
                    to="/logout"
                    onClick={this.logout.bind(this)}
                    >
                    Logout
                    </Link>
                </li>
                </ul>
            </div>
        );

        let navLinks;
        if(validToken && user){
            navLinks = userLogined;
        }

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        ToDoList
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon" />
                    </button>
                    {navLinks}
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps,{logout})(Navbar);