import * as authActions from 'actions/auth';
import * as locationActions from 'actions/location';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import './style.scss';

function Register(props) {
  const {
    location,
    locationActionCreators,
    authActionCreators,
    isAuth,
  } = props;
  const { cityList, districtList, wardList } = location;
  const { getCityList, getDistrictList, getWardList } = locationActionCreators;
  const { register } = authActionCreators;

  const email = useRef(null);
  const fullname = useRef(null);
  const password = useRef(null);
  const repassword = useRef(null);
  const city = useRef(null);
  const district = useRef(null);
  const ward = useRef(null);
  const street = useRef(null);
  const phone = useRef(null);

  const renderListLocation = (list) => {
    let html = null;
    if (list) {
      html = list.map((i, key) => {
        return (
          <option value={i.ID} key={key}>
            {i.Title}
          </option>
        );
      });
    }
    return html;
  };

  const onChangeCity = (e) => {
    getDistrictList(e.target.value);
  };

  const onChangeDistrict = (e) => {
    getWardList(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (password.current.value !== repassword.current.value) {
      repassword.current.value = '';
      repassword.current.focus();
      return toast.error('mật khẩu không trùng khớp');
    }
    register(
      email.current.value,
      fullname.current.value,
      password.current.value,
      city.current.value,
      district.current.value,
      ward.current.value,
      street.current.value,
      phone.current.value,
    );
    return null;
  };

  useEffect(() => {
    getCityList();
  }, []);

  useEffect(() => {
    if (cityList.length > 0) getDistrictList(cityList[0].ID);
  }, [cityList]);

  useEffect(() => {
    if (districtList.length > 0) getWardList(districtList[0].ID);
  }, [districtList]);

  return (
    <>
      <div className="bg" />
      <div className="container p-4">
        <div className="user user-register user-center">
          <h2 className="page-header text-center">Đăng Ký</h2>
          <form onSubmit={handleSubmitForm}>
            <div className="row d-flex align-items-end">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="taikhoan" className="control-label">
                    Địa chỉ email:
                    <input
                      ref={email}
                      type="text"
                      id="taikhoan"
                      name="taikhoan"
                      className="form-control"
                      placeholder="Nhập địa chỉ email"
                    />
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="phone" className="control-label">
                    Số điện thoại
                    <input
                      ref={phone}
                      type="tel"
                      pattern="[0-9]{10,11}"
                      id="phone"
                      className="form-control"
                      placeholder="Nhập điện thoại"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="row d-flex align-items-end">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="fullname" className="control-label">
                    Họ và tên:
                    <input
                      ref={fullname}
                      type="text"
                      id="fullname"
                      className="form-control"
                      placeholder="Nhập họ và tên"
                    />
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="city">
                    Tỉnh/ Thành phố:
                    <select
                      ref={city}
                      onChange={onChangeCity}
                      className="form-control"
                      id="city"
                      name="city"
                    >
                      {renderListLocation(cityList)}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="row d-flex align-items-end">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="password" className="control-label">
                    Mậu khẩu:
                    <input
                      ref={password}
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Nhập mật khẩu"
                    />
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="city">
                    Quận/ Huyện:
                    <select
                      ref={district}
                      onChange={onChangeDistrict}
                      className="form-control"
                      id="district"
                      name="district"
                    >
                      {renderListLocation(districtList)}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="row d-flex align-items-end">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="re-password" className="control-label">
                    Xác nhận mật khẩu:
                    <input
                      ref={repassword}
                      type="password"
                      id="re-password"
                      className="form-control"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="city">
                    Xã/ Phường:
                    <select
                      ref={ward}
                      className="form-control"
                      id="ward"
                      name="ward"
                    >
                      {renderListLocation(wardList)}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="street" className="control-label">
                    Địa chỉ:
                    <input
                      ref={street}
                      type="text"
                      id="street"
                      className="form-control"
                      placeholder="Nhập địa chỉ"
                    />
                  </label>
                </div>
              </div>
            </div>

            <p className="help-block" style={{ fontSize: '12px' }}>
              Chọn đăng ký là bạn đã đồng ý với các{' '}
              <a href="#dieukhoan">Điều khoản dịch vụ của chúng tôi</a>
            </p>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Đăng Ký
              </button>
            </div>
          </form>
          <hr />
          <p className="help-block d-flex justify-content-between align-items-center">
            <span>Đã có tài khoản My Hotel?</span>
            <Link to="login" className="pull-right btn btn-success">
              Đăng Nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  location: state.location,
  isAuth: state.auth.auth,
});

const mapDispatchToProps = (dispatch) => ({
  locationActionCreators: bindActionCreators(locationActions, dispatch),
  authActionCreators: bindActionCreators(authActions, dispatch),
});

Register.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
