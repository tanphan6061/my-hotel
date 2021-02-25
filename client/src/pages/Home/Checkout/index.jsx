import { getHotelById } from 'actions/hotels';
import { getRoomById } from 'actions/room';
import { createTransaction } from 'actions/transaction';
import { enGB } from 'date-fns/locale';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { DateRangePicker, END_DATE, START_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Bill from 'components/Home/Bill';
import './style.scss';

function Checkout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  //get query
  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('keyword') || '';
  const checkinDate =
    query.get('checkin_date') || today.toLocaleDateString('en-GB');
  const checkoutDate =
    query.get('checkout_date') || nextDay.toLocaleDateString('en-GB');
  const roomId = query.get('room_id');
  if (!roomId) history.push('/error');

  // get data from redux
  const userInfo = useSelector((state) => state.auth.userInfo);
  const hotelEditing = useSelector((state) => state.hotels.hotelEditing);
  const roomEditing = useSelector((state) => state.room.roomEditing);

  useEffect(() => {
    dispatch(getRoomById(roomId));
  }, []);

  useEffect(() => {
    if (roomEditing.hotel) dispatch(getHotelById(roomEditing.hotel));
  }, [roomEditing]);

  //state
  const [startDate, setStartDate] = useState(
    moment(checkinDate, 'DD-MM-YYYY').toDate(),
  );
  const [endDate, setEndDate] = useState(
    moment(checkoutDate, 'DD-MM-YYYY').toDate(),
  );
  const [room, setRoom] = useState(query.get('room') || 1);
  const [fullname, setFullname] = useState(userInfo.fullname);
  const [phone, setPhone] = useState(userInfo.phone);

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const diffDate = () => {
    const start = moment(startDate, 'DD-MM-YYYY');
    const end = moment(endDate, 'DD-MM-YYYY');
    return moment.duration(end.diff(start)).asDays();
  };

  const checkout = () => {
    if (fullname.length < 5) return toast.error('Họ và tên tối thiểu 5 kí tự');
    if (room < 1) return toast.error('Tối thiểu 1 phòng');
    if (!phone) return toast.error('Số điện thoại không được trống');
    if (/\+?(84|09|03|01[2|6|8|9])+([0-9]{8,9})\b/.test(phone) === false)
      return toast.error('Số điện thoại không hợp lệ');
    if (!startDate || !endDate)
      return toast.error('Nhập ngày nhận phòng và ngày trả phòng');
    dispatch(
      createTransaction({
        room: roomEditing._id,
        fullname,
        phone,
        checkin_date: moment(startDate).format('MM/DD/YYYY'),
        checkout_date: moment(endDate).format('MM/DD/YYYY'),
        amount: room,
        totalPrice: room * roomEditing.price,
      }),
    );
    setCheckoutSuccess(true);
    return true;
  };

  const data = {
    hotelEditing: hotelEditing || '',
    startDate: startDate || '',
    endDate: endDate || '',
    room: room || '',
    fullname: fullname || '',
    phone: phone || '',
    roomEditing: roomEditing || '',
  };

  return checkoutSuccess ? (
    <Bill data={data} />
  ) : (
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
              <strong>Họ và Tên</strong>
              <input
                className="form-control  mb-3 mt-1"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type="text"
              />
              <strong>Số điện thoại</strong>
              <input
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
              />
            </div>
            <div className="w-50">
              <div className="d-flex">
                <div>
                  <div className="d-flex">
                    <strong className="flex-grow-1">Ngày nhận phòng</strong>
                    <strong className="flex-grow-1">Ngày trả phòng</strong>
                  </div>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                    minimumDate={new Date()}
                    minimumLength={1}
                    format="dd/MM/yyyy"
                    locale={enGB}
                  >
                    {({ startDateInputProps, endDateInputProps, focus }) => (
                      <div className="date-range ">
                        <input
                          className={`d-inline-block  mb-3 mt-1 col-md-6 form-control input${
                            focus === START_DATE ? ' -focused' : ''
                          }`}
                          {...startDateInputProps}
                        />
                        <span className="date-range_arrow" />
                        <input
                          className={`d-inline-block col-md-6 form-control input${
                            focus === END_DATE ? ' -focused' : ''
                          }`}
                          {...endDateInputProps}
                        />
                      </div>
                    )}
                  </DateRangePicker>
                </div>
              </div>
              <strong>Số phòng</strong>
              <input
                className="form-control "
                type="number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                min="1"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center mt-3">
          <button
            onClick={checkout}
            className="btn btn-primary w-25 mb-4"
            type="button"
          >
            Đặt phòng
          </button>
          <div className="textbottom p-4 w-75 text-center rounded mb-4">
            Thanh toán ngay để giữ <strong>phòng trống</strong> và{' '}
            <strong>giá tốt nhất</strong>
          </div>
        </div>
      </div>

      <div className="datngay ">
        <div className="bg-primary p-3 text-white header1">Đặt ngay!</div>
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
