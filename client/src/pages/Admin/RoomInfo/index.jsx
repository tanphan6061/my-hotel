import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getView } from 'helpers/viewHelper';
import './style.scss';
import Banner from 'components/Common/Banner';

function RoomInfo(props) {
  const { roomEditing, hotelEditing, equipmentList } = props;
  const {
    name,
    quantity,
    price,
    area,
    people,
    views,
    equipments,
    images,
  } = roomEditing;

  const showEquipment = () => {
    const html = [];
    if (!roomEditing._id || !equipmentList) return html;
    equipmentList.forEach((equipment, index) => {
      if (equipments.includes(equipment._id))
        html.push(
          <div style={{ width: '33.33%' }} key={index}>
            <input
              id={equipment._id}
              className="form-control"
              value={equipment._id}
              type="checkbox"
              style={{ display: 'none' }}
              defaultChecked={equipments.includes(equipment._id)}
              disabled="true"
            />
            <label
              className="btn btn-default btn-lg equiment-icon"
              htmlFor={equipment._id}
            >
              <span className={equipment.icon} /> {equipment.name}
            </label>
          </div>,
        );
    });
    return html;
  };

  const showRoomImages = () => {
    if (!images) return null;
    const items = images.reduce((a, b) => {
      a.push({
        src: b,
        caption: '',
      });
      return a;
    }, []);
    return <Banner className="col-md-8 col-xs-12" items={items} />;
  };

  return !name ? null : (
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
            <Link
              to={`/admin/hotel/${hotelEditing._id}/room/${roomEditing._id}/edit`}
              className="btn btn-primary"
            >
              Chỉnh sửa
            </Link>
          </div>
        </div>
      </div>
      <div className="admin-content pb-5">
        <div className="box">
          <div className="box-header">THÔNG TIN CƠ BẢN</div>
          <div className="box-content">
            <div>
              <p style={{ fontSize: '1.1rem' }}>Ảnh của phòng:</p>
              <div className="d-flex justify-content-center">
                {' '}
                {showRoomImages()}
              </div>
            </div>
            <div className="mt-5">
              <p style={{ fontSize: '1.1rem' }}>Thông tin phòng:</p>
              <table className="table table-bordered room-table">
                <tbody>
                  <tr className="form-group">
                    <th>Tên loại phòng</th>
                    <td>{name}</td>
                  </tr>
                  <tr className="form-group">
                    <th>Số lượng</th>
                    <td>{quantity}</td>
                  </tr>
                  <tr className="form-group">
                    <th>Diện Tích (m2)</th>
                    <td>{area}</td>
                  </tr>
                  <tr className="form-group">
                    <th>Giá</th>
                    <td>
                      {price.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                  </tr>
                  <tr className="form-group">
                    <th>Số người tối đa</th>
                    <td>{people}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="my-5">
              <p style={{ fontSize: '1.1rem' }}>Hướng Phòng: </p>
              <div>{getView(views)}</div>
            </div>
            <div>
              <p style={{ fontSize: '1.1rem' }}>Tiện nghi phòng: </p>
              <div className="d-flex flex-wrap">{showEquipment()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  roomEditing: state.room.roomEditing,
  hotelEditing: state.hotels.hotelEditing,
  equipmentList: state.equipment.equipmentList,
});

export default connect(mapStateToProps, null)(RoomInfo);
