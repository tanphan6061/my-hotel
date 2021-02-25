import * as roomActions from 'actions/room';
import FormRoom from 'components/Admin/FormRoom';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './style.scss';

function RoomAdd(props) {
  const {
    hotelEditing,
    equipmentList,
    roomActionsCreators,
    roomEditing,
  } = props;
  const { editRoom } = roomActionsCreators;
  const saveButton = useRef(null);
  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3 className="pb-3">Sửa thông tin phòng</h3>
            <Link to={`/admin/hotel/${hotelEditing._id}/room`}>
              {' '}
              {'<'} Quay lại
            </Link>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <button
              onClick={() => saveButton.current.click()}
              className="btn btn-primary"
              type="button"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
      <FormRoom
        saveButton={saveButton}
        hotelEditing={hotelEditing}
        action={editRoom}
        equipmentList={equipmentList}
        roomEditing={roomEditing}
      >
        Lưu thay đổi
      </FormRoom>
    </>
  );
}

RoomAdd.propTypes = {};

const mapStateToProps = (state) => ({
  hotelEditing: state.hotels.hotelEditing,
  equipmentList: state.equipment.equipmentList,
  roomEditing: state.room.roomEditing,
});

const mapDispatchToProps = (dispatch) => ({
  roomActionsCreators: bindActionCreators(roomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomAdd);
