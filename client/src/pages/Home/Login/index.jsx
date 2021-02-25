import LoginForm from 'components/Common/LoginForm';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Login() {
  return (
    <>
      <div className="bg" />
      <div className="container p-4">
        <div className="user user-center">
          <h2 className="page-header text-center">Đăng Nhập</h2>
          <LoginForm rolePage="3" />
          <hr />
          <p className="help-block d-flex justify-content-between align-items-center">
            <span>Chưa có tài khoản?</span>
            <Link to="/register" className="pull-right btn btn-success">
              Đăng Ký
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

Login.propTypes = {};

export default Login;
