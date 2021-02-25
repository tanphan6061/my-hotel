import * as hotelACtions from 'actions/hotels';
import { showSubRoutes } from 'helpers/routeHelper';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ADMIN_HOTEL_ROUTES } from 'routes';
import './style.scss';

function HotelLayout(props) {
  const { hotelActionCreators, hotelList } = props;
  const { setHotelEditing } = hotelActionCreators;
  const { hotelId } = useParams();
  useEffect(() => {
    if (hotelList.length > 0) setHotelEditing(hotelId);
  }, [hotelList]);

  return <Switch>{showSubRoutes(ADMIN_HOTEL_ROUTES)}</Switch>;
}

HotelLayout.propTypes = {};

const mapStateToProps = (state) => ({
  hotelEditing: state.hotels.hotelEditing,
  hotelList: state.hotels.hotelList,
});

const mapDispatchToProps = (dispatch) => ({
  hotelActionCreators: bindActionCreators(hotelACtions, dispatch),
});

HotelLayout.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(HotelLayout);
