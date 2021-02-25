import * as roomACtions from 'actions/room';
import { getView } from 'helpers/viewHelper';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './style.scss';

function AdminIndex(props) {
  const { roomList, roomActionCreators, hotelEditing } = props;
  const { fetchRoomList, deleteRoom } = roomActionCreators;
  const [roomSelected, setroomSelected] = useState(null);
  const { url } = useRouteMatch();

  useEffect(() => {
    if (hotelEditing._id) fetchRoomList(hotelEditing._id);
  }, [hotelEditing]);

  const handledeleteRoom = () => {
    deleteRoom(roomSelected._id);
    setroomSelected(null);
  };

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Danh Sách Phòng</h3>
            <p className="help-block">Tổng cộng: {roomList.length} phòng</p>
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <Link to={`${url}/add`} className="btn btn-primary">
              Thêm phòng
            </Link>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="box" style={{ minHeight: '200px' }}>
          <div className="box-content w-100" style={{ padding: '50px 50px' }}>
            {roomList.length < 1 ? (
              <p className="text-muted font-weight-bold">
                Khách sạn chưa có phòng nào, vui lòng ấn thêm phòng để quản lý
              </p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên loại phòng</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Hướng Phòng</th>
                    <th>Tuỳ Chỉnh</th>
                  </tr>
                </thead>
                <tbody>
                  {roomList.map((room, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>
                        <Link to={`${url}/${room._id}/info`}>{room.name}</Link>
                      </td>
                      <td>{room.quantity}</td>
                      <td>
                        {room.price.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td>{getView(room.views)}</td>
                      <td>
                        <Link
                          to={`${url}/${room._id}/edit`}
                          className="btn btn-success mr-2"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => {
                            setroomSelected(room);
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
            )}
          </div>
        </div>

        {/* modal Xoa */}
        {roomSelected && (
          <div className="modal" id="xoaModal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Xoá phòng</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  Bạn có muốn xoá phòng {roomSelected.name}?
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
                    onClick={handledeleteRoom}
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
  hotelEditing: state.hotels.hotelEditing,
  roomList: state.room.roomList,
});

const mapDispatchToProps = (dispatch) => ({
  roomActionCreators: bindActionCreators(roomACtions, dispatch),
});

AdminIndex.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
