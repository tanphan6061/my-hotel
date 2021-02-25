import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { filterHotel } from 'actions/hotels';

export default function SearchHotel() {
  const dispatch = useDispatch();
  const today = new Date();
  const nextDay = new Date();
  nextDay.setDate(today.getDate() + 1);

  const query = new URLSearchParams(useLocation().search);
  const keyword = query.get('keyword') || '';
  const checkinDate =
    query.get('checkin_date') || today.toLocaleDateString('en-GB');
  const checkoutDate =
    query.get('checkout_date') || nextDay.toLocaleDateString('en-GB');
  const room = query.get('room') || 1;
  const people = query.get('people') || 1;

  const hotelList = useSelector((state) => state.hotels.hotelList);
  useEffect(() => {
    dispatch(
      filterHotel({
        keyword,
        room,
        people,
      }),
    );
  }, []);

  return (
    <>
      <div className="container home">
        <ul className="breadcrumb mb-5 mt-3">
          <li className="breadcrumb-item">
            <Link to="/">Khách sạn</Link>
          </li>
          <li className="breadcrumb-item active">
            {keyword ? (
              <span>Tìm kiếm với từ khoá: &quot;{keyword}&quot;</span>
            ) : (
              <span>Tìm kiếm tất cả </span>
            )}
          </li>
        </ul>
        <hr />
        <div>
          {hotelList.length > 0 &&
            hotelList.map((hotel, index) => (
              <div
                className="col-md-12 col-xs-12 row"
                style={{ marginTop: '20px' }}
                key={index}
              >
                <div className="col-md-3 col-xs-3">
                  <a href="index.php?controller=trang-chu/thong-tin-khach-san&amp;hotel=1">
                    <img
                      className="img-thumbnail"
                      src={hotel.avatar}
                      alt="avatar hotel"
                    />
                  </a>
                </div>
                <div className="col-md-9 col-xs-9">
                  <div className="text-left">
                    <h4>
                      <Link to={`/hotel/${hotel._id}`}>{hotel.name}</Link>
                    </h4>
                    <span className="text-mute">
                      <i className="fas fa-map-marker-alt" />
                      &nbsp;
                      {`${hotel.street}, ${hotel.ward}, ${hotel.district}, ${hotel.city}`}
                    </span>
                  </div>
                  <div className="text-right">
                    <Link
                      to={`/hotel/${hotel._id}?checkin_date=${checkinDate}&checkout_date=${checkoutDate}`}
                      className="btn btn-warning text-white"
                    >
                      Xem phòng
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          {hotelList.length === 0 && (
            <div>Không có kết quả khớp với từ khoá {`"${keyword}"`}</div>
          )}
        </div>
      </div>
    </>
  );
}

SearchHotel.propTypes = {};
