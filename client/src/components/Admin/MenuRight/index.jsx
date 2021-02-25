import { Logo } from 'constants/icons';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

function Index(props) {
  const { className, menuList, homeUrl } = props;
  return (
    <div id="mySidebar" className={`${className} sidebar`}>
      <Link to={homeUrl}>
        <img src={Logo} alt="logo" />
      </Link>
      <ul>
        {menuList.map((item, index) => (
          <li key={index} className="admin__menu-right__item">
            <NavLink to={item.to} activeClassName="menu-right__item__active">
              <img
                src={item.icon}
                className="admin__menu-right__icon"
                alt="home icon"
              />{' '}
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

Index.propTypes = {};

export default Index;
