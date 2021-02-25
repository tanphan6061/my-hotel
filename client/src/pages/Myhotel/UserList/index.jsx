import * as userActions from 'actions/user';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style.scss';

const showRole = (role) => {
  if (role === 1) return 'Admin MyHotel';
  if (role === 2) return 'Admin Hotel';
  return 'User';
};

function AdminIndex(props) {
  const { userActionsCreators, userList } = props;
  const { fetchUserList, setRoleUser } = userActionsCreators;
  const [userSelected, setUserSelected] = useState(null);
  const [role, setRole] = useState('3'); // role thap nhat

  const handleSetNewRole = () => {
    if (userSelected.role) {
      setRoleUser({ role, userId: userSelected._id });
      setUserSelected(null);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <div className="admin-header">
        <div className="row">
          <div className="col-md-9 admin-header-left">
            <h3>Danh sách tài khoản </h3>
            <p className="help-block">Tổng cộng: {userList.length} tài khoản</p>
          </div>
        </div>
      </div>

      <div className="admin-content">
        <div className="box" style={{ minHeight: '200px' }}>
          <div className="box-content w-100" style={{ padding: '50px 50px' }}>
            {userList.length < 1 ? (
              <p className="text-muted font-weight-bold">
                Hiện tại hệ thống chưa có tài khoản nào
              </p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên người dùng</th>
                    <th>Địa chỉ email</th>
                    <th>Số điện thoại</th>
                    <th>Quyền</th>
                    <th>Tuỳ chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>0{user.phone}</td>
                      <td>{showRole(user.role)}</td>
                      <td>
                        <button
                          onClick={() => {
                            setUserSelected(user);
                          }}
                          type="button"
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#setRole"
                        >
                          Đổi quyền
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* modal them */}
        {userSelected && (
          <div className="modal" id="setRole">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    Vui lòng chọn quyền mới cho user {userSelected.fullname}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setUserSelected(null)}
                    className="close"
                    data-dismiss="modal"
                  >
                    &times;
                  </button>
                </div>

                <div className="modal-body d-flex justify-content-center">
                  <div className="form-group">
                    <label htmlFor="sel1">
                      Chọn quyền:
                      <select
                        className="form-control"
                        id="sel1"
                        name="role"
                        defaultValue={userSelected.role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="3">User</option>
                        <option value="2">Admin Hotel</option>
                        <option value="1">Admin MyHotel</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    data-dismiss="modal"
                    className="btn btn-default"
                    onClick={() => setUserSelected(null)}
                  >
                    Huỷ
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    onClick={handleSetNewRole}
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  userList: state.user.userList,
});

const mapDispatchToProps = (dispatch) => ({
  userActionsCreators: bindActionCreators(userActions, dispatch),
});

AdminIndex.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminIndex);
