import * as authActions from 'actions/auth';
import { CorporateIcon, HotelIcon, InfoIcon, Logo } from 'constants/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  UncontrolledDropdown,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import './style.scss';

const HomeHeader = (props) => {
  const { isAuth, fullname, authActionCreators } = props;
  const { logout } = authActionCreators;
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <div className="header sticky-top">
      <Navbar className="container px-1 py-0" light expand="md">
        <Link className="header__logo" to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/">
                <img
                  className="header__icon"
                  src={HotelIcon}
                  alt="hotel icon"
                />
                &nbsp;Khách Sạn
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/admin/login">
                <img
                  className="header__icon"
                  src={CorporateIcon}
                  alt="corporate icon"
                />
                &nbsp;Đối Tác MyHotel
              </NavLink>
            </NavItem>
            <NavItem>
              <a className="nav-link" href="#about">
                <img
                  className="header__icon"
                  src={InfoIcon}
                  alt="corporate icon"
                />
                &nbsp;Về Chúng Tôi
              </a>
            </NavItem>
          </Nav>
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {isAuth && fullname ? fullname : ' Tài Khoản'}
              </DropdownToggle>
              <DropdownMenu>
                {isAuth ? (
                  <>
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: '#212529',
                      }}
                      to="/user/history"
                    >
                      <DropdownItem>Lịch Sử Đặt Phòng </DropdownItem>
                    </Link>
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: '#212529',
                      }}
                      to="/user/edit"
                    >
                      <DropdownItem>Quản Lý Tài Khoản</DropdownItem>
                    </Link>
                    <DropdownItem onClick={handleLogout}>
                      Đăng Xuất
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem>
                      <Link
                        style={{
                          textDecoration: 'none',
                          color: '#212529',
                        }}
                        to="/login"
                      >
                        Đăng Nhập
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link
                        style={{
                          textDecoration: 'none',
                          color: '#212529',
                        }}
                        to="/register"
                      >
                        Đăng Ký
                      </Link>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.auth,
  fullname: state.auth.userInfo.fullname,
});

const mapDispatchToProps = (dispatch) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
