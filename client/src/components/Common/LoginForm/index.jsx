import * as authActions from 'actions/auth';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import './style.scss';

function LoginForm(props) {
  const { authActionCreators, rolePage } = props;
  const { login } = authActionCreators;
  const location = useLocation();
  let previousURL = '/';

  if (location.state) {
    previousURL = location.state.from;
  } else {
    if (rolePage === '2') previousURL = '/admin/hotel';
    if (rolePage === '!') previousURL = '/myhotel/user';
  }

  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitForm = () => {
    if (!email.current.value) return toast.error('Email không được để trống');
    if (/\S+@\S+\.\S+/.test(email.current.value) === false)
      return toast.error('Định dạng email không đúng');
    if (!password.current.value)
      return toast.error('Mật khẩu không được để trống');
    return login(
      email.current.value,
      password.current.value,
      rolePage,
      previousURL,
    );
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px 20px' }}>
      <div className="form-group">
        <label htmlFor="taikhoan">
          Email
          <input
            ref={email}
            type="text"
            name="taikhoan"
            id="taikhoan"
            className="form-control"
            placeholder="Nhập địa chỉ email"
          />
        </label>
      </div>
      <div className="form-group">
        <label className="control-label" htmlFor="matkhau">
          Mật Khẩu
          <input
            ref={password}
            type="password"
            name="matkhau"
            id="matkhau"
            className="form-control"
            placeholder="Nhập mật khẩu"
          />
        </label>
      </div>
      <div className="form-group mt-3">
        <button
          onClick={handleSubmitForm}
          type="submit"
          className="btn btn-primary btn-block"
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    authActionCreators: bindActionCreators(authActions, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
