import { fetchEquipmentList } from 'actions/equipment';
import { getHotelById } from 'actions/hotels';
import { fetchRoomList } from 'actions/room';
import Banner from 'components/Common/Banner';
import RowRom from 'components/Home/RowRoom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

const showRoomImages = (images) => {
  if (!images) return null;
  const items = images.reduce((a, b) => {
    a.push({
      src: b,
      caption: '',
    });
    return a;
  }, []);
  return <Banner className="col-md-10 col-xs-12" items={items} />;
};

const showEquipment = (equipmentList, equipments) => {
  const html = [];
  if (!equipmentList) return html;
  equipmentList.forEach((equipment, index) => {
    if (equipments.includes(equipment._id))
      html.push(
        <div className="mt-2">
          <i className={equipment.icon} /> {equipment.name}
        </div>,
      );
  });
  return html;
};

function DetailHotel() {
  const params = useParams();
  const { hotelId } = params;
  const dispatch = useDispatch();
  const hotelEditing = useSelector((state) => state.hotels.hotelEditing);
  const equipmentList = useSelector((state) => state.equipment.equipmentList);
  const roomList = useSelector((state) => state.room.roomList);
  const [currentRoom, setCurrentRoom] = useState(null);

  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const query = new URLSearchParams(useLocation().search);
  const checkinDate =
    query.get('checkin_date') || today.toLocaleDateString('en-GB');
  const checkoutDate =
    query.get('checkout_date') || nextDay.toLocaleDateString('en-GB');

  useEffect(() => {
    dispatch(getHotelById(hotelId));
    dispatch(fetchRoomList(hotelId));
    dispatch(fetchEquipmentList());
  }, []);
  return (
    <>
      <div className="container home">
        <hr />
        <h2>{hotelEditing.name}</h2>
        <span className="text-mute">
          <i className="fas fa-map-marker-alt" />{' '}
          {`${hotelEditing.street}, ${hotelEditing.ward}, ${hotelEditing.district}, ${hotelEditing.city}`}
        </span>
        <br />
        <span className="text-mute">
          <i className="fa fa-phone" /> {hotelEditing.phone}
        </span>
        <div className="d-flex justify-content-end">
          <a
            href="#book-room"
            className="btn btn-warning text-white"
            type="button"
          >
            ĐẶT PHÒNG NGAY GIỮ GIÁ TỐT
          </a>
        </div>
        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-uppercase text-center">loại phòng</th>
                <th className="text-uppercase text-center">tối đa</th>
                <th className="text-uppercase text-center">
                  giá một đêm
                  <br />
                  <small className="text-lowercase">
                    Chưa bao gồm thuế, phí
                  </small>
                </th>
                <th className="text-uppercase text-center">số lượng</th>
                <th className="text-uppercase text-center" id="book-room">
                  đặt phòng
                </th>
              </tr>
            </thead>
            <tbody>
              {roomList.map((room, key) => (
                <RowRom
                  key={key}
                  setCurrentRoom={setCurrentRoom}
                  checkinDate={checkinDate}
                  checkoutDate={checkoutDate}
                  room={room}
                />
              ))}
            </tbody>
          </table>
        </div>

        {currentRoom && (
          <div className="modal" id="myModal">
            <div className="modal-dialog" style={{ minWidth: '85%' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">{currentRoom.name}</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <div className="modal-body">
                  <div className="d-flex">
                    <div>{showRoomImages(currentRoom.images)}</div>
                    <div className="flex-grow-1">
                      <h3>Tiện nghi phòng</h3>
                      {showEquipment(equipmentList, currentRoom.equipments)}
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Thoát
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

export default DetailHotel;
