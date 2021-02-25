import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';

function LeftSideBar() {
  return (
    <div className="mr-5 d-flex flex-column w-25">
      <NavLink
        to="/user/history"
        className="wrapper-link w-t p-2 pl-3"
        activeClassName="isActive"
      >
        Lịch sử đặt phòng
      </NavLink>
      <NavLink
        to="/user/edit"
        className="wrapper-link w-b p-2 pl-3"
        activeClassName="isActive"
      >
        Quản lý tài khoản
      </NavLink>
    </div>
  );
}

export default LeftSideBar;
