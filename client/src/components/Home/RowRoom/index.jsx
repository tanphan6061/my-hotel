import Banner from 'components/Common/Banner';
import { getView } from 'helpers/viewHelper';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RowRom(props) {
  const { room, checkinDate, checkoutDate, setCurrentRoom } = props;
  const { images } = room;
  const [amount, setAmount] = useState(1);

  return (
    <>
      <tr>
        <td colSpan="5">
          <h4 className="text-capitalize">{room.name}</h4>
        </td>
      </tr>
      <tr>
        <td style={{ minWidth: '360px' }}>
          <img
            className="img-thumbnail img-responsive"
            src={room.images[0]}
            alt="img room"
          />
          <p>
            <span
              style={{ cursor: 'pointer' }}
              className="badge badge-primary"
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => setCurrentRoom(room)}
            >
              Xem ảnh và tiện nghi
            </span>
          </p>
          <p>
            Diện tích: {room.area} m<sup>2</sup>
          </p>
          <p>Hướng: {getView(room.views)}</p>
        </td>
        <td style={{ minWidth: '150px' }}>
          <span className="glyphicon glyphicon-user" /> x {room.people} người
        </td>
        <td className="col-md-2" style={{ maxWidth: '250px' }}>
          <h3 className="text-success text-right">
            {room.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
          </h3>
        </td>
        <td className="col-md-2" style={{ minWidth: '150px' }}>
          <select
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="form-control"
            name=""
            id=""
          >
            {[...Array(room.quantity)].map((item, itemKey) => (
              <option key={itemKey} value={itemKey + 1}>
                {itemKey + 1} phòng
              </option>
            ))}
          </select>
        </td>
        <td style={{ minWidth: '200px' }}>
          <Link
            to={`/checkout?room=${amount}&checkin_date=${checkinDate}&checkout_date=${checkoutDate}&room_id=${room._id}`}
            type="submit"
            className="btn btn-warning text-white btn-block text-uppercase"
          >
            Đặt ngay
          </Link>
        </td>
      </tr>
    </>
  );
}

RowRom.propTypes = {};

export default RowRom;
