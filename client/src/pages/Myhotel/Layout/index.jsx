import * as authActions from 'actions/auth';
import classnames from 'classnames';
import Header from 'components/Admin/Header';
import MenuRight from 'components/Admin/MenuRight';
import { EquipmentIcon, UserIcon } from 'constants/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

const menuList = [
  {
    to: '/myhotel/user',
    title: 'Quản Lý Tài Khoản',
    icon: UserIcon,
  },
  {
    to: '/myhotel/equipment',
    title: 'Quản Lý Tiện Nghi',
    icon: EquipmentIcon,
  },
];

function MyhotelLayout(props) {
  const { authActionCreators, fullname, children } = props;
  const { logout } = authActionCreators;
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <>
      <MenuRight
        homeUrl="/"
        menuList={menuList}
        className={classnames({ 'close-menu': !toggleMenu })}
      />

      <main id="main" className={classnames({ 'close-menu': !toggleMenu })}>
        <Header
          logout={logout}
          fullname={fullname}
          isIndexPage={false}
          setToggleMenu={() => {
            setToggleMenu(!toggleMenu);
          }}
        />
        {/* content page */}
        {children}
        {/* content page */}
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  fullname: state.auth.userInfo.fullname,
});

const mapDispatchToProps = (dispatch) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyhotelLayout);
