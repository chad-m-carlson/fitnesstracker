import React, { useContext } from "react";
import { useWindowWidth } from "../Hooks/setWindowWidth";
import { AuthContext } from "../providers/AuthProvider";
import { Menu, Dropdown } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";

const NavBar = props => {
  const { handleLogout, admin, authenticated } = useContext(AuthContext);
  const dimensions = useWindowWidth();

  const adminControls = () => (
    <NavLink
      to="/admin"
      activeStyle={{ textDecoration: "underline" }}
      align="center"
      style={{ color: "black" }}
    >
      Admin
    </NavLink>
  );

  return (
    <>
      <Menu fixed="top" style={{ madWidth: "{dimensions.width}" }}>
        <Link to="/">
          <img
            src="https://static.wixstatic.com/media/b52571_71db7fe581844a49bed79066aabd7481~mv2.png"
            alt="logo"
            style={{ height: "3rem", padding: ".3rem" }}
          />
        </Link>
        {dimensions.width > 600 ? (
          <>
            <Menu.Menu position="right">
              <Menu.Item>
                <br />
                <NavLink
                  to="/"
                  exact
                  activeStyle={{ textDecoration: "underline" }}
                  align="center"
                  style={{ color: "black" }}
                >
                  Home
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <br />
                <NavLink
                  to="/profile"
                  exact
                  activeStyle={{ textDecoration: "underline" }}
                  align="center"
                  style={{ color: "black" }}
                >
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink
                  to="/exercise_search"
                  exact
                  activeStyle={{ textDecoration: "underline" }}
                  align="center"
                  style={{ color: "black" }}
                >
                  Exercise Search
                </NavLink>
              </Menu.Item>
              {!authenticated && (
                <>
                  <Menu.Item>
                    <br />
                    <NavLink
                      to="/login"
                      activeStyle={{ textDecoration: "underline" }}
                      align="center"
                      style={{ color: "black" }}
                    >
                      Login
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item>
                    <br />
                    <NavLink
                      to="/register"
                      activeStyle={{ textDecoration: "underline" }}
                      align="center"
                      style={{ color: "black" }}
                    >
                      Register
                    </NavLink>
                  </Menu.Item>
                </>
              )}
              {admin && (
                <Menu.Item>
                  <br />
                  {adminControls()}
                </Menu.Item>
              )}
              <Menu.Item>
                <br />
                <NavLink
                  exact
                  to="/"
                  align="center"
                  onClick={() => handleLogout(props.history)}
                  style={{ color: "black" }}
                >
                  Logout
                </NavLink>
              </Menu.Item>
            </Menu.Menu>
          </>
        ) : (
          <Menu.Menu position="right">
            <Dropdown item icon="bars">
              <Dropdown.Menu style={{ width: "10rem" }}>
                <Dropdown.Item style={{ textAlign: "center" }}>
                  <NavLink
                    to="/"
                    exact
                    activeStyle={{ textDecoration: "underline" }}
                    align="center"
                    style={{ color: "black" }}
                  >
                    Home
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item style={{ textAlign: "center" }}>
                  <NavLink
                    to="/profile"
                    exact
                    activeStyle={{ textDecoration: "underline" }}
                    align="center"
                    style={{ color: "black" }}
                  >
                    Profile
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item style={{ textAlign: "center" }}>
                  <NavLink
                    to="/exercise_search"
                    exact
                    activeStyle={{ textDecoration: "underline" }}
                    align="center"
                    style={{ color: "black" }}
                  >
                    Exercise Search
                  </NavLink>
                </Dropdown.Item>
                {!authenticated && (
                  <>
                    <Dropdown.Item style={{ textAlign: "center" }}>
                      <NavLink
                        to="/login"
                        activeStyle={{ textDecoration: "underline" }}
                        align="center"
                        style={{ color: "black" }}
                      >
                        Login
                      </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item style={{ textAlign: "center" }}>
                      <NavLink
                        to="/register"
                        activeStyle={{ textDecoration: "underline" }}
                        align="center"
                        style={{ color: "black" }}
                      >
                        Register
                      </NavLink>
                    </Dropdown.Item>
                  </>
                )}
                {admin && (
                  <Dropdown.Item style={{ textAlign: "center" }}>
                    {adminControls()}
                  </Dropdown.Item>
                )}
                <Dropdown.Item style={{ textAlign: "center" }}>
                  <NavLink
                    to="/"
                    exact
                    align="center"
                    onClick={() => handleLogout(props.history)}
                    style={{ color: "black" }}
                  >
                    Logout
                  </NavLink>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
      </Menu>
    </>
  );
};

export default NavBar;
