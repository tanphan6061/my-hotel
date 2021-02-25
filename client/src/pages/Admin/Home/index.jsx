import * as hotelACtions from 'actions/hotels';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import './style.scss';

function AdminHome(props) {
  const { isAuth, hotelActionCreators, hotels } = props;

  return (
    <div className="admin-content">
      <div className="box">
        <div className="box-content">
          <div className="col-sm-4">
            <div className="row">
              <div className="col-sm-3">
                <img
                  style={{ borderRadius: '50%', display: 'inline' }}
                  width="80px"
                  src="img/avt.jpg"
                  alt=""
                />
              </div>
              <div className="col-sm-9">
                <h4>
                  <a
                    data-toggle="tooltip"
                    data-original-title="Bấm để chuyển tới khách sạn"
                    data-placement="bottom"
                    href="index.php?controller=trang-chu/thong-tin-khach-san&hotel=1"
                    target="_blank"
                  >
                    {' '}
                    Khách Sạn Dana Marina
                  </a>
                </h4>
                <p className="fas star-4" />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <h4> Địa Chỉ: </h4>
            <p> So 47-49 Duong Vo Van Kiet, Quận Sơn Trà, Thành phố Đà Nẵng</p>
          </div>
          <div className="col-sm-4">
            <h4>Đánh Giá:</h4>
            <p>Chưa Tồn Tại Đánh Giá </p>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-6 col-sm-12">
          <div className="row hoa-don">
            <a
              href="index.php?controller=quan-ly/don-dat-phong&hotel=1&type=xuly"
              className="btn bg-tcong btn-item col-sm-6"
              style={{ width: '49%' }}
            >
              <h1 style={{ marginBottom: 0 }}>1</h1>
              <span>ĐƠN THÀNH CÔNG</span>
            </a>
            <a
              href="index.php?controller=quan-ly/don-dat-phong&hotel=1"
              className="btn bg-chuaxn btn-item col-sm-6 pull-right"
              style={{ width: '49%' }}
            >
              <h1 style={{ marginBottom: '0' }}>7</h1>
              <span>ĐƠN CHƯA XÁC NHẬN</span>
            </a>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row box" style={{ minHeight: '250px' }}>
                <div className="box-header">Tổng Doanh Thu</div>
                <div className="box-content">
                  <h2 className="text-primary">
                    {' '}
                    20,251,720 <sup>vnđ</sup>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12 doanh-thu">
          <div className="box" style={{ minHeight: '380px', margin: '0' }}>
            <div className="box-header">
              <div className="row">
                <div className="col-md-6">
                  <label className="label label-primary" htmlFor="NgayBatDau">
                    Ngày Bắt Đầu
                    <div className="input-group" id="datetimepicker1">
                      <input
                        type="text"
                        id="NgayBatDau"
                        className="form-control"
                      />
                      <span className="input-group-addon">
                        <span className="glyphicon glyphicon-calendar" />
                      </span>
                    </div>
                  </label>
                </div>
                <div className="col-md-6">
                  <div className="input-group" id="datetimepicker2">
                    <input
                      type="text"
                      id="NgayKetThuc"
                      className="form-control"
                    />
                    <span className="input-group-addon">
                      <span className="glyphicon glyphicon-calendar" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <input type="hidden" id="MKs" value="1" />
            <div className="box-content">
              <h4>Doanh Thu Theo Thời Gian:</h4>
              <h2 className="text-primary" id="DoanhThu" />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <div className="box row" style={{ minHeight: '300px' }}>
            <div className="box-header">Đánh giá từ khách hàng</div>
            <div
              className="box-content"
              id="danhgia"
              style={{ maxHeight: '320px' }}
            >
              <div className="text-danger">Khách sạn chưa có đánh giá nào.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.auth,
});

const mapDispatchToProps = (dispatch) => ({
  hotelActionCreators: bindActionCreators(hotelACtions, dispatch),
});

AdminHome.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
