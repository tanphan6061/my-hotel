import moment from 'moment';
import React from 'react';
import 'react-nice-dates/build/style.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

function Checkout(props) {
  const { data } = props;
  const {
    hotelEditing,
    startDate,
    endDate,
    room,
    fullname,
    phone,
    roomEditing,
  } = data;

  const transactionEditing = useSelector(
    (state) => state.transaction.transactionEditing,
  );
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const diffDate = () => {
    const start = moment(startDate, 'DD-MM-YYYY');
    const end = moment(endDate, 'DD-MM-YYYY');
    return moment.duration(end.diff(start)).asDays();
  };
  return (
    <div className="container home d-flex justify-content-between">
      <div className="mr-4 border hotel-info">
        <div className="checkout">
          <div className="p-4">
            <h3 className="text-danger">{hotelEditing.name}</h3>
            {[...Array(hotelEditing.star)].map((item, itemKey) => (
              <i key={itemKey} className="fa fa-star text-warning" />
            ))}

            <h5>
              {' '}
              <i
                className="fas fa-map-marker-alt"
                style={{ fontSize: '0.8em' }}
              />
              &nbsp; {hotelEditing.street}, {hotelEditing.ward},{' '}
              {hotelEditing.district}, {hotelEditing.city}
            </h5>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Nhận phòng:</strong>{' '}
              </span>{' '}
              Ngày {formatDate(startDate)}
            </div>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Trả phòng:</strong>{' '}
              </span>{' '}
              Ngày {formatDate(endDate)}
            </div>
            <div className="d-flex ">
              <span className="w-25">
                <strong>Tổng số ngày thuê:</strong>{' '}
              </span>{' '}
              {diffDate()} ngày{' '}
            </div>
          </div>
        </div>

        <div className="ttlh p-4">
          <h3>Thông Tin Liên Hệ</h3>
          <div className="d-flex justify-content-between">
            <div className="w-50 mr-5">
              <div className="mt-3">
                <strong>Họ và Tên</strong>
                <p>{fullname}</p>
              </div>
              <div className="mt-4">
                <strong>Số điện thoại</strong>
                <p>{phone}</p>
              </div>
            </div>
            <div className="w-75">
              <div className="d-flex mt-3">
                <div>
                  <strong className="flex-grow-1">Ngày nhận : </strong>
                  {formatDate(startDate)}&nbsp;-&nbsp;
                  <strong className="flex-grow-1">Ngày trả: </strong>
                  {formatDate(endDate)}
                </div>
              </div>
              <div className="mt-5">
                <strong>Số phòng: </strong>
                {room}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-center">
            <h4 className="d-inline">
              {' '}
              Mã xác thực:{' '}
              <h3 className="bg-success w-25 p-2 rounded text-center text-white d-inline">
                {transactionEditing.code}
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
            Vui lòng cung cấp mã xác thực cho nhân viên lễ tân khi đến quầy làm
            thủ tục nhận phòng
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

      <div className="datngay ">
        <div className="bg-primary p-3 text-white header1">Thông tin!</div>
        <div className="d-flex flex-column justify-content-between header2">
          <div>
            <div className="border-bottom p-3 pb-5">
              <strong>Superior King</strong>
              <div>{room} Phòng</div>
            </div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <strong>Tổng tiền: </strong>
            <div>
              {(roomEditing.price * room).toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
