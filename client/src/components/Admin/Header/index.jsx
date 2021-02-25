import { CalendarIcon, ClockIcon, Logo, UserIcon } from 'constants/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

//Ngày
const days = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

function showDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const thu = d.getDay();
  return `${days[thu]}, ${day}/ ${month}/ ${year}`;
}

function Index(props) {
  const { setToggleMenu, isIndexPage, hotelEditing, fullname, logout } = props;
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const a = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return (
    <div className="menu-top">
      <div className="px-3 d-flex justify-content-between">
        {isIndexPage ? (
          <Link to="/">
            <img
              src={Logo}
              style={{ minHeight: '45px', height: '45px' }}
              alt="logo"
            />
          </Link>
        ) : (
          <h4 className="navbar-text">
            <span
              tabIndex={-1}
              role="button"
              onClick={setToggleMenu}
              style={{ fontSize: '20px' }}
              className="openbtn"
              id="open-menu"
            >
              ☰
            </span>
          </h4>
        )}
        <div className="d-flex align-items-center">
          {!isIndexPage && hotelEditing?.name && (
            <h4 style={{ padding: '0.5rem' }}>{hotelEditing.name}</h4>
          )}
          {!isIndexPage && !hotelEditing?.name && (
            <h4 style={{ padding: '0.5rem' }}>Admin Website MyHotel</h4>
          )}
          <div className="menu-top__item">
            <img src={CalendarIcon} alt="calendar icon" className="icon" />
            &nbsp;
            {showDate()}
          </div>
          <div className="menu-top__item">
            <img src={ClockIcon} alt="clock icon" className="icon" /> &nbsp;
            {time}
          </div>
          <div className="menu-top__item user-select-none">
            <div
              type="button"
              className="dropdown-toggle"
              data-toggle="dropdown"
            >
              <img src={UserIcon} alt="user icon" className="icon" /> &nbsp;
              {fullname}
            </div>
            <div className="dropdown-menu ">
              <a className="dropdown-item" href="#1">
                Thiết lập tài khoản
              </a>
              <button type="button" onClick={logout} className="dropdown-item">
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.propTypes = {};

export default Index;
