import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

function EditHotel(props) {
  const { hotelEditing } = props;
  const {
    _id,
    name,
    city,
    district,
    ward,
    star,
    status,
    phone,
    avatar,
    description,
    street,
  } = hotelEditing;

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Thông tin khách sạn</h3>
          </div>
          <div className="col-md-3">
            <Link to={`/admin/hotel/${_id}/edit`} className="btn btn-primary">
              Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
      <div className="admin-content pb-5">
        <div>
          <div className="box">
            <div className="box-header">THÔNG TIN CƠ BẢN</div>
            <div className="box-content">
              <div className="row">
                <div className="col-md-7">
                  <div className="col-md-12">
                    <div className="box-content-line">
                      <p>Tên khách sạn:</p>
                      <div className="help-block">{name}</div>
                    </div>
                  </div>
                  <div className="row m-0">
                    <div className="col-md-5">
                      <div className="box-content-line">
                        <p>Tỉnh/ thành phố:</p>
                        <div className="help-block">{city}</div>
                      </div>
                      <div className="box-content-line">
                        <p>Xã/ phường: </p>
                        <div className="help-block">{ward}</div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="box-content-line">
                        <p>Quận/ huyện: </p>
                        <div className="help-block">{district}</div>
                      </div>

                      <div className="box-content-line">
                        <p>Địa chỉ: </p>
                        <div className="help-block">{street}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-5" style={{ paddingLeft: '0px' }}>
                  <div className="row m-0">
                    <div className="col-md-5" style={{ paddingLeft: '0px' }}>
                      <div className="box-content-line">
                        <p>Sao: </p>
                        <div className="help-block">{star}</div>
                      </div>
                      <div className="box-content-line">
                        <p>Trạng thái: </p>
                        <div className="help-block">{status}</div>
                      </div>
                      <div className="box-content-line">
                        <p>Số điện thoại: </p>
                        <div className="help-block">{phone}</div>
                      </div>
                    </div>
                    <div className="col-md-7" style={{ padding: '0 ' }}>
                      <div className="box-content-line">
                        <p className="text-center">
                          Ảnh đại diện cho khách sạn:{' '}
                        </p>
                        <img
                          id="avt"
                          src={avatar}
                          className="img-thumbnail"
                          alt="Avatar-ks"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">MÔ TẢ KHÁCH SẠN</div>
            <div
              className="box-content"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: description }}
              style={{ minHeight: '200px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  hotelEditing: state.hotels.hotelEditing,
});

EditHotel.propTypes = {};

export default connect(mapStateToProps, null)(EditHotel);
