import CityCard from 'components/Home/CityCard';
import {
  Banner,
  Banner1,
  Banner2,
  Banner3,
  Banner4,
  DaLat,
  DaNang,
  HaNoi,
  HCM,
  Hue,
  NhaTrang,
  PhanThiet,
  QuangNam,
  VungTau,
} from 'constants/images';
import { enGB } from 'date-fns/locale';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRangePicker, END_DATE, START_DATE } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.scss';

const cityPopulars = [
  {
    title: 'Đà Nẵng',
    image: DaNang,
  },
  {
    title: 'Vũng Tàu',
    image: VungTau,
  },
  {
    title: 'TP Hồ Chí Minh',
    image: HCM,
  },
  {
    title: 'Hà Nội',
    image: HaNoi,
  },
  {
    title: 'Huế',
    image: Hue,
  },
  {
    title: 'Khánh Hòa',
    image: NhaTrang,
  },
  {
    title: 'Lâm Đồng',
    image: DaLat,
  },
  {
    title: 'Bình Thuận',
    image: PhanThiet,
  },
  {
    title: 'Quảng Nam',
    image: QuangNam,
  },
];

const itemBanners = [
  {
    src: Banner1,
    altText: '',
    caption: '',
    key: '1',
  },
  {
    src: Banner2,
    altText: '',
    caption: '',
    key: '2',
  },
  {
    src: Banner3,
    altText: '',
    caption: '',
    key: '3',
  },
  {
    src: Banner4,
    altText: '',
    caption: '',
    key: '4',
  },
];

const formatDate = (date) => {
  return moment(date).format('DD-MM-YYYY');
};
function Index() {
  const history = useHistory();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);
  const [keyword, setKeyword] = useState('');
  const [room, setRoom] = useState(1);
  const [people, setPeople] = useState(1);

  const searchHotel = () => {
    if (!startDate || !endDate)
      return toast.error('Vui lòng chọn ngày nhận phòng và ngày trả phòng');

    return history.push(
      `/search?keyword=${keyword}&room=${room}&people=${people}&checkin_date=${formatDate(
        startDate,
      )}&checkout_date=${formatDate(endDate)}`,
    );
  };

  return (
    <>
      <div className="bg" />
      <div className="container home">
        <div className="row home__banner">
          <div className="card shadow col-md-4 col-xs-12 p-0">
            <div className="card-header bg-primary text-white">
              TÌM KHÁCH SẠN
            </div>
            <div className="card-body p-1 pt-4">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-md-12 col-xs-12">
                    <input
                      placeholder="Nhập tên khách sạn hoặc địa điểm..."
                      type="text"
                      className="form-control"
                      id="keyword"
                      name="keyword"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>
                  <div className="form-group my-3">
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
                        <div className="date-range col-md-12 col-xs-12">
                          <input
                            className={`d-inline-block col-md-6 form-control input${
                              focus === START_DATE ? ' -focused' : ''
                            }`}
                            {...startDateInputProps}
                            placeholder="Ngày đặt phòng"
                          />
                          <span className="date-range_arrow" />
                          <input
                            className={`d-inline-block col-md-6 form-control input${
                              focus === END_DATE ? ' -focused' : ''
                            }`}
                            {...endDateInputProps}
                            placeholder="Ngày trả phòng"
                          />
                        </div>
                      )}
                    </DateRangePicker>
                  </div>
                  <div className="col-md-12 col-xs-12">
                    <div className="d-inline-block col-md-6 px-2 py-1 border">
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => {
                            if (room === people) setPeople(people + 1);
                            setRoom(room + 1);
                          }}
                          type="button"
                          className="btn-add"
                        >
                          +
                        </button>
                        <div className="d-inline-block">{room} phòng</div>
                        <button
                          onClick={() => {
                            if (room > 1) setRoom(room - 1);
                          }}
                          type="button"
                          className="btn-sub"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <div className="d-inline-block col-md-6 px-2 py-1 border">
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={() => setPeople(people + 1)}
                          type="button"
                          className="btn-add"
                        >
                          &#43;
                        </button>
                        <div className="d-inline-block">{people} khách</div>
                        <button
                          onClick={() => {
                            if (people > 1 && people > room)
                              setPeople(people - 1);
                          }}
                          type="button"
                          className="btn-sub"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 col-xs-12 my-4">
                    <button
                      onClick={searchHotel}
                      type="button"
                      className="btn btn-primary w-100"
                    >
                      Tìm khách sạn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Banner items={itemBanners} className="col-md-8 col-xs-12" />
        </div>

        <div className="mt-5 border-bottom">
          <h4>ĐIỂM ĐẾN PHỔ BIẾN VIỆT NAM</h4>
        </div>

        <div className="mt-3 row">
          {cityPopulars.map((city, index) => (
            <CityCard key={index} title={city.title} img={city.image} />
          ))}
        </div>
      </div>
    </>
  );
}

Index.propTypes = {};

Index.propTypes = {};

export default Index;
