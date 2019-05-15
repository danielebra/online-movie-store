import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render = {props =>
            // Check if the user is authenticated, if it is then load the component, otherwise redirect to login
            auth.isAuthenticated === true ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )
        }
    />
);


const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
