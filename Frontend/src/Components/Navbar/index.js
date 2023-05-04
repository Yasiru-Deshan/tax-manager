import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { AuthContext } from "../../Context/AuthContext";
import {Navigate } from "react-router-dom";

const Navbar = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [color, setColor] = useState("#000");

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
      setColor("#000");
    } else {
      setScrollNav(false);
      setColor("#000");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };
  const auth = useContext(AuthContext);

  const signOut = () => {
    auth.logout();
    <Navigate to={"/login"} />;
  };

  return (
    <>
      <Nav scrollNav={scrollNav} style={{ background: { color } }}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            Tax Manager
          </NavLogo>

          {/* <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon> */}

          <NavMenu>
              {auth.isLoggedIn && (
            <NavItem>
              <NavLinks
                to="/"
                smooth={1}
                duration={500}
                spy={1}
                exact="true"
                offset={-80}
              >
                Home
              </NavLinks>
            </NavItem>)}

            {auth.role === "ct" && (
              <NavItem>
                <NavLinks
                  to="/tax"
                  smooth={1}
                  duration={500}
                  spy={1}
                  exact="true"
                  offset={-80}
                >
                  Tax Calculator
                </NavLinks>
              </NavItem>
            )}
           
            {!auth.isLoggedIn && (
              <NavBtn>
                <NavBtnLink to="/">Sign In</NavBtnLink>
              </NavBtn>
            )}
            {/* {auth.isLoggedIn && (
              <NavBtn>
                <NavBtnLink>{auth.organization}</NavBtnLink>
              </NavBtn>
            )} */}
           
            {auth.isLoggedIn && auth.token != null && (
              <button
                className="btn btn-danger m-4"
                onClick={signOut}
              >
                Logout
              </button>
             
            )}
          </NavMenu>
          {/* <NavBtn>
                <NavBtnLink to="/login">Sign In</NavBtnLink>
              </NavBtn> */}
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
