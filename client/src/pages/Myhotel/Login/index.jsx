import Logo from 'assets/images/logo.png';
import LoginForm from 'components/Common/LoginForm';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Login() {
  return (
    <div className="login-admin">
      <div className="bg" />
      <div className="container pt-1">
        <Link to="/">
          <img
            src={Logo}
            className="img-responsive"
            style={{ width: '200px' }}
            alt="logo"
          />
        </Link>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <h2 className="mb-4" style={{ color: '#3e37ba' }}>
              ADMIN WEBSITE MYHOTEL
            </h2>
            <div className="user user-bg">
              <h3>Đăng nhập tài khoản</h3>
              <LoginForm rolePage="1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
