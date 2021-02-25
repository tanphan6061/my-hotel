import * as equipmentActions from 'actions/equipment';
import * as roomActions from 'actions/room';
import { showSubRoutes } from 'helpers/routeHelper';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ADMIN_ROOM_ROUTES } from 'routes';
import './style.scss';

function RoomLayout(props) {
  const {
    roomActionsCreators,
    roomList,
    hotelEditing,
    equipmentActionsCreators,
  } = props;
  const { setRoomEditing, fetchRoomList } = roomActionsCreators;
  const { fetchEquipmentList } = equipmentActionsCreators;
  const { roomId } = useParams();

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  useEffect(() => {
    if (hotelEditing._id) fetchRoomList(hotelEditing._id);
  }, [hotelEditing]);

  useEffect(() => {
    if (roomList.length > 0) setRoomEditing(roomId);
  }, [roomList]);

  return <Switch>{showSubRoutes(ADMIN_ROOM_ROUTES)}</Switch>;
}

RoomLayout.propTypes = {};

const mapStateToProps = (state) => ({
  roomList: state.room.roomList,
  hotelEditing: state.hotels.hotelEditing,
});

const mapDispatchToProps = (dispatch) => ({
  roomActionsCreators: bindActionCreators(roomActions, dispatch),
  equipmentActionsCreators: bindActionCreators(equipmentActions, dispatch),
});

RoomLayout.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(RoomLayout);
