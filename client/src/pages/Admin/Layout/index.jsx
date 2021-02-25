import * as authActions from 'actions/auth';
import * as hotelACtions from 'actions/hotels';
import classnames from 'classnames';
import Header from 'components/Admin/Header';
import MenuRight from 'components/Admin/MenuRight';
import {
  DiscountIcon,
  HistoryIcon,
  InfoIcon,
  RoomIcon,
  TagIcon,
} from 'constants/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './style.scss';

function AdminLayout(props) {
  const {
    hotelActionCreators,
    authActionCreators,
    fullname,
    hotelEditing,
    children,
  } = props;

  const location = useLocation();
  const { logout } = authActionCreators;
  const { fetchHotelList } = hotelActionCreators;
  const [toggleMenu, setToggleMenu] = useState(true);
  const isIndexPage =
    location.pathname === '/admin/hotel' || location.pathname === '/admin';
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    fetchHotelList();
  }, []);

  useEffect(() => {
    if (hotelEditing._id) {
      setMenuList([
        {
          to: `/admin/hotel/${hotelEditing._id}/info`,
          title: 'Thông tin',
          icon: InfoIcon,
        },
        {
          to: `/admin/hotel/${hotelEditing._id}/room`,
          title: 'Quản Lý Phòng',
          icon: RoomIcon,
        },
        {
          to: `/admin/hotel/${hotelEditing._id}/booking`,
          title: 'Đơn đặt phòng',
          icon: TagIcon,
        },
      ]);
    }
  }, [hotelEditing]);

  return (
    <>
      {!isIndexPage && menuList.length > 0 && (
        <MenuRight
          homeUrl="/admin/hotel"
          hotelEditing={hotelEditing}
          menuList={menuList}
          className={classnames({ 'close-menu': !toggleMenu })}
        />
      )}

      <main
        id={isIndexPage ? 'index' : 'main'}
        className={classnames({ 'close-menu': !toggleMenu })}
      >
        <Header
          logout={logout}
          hotelEditing={hotelEditing}
          fullname={fullname}
          isIndexPage={isIndexPage}
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

AdminLayout.propTypes = {};

const mapStateToProps = (state) => ({
  fullname: state.auth.userInfo.fullname,
  hotelEditing: state.hotels.hotelEditing,
});

const mapDispatchToProps = (dispatch) => ({
  hotelActionCreators: bindActionCreators(hotelACtions, dispatch),
  authActionCreators: bindActionCreators(authActions, dispatch),
});

AdminLayout.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
