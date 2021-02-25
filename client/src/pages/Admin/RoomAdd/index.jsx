import * as equipmentActions from 'actions/equipment';
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
    equipmentActionsCreators,
    roomActionsCreators,
  } = props;
  const { fetchEquipmentList } = equipmentActionsCreators;
  const { addRoom } = roomActionsCreators;
  const saveButton = useRef(null);

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3 className="pb-3">Thông tin phòng</h3>
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
              Thêm phòng
            </button>
          </div>
        </div>
      </div>
      <FormRoom
        saveButton={saveButton}
        hotelEditing={hotelEditing}
        action={addRoom}
        equipmentList={equipmentList}
      >
        Thêm phòng
      </FormRoom>
    </>
  );
}

RoomAdd.propTypes = {};

const mapStateToProps = (state) => ({
  hotelEditing: state.hotels.hotelEditing,
  equipmentList: state.equipment.equipmentList,
});

const mapDispatchToProps = (dispatch) => ({
  equipmentActionsCreators: bindActionCreators(equipmentActions, dispatch),
  roomActionsCreators: bindActionCreators(roomActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomAdd);
