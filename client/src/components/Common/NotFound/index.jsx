import { Logo } from 'constants/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function NotFound() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className="justify-content-center d-flex">
          <div className="bg p-5">
            <img src={Logo} alt="logo" />
          </div>
          <div className="error mt-5 p-5 d-flex flex-column">
            Oops!
            <div className="fas icon"></div>
            <span className="message">
              <strong>404</strong> - Trang không tồn tại
            </span>
          </div>
        </div>
        <Link className="btn btn-dark" to="/">
          Về trang chủ
        </Link>
      </div>
    </>
  );
}

NotFound.propTypes = {};

export default NotFound;
