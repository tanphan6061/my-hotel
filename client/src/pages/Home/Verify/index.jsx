import * as authActions from 'actions/auth';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import './style.scss';

function Verify(props) {
  const { authActionCreators } = props;
  const { resendCode, verify } = authActionCreators;
  const code = useRef(null);

  return (
    <>
      <div className="bg" />
      <div className="container p-4">
        <div className="user user-center">
          <h2 className="page-header text-center">Kích hoạt tài khoản</h2>
          <div className="form-group">
            <label htmlFor="taikhoan" className="control-label">
              <input
                ref={code}
                type="text"
                id="taikhoan"
                name="taikhoan"
                className="form-control"
                placeholder="Nhập mã xác nhận"
              />
            </label>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={() => verify(code.current.value)}
              className="btn btn-primary btn-block"
            >
              Kích hoạt
            </button>
          </div>
          <p className="text-danger" style={{ fontSize: '12px' }}>
            Mã xác nhận đã được gửi về địa chỉ email của bạn. Vui lòng kiểm tra
            mail để tiến hàng kích hoạt tài khoản.
          </p>
          <p
            className="text-primary user-select-none text-center"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              resendCode();
              toast.success('Đã gửi mã, vui lòng check lại mail của bạn');
            }}
          >
            Gửi lại mã xác nhận
          </p>
          <hr />
          <p className="help-block d-flex justify-content-between align-items-center">
            <span>Đã có tài khoản My Hotel?</span>
            <Link to="/login" className="pull-right btn btn-success">
              Đăng Nhập
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

Verify.propTypes = {};

const mapDispatchToProps = (dispatch) => ({
  authActionCreators: bindActionCreators(authActions, dispatch),
});

Verify.propTypes = {};

export default connect(null, mapDispatchToProps)(Verify);
