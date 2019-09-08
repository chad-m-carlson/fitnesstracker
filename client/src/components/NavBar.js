import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, } from '../providers/AuthProvider';
import {Menu, Dropdown} from 'semantic-ui-react';
import {NavLink, Link} from 'react-router-dom';

const NavBar = (props) => {
  const {handleLogout, admin, authenticated} = useContext(AuthContext);
  const [dimensions, setDimensions] = useState({height: window.innerHeight, width: window.innerWidth})

  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }
  useEffect( () => {
    const handleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)
    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)}
  })

  const adminControls = () => {
    if (admin === true) {
      return (
        <NavLink
          to='/admin'
          activeStyle={{textDecoration: "underline"}}
          align='center'
          style={{color: "black"}}>
          Admin
        </NavLink>
      )
    }
  }

  return (  
    <>
    <Menu fixed="top" style={{madWidth: "{dimensions.width}"}}>
      <Link to="/">
        <img src="https://static.wixstatic.com/media/b52571_71db7fe581844a49bed79066aabd7481~mv2.png/v1/fill/w_508,h_120,al_c,lg_1,q_80/b52571_71db7fe581844a49bed79066aabd7481~mv2.webp" alt="logo" style={{height: "3rem", padding: ".3rem"}}/>
      </Link>
      {dimensions.width > 600 ?
      <>
      <Menu.Menu position='right'>
        <Menu.Item>
          <br />
          <NavLink 
            to='/'
            exact
            activeStyle={{textDecoration: "underline"}}
            align='center'
            style={{color: "black"}}>
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <br />
          <NavLink 
            to='/profile'
            exact
            activeStyle={{textDecoration: "underline"}}
            align='center'
            style={{color: "black"}}>
            Profile
          </NavLink>
        </Menu.Item>
        {!authenticated &&
        <>
          <Menu.Item>
            <br />
              <NavLink
              to='/login'
              activeStyle={{textDecoration: "underline"}}
              align='center'
              style={{color: "black"}}>
                Login
              </NavLink>
          </Menu.Item>
          <Menu.Item>
            <br />
            <NavLink
              to='/register'
              activeStyle={{textDecoration: "underline"}}
              align='center'
              style={{color: "black"}}>
              Register
            </NavLink>
          </Menu.Item>
        </>
        }
        {admin &&
          <Menu.Item>
            <br />
            {adminControls()}
          </Menu.Item>
        }
        <Menu.Item>
          <br />
          <NavLink
            exact
            to='/'
            align='center'
            onClick={ () => handleLogout(props.history)}
            style={{color: "black"}}>
            Logout
          </NavLink>
        </Menu.Item>
        </Menu.Menu>
        </>
        :
        <Menu.Menu position='right'>
          <Dropdown item icon='bars'>
            <Dropdown.Menu style={{width: "10rem"}}>
              <Dropdown.Item style={{textAlign: "center"}}>
                  <NavLink 
                    to='/'
                    exact
                    activeStyle={{textDecoration: "underline"}}
                    align='center'
                    style={{color: "black"}}>
                    Home
                  </NavLink>
              </Dropdown.Item>
              <Dropdown.Item style={{textAlign: "center"}}>
                <NavLink 
                  to='/profile'
                  exact
                  activeStyle={{textDecoration: "underline"}}
                  align='center'
                  style={{color: "black"}}>
                  Profile
                </NavLink>
              </Dropdown.Item>
              {!authenticated &&
              <>
                <Dropdown.Item style={{textAlign: "center"}}>
                  <NavLink
                  to='/login'
                  activeStyle={{textDecoration: "underline"}}
                  align='center'
                  style={{color: "black"}}>
                    Login
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item style={{textAlign: "center"}}>
                  <NavLink
                    to='/register'
                    activeStyle={{textDecoration: "underline"}}
                    align='center'
                    style={{color: "black"}}>
                    Register
                  </NavLink>
                </Dropdown.Item>
              </>
              }
              <Dropdown.Item style={{textAlign: "center"}}>
                {adminControls()}
              </Dropdown.Item>
              <Dropdown.Item style={{textAlign: "center"}}>
                <NavLink
                  to='/'
                  exact
                  align='center'
                  onClick={ () => handleLogout(props.history)}
                  style={{color: "black"}}>
                  Logout
                </NavLink>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      }
    </Menu>
    </>
  );
};

 
export default NavBar;