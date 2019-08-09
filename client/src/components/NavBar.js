import React, {useContext, } from 'react';
import {AuthContext, } from '../providers/AuthProvider';
import {Menu, Header} from 'semantic-ui-react';
import {Link, withRouter, } from 'react-router-dom';

const NavBar = (props) => {
  const {handleLogout, admin} = useContext(AuthContext);

  const adminControls = () => {
    if (admin === true) {
      return (
        <Menu.Item>
            <br />
            <Link
              to='/admin'
              align='center'>
              Admin
            </Link>
        </Menu.Item>
      )
    }
  }

  return (  
    <Menu>
        <Menu.Item>
          <br />
          <Link 
            to='/'
            align='center'>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item>
          <br />
          <Link
            to='/login'
            align='center'>
            Login
          </Link>
        </Menu.Item>
        <Menu.Item>
          <br />
          <Link
            to='/register'
            align='center'>
            Register
          </Link>
        </Menu.Item>
        {adminControls()}
        <Menu.Item>
          <br />
          <Link
            to='/'
            align='center'
            onClick={ () => handleLogout(props.history)}>
            LogOut
          </Link>
        </Menu.Item>
    </Menu>
  );
}
 
export default NavBar;