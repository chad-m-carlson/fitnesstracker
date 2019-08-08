import React, {useContext} from 'react';
import {AuthContext} from '../providers/AuthProvider';

const Home  = () => {
  const {authenticated, user} = useContext(AuthContext);
  return ( 
    <>
    {console.log(authenticated)}
      <h1>Home Page</h1>
      {authenticated &&
        <h2>Welcome {user.email}</h2>
        }
    </>
   );
}
 
export default Home ;