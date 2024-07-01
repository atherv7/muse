// import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Protected({component:Component, ...routeProps}) {
    return (document.cookie.indexOf('jwt=') !== -1) ? <Component {...routeProps}/> : <Navigate to='/login'/>
}