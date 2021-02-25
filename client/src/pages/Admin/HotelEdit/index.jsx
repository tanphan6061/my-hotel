import * as hotelACtions from 'actions/hotels';
import FormHotel from 'components/Admin/FormHotel';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

function EditHotel(props) {
  const { hotelActionCreators, hotelEditing } = props;
  const { editHotel } = hotelActionCreators;

  const saveButton = useRef(null);

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Thông tin khách sạn</h3>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => saveButton.current.click()}
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
      <div className="admin-content pb-5">
        <FormHotel
          saveButton={saveButton}
          hotelEditing={hotelEditing}
          action={editHotel}
        >
          Lưu thay đổi
        </FormHotel>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  hotelEditing: state.hotels.hotelEditing,
});

const mapDispatchToProps = (dispatch) => ({
  hotelActionCreators: bindActionCreators(hotelACtions, dispatch),
});

EditHotel.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditHotel);
