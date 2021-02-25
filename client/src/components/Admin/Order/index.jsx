import { getRoomById } from 'actions/room';
import { checkIn } from 'actions/transaction';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import 'react-nice-dates/build/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Oder(props) {
  const { data } = props;
  const {
    fullname,
    phone,
    startDate,
    endDate,
    amount,
    totalPrice,
    room,
    hotel,
    id,
    status,
    transactionCode,
  } = data;

  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const roomName = useSelector((state) => state.room.roomEditing.name);

  useEffect(() => {
    dispatch(getRoomById(room));
  }, []);

  const receiveRoom = () => {
    if (!code) return toast.error('Mã xác nhận không được trống');
    return dispatch(checkIn({ id, code }));
  };

  const totalDateHire = moment
    .duration(
      moment(endDate, 'DD/MM/YYYY').diff(moment(startDate, 'DD/MM/YYYY')),
    )
    .asDays();

  return (
    <div className="container home d-flex justify-content-between">
      <div className="mr-4 border hotel-info">
        <div className="checkout">
          <div className="p-4">
            <h3 className="text-danger">{hotel.name}</h3>
            {[...Array(hotel.star)].map((item, itemKey) => (
              <i key={itemKey} className="fa fa-star text-warning" />
            ))}
            <h5>
              {' '}
              <i
                className="fas fa-map-marker-alt"
                style={{ fontSize: '0.8em' }}
              />
              &nbsp;{' '}
              {`${hotel.street}, ${hotel.ward}, ${hotel.district}, ${hotel.city}`}
            </h5>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Nhận phòng: </strong>{' '}
              </span>{' '}
              {startDate}
            </div>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Trả phòng:</strong>{' '}
              </span>{' '}
              {endDate}
            </div>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Tổng số ngày thuê:</strong>{' '}
              </span>{' '}
              {totalDateHire} ngày{' '}
            </div>
          </div>
        </div>

        <div className="ttlh p-4">
          <h3>Thông Tin Liên Hệ</h3>
          <div className="d-flex justify-content-between">
            <div className="w-50 mr-5">
              <div className="mt-3">
                <strong>Họ và Tên: </strong>
                {fullname}
              </div>
              <div className="mt-4">
                <strong>Số điện thoại: </strong>
                {phone}
              </div>
            </div>
            <div className="w-75">
              <div className="d-flex flex-column">
                <div className="mt-3">
                  <strong>Nhận phòng: </strong> {startDate} <br />
                  <strong>Trả phòng: </strong> {endDate}
                </div>
                <div>
                  <strong>Số phòng: </strong>
                  {amount}
                </div>
              </div>
            </div>
          </div>
        </div>
        {status === 0 && !transactionCode && (
          <div className="p-4">
            <div>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="form-control"
                placeholder="Nhập mã xác nhận"
              />
              <div className="d-flex justify-content-center">
                <button
                  onClick={receiveRoom}
                  className="btn btn-primary mt-2"
                  type="button"
                >
                  Nhận phòng
                </button>
              </div>
            </div>
          </div>
        )}
        {status === 0 && transactionCode && (
          <div>
            <div>
              <div className="mb-4 text-center">
                <h4 className="d-inline">
                  {' '}
                  Mã xác thực:{' '}
                  <h3 className="bg-success w-25 p-2 rounded text-center text-white d-inline">
                    {transactionCode}
                  </h3>
                </h4>
              </div>

              <p>
                <h5
                  className="text-danger"
                  style={{ fontSize: '18px', display: 'inline' }}
                >
                  *Note:{' '}
                </h5>
                Vui lòng cung cấp mã xác thực cho nhân viên lễ tân khi đến quầy
                làm thủ tục nhận phòng
              </p>
            </div>
            <div className="d-flex flex-column align-items-center mt-5">
              <Link
                // onClick={checkout}
                className="btn btn-primary w-25 mb-4"
                to="/"
              >
                Về Trang chủ
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="datngay ">
        <div className="bg-primary p-3 text-white header1">Thông tin!</div>
        <div className="d-flex flex-column justify-content-between header2">
          <div>
            <div className="border-bottom p-3 pb-5">
              <strong>{roomName}</strong>
              <div>{amount} Phòng</div>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <strong>Tổng tiền: </strong>
            <div>{totalPrice} </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Oder;
