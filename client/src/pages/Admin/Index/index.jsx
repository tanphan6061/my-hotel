import * as hotelACtions from 'actions/hotels';
import FormHotel from 'components/Admin/FormHotel';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './style.scss';

// 'closed', 'temporarily', 'available', 'out of room';
const showStatus = (status) => {
  if (status === 'closed') return 'Đóng cửa';
  if (status === 'temporarily') return 'Tạm đóng cửa';
  if (status === 'out of room') return 'Hết phòng';
  return 'Có sẵn';
};

function AdminIndex(props) {
  const { hotelList, hotelActionCreators, isSuccess } = props;
  const { addHotel, deleteHotel } = hotelActionCreators;
  const closeModalButton = useRef(null);
  const [hotelSelected, sethotelSelected] = useState(null);

  useEffect(() => {
    if (isSuccess) closeModalButton.current.click();
  }, [isSuccess]);

  const handleDeleteHotel = () => {
    deleteHotel(hotelSelected._id);
    sethotelSelected(null);
  };

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Danh Sách Khách Sạn Quản Lý</h3>
            <p className="help-block">
              Tổng cộng: {hotelList.length} khách sạn
            </p>
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#myModal"
            >
              Thêm khách sạn
            </button>

            <div className="modal" id="myModal">
              <div
                style={{ minWidth: '85%', overflowY: 'auto' }}
                className="modal-dialog"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Thêm khách sạn</h4>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      ref={closeModalButton}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <FormHotel action={addHotel}> Thêm </FormHotel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content">
        <div className="box row" style={{ minHeight: '200px' }}>
          <div className="box-content w-100" style={{ padding: '50px 50px' }}>
            {hotelList.length < 1 ? (
              <p className="text-muted font-weight-bold">
                Hiện tại bạn chưa có khách sạn nào, vui lòng ấn thêm khách sạn
                để quản lý
              </p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên Khách Sạn</th>
                    <th>Địa Chỉ</th>
                    <th>Trạng Thái</th>
                    <th>Tuỳ Chỉnh</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelList.length > 0 &&
                    hotelList.map((hotel, key) => (
                      <tr key={key}>
                        <td>{key + 1}</td>
                        <td>
                          <Link to={`/admin/hotel/${hotel._id}/info`}>
                            {hotel.name}
                          </Link>
                        </td>
                        <td>
                          {`${hotel.street}, ${hotel.ward}, ${hotel.district}, ${hotel.city}`}
                        </td>
                        <td>{showStatus(hotel.status)}</td>
                        <td>
                          <Link
                            to={`/admin/hotel/${hotel._id}/edit`}
                            className="btn btn-success mr-2"
                          >
                            Sửa
                          </Link>
                          <button
                            onClick={() => {
                              sethotelSelected(hotel);
                            }}
                            type="button"
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#xoaModal"
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}{' '}
            <p className="text-danger">
              *Note: Các khách sạn chưa được xác nhận cần liên hệ với Admin My
              Hotel để được xác nhận và hoạt động
            </p>
          </div>
        </div>

        {/* modal Xoa */}
        {hotelSelected && (
          <div className="modal" id="xoaModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Xoá khách sạn</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  Bạn có muốn xoá khách sạn {hotelSelected.name}?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-default"
                  >
                    Huỷ
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={handleDeleteHotel}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.auth,
  hotelList: state.hotels.hotelList,
  isSuccess: state.ui.sweetAlert.isSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  hotelActionCreators: bindActionCreators(hotelACtions, dispatch),
});

AdminIndex.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
