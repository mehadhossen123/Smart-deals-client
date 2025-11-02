import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { NavLink } from 'react-router';

const PrivateRoute = ({children}) => {

     const { user } = use(AuthContext);
    if(user){
        return children;
    }

   
    return <NavLink to="/register"></NavLink>
        
            
        
};

export default PrivateRoute;