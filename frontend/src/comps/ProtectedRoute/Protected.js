// import React from 'react';
import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({element:Component, ...rest}) {
//   return (
//     <Route
//       {...rest}
//       render = {props =>
//         localStorage.getItem('jwt') ? (
//           <Component {...props}/>
//         ):(
//           <Navigate to='/login'/>
//         )
//       }
//     />
//   );
// }

export default function Protected({component:Component, ...routeProps}) {
    return (localStorage.getItem('jwt')) ? <Component {...routeProps}/> : <Navigate to='/login'/>
}