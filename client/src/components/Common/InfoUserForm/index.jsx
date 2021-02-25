import { changePassword, updateProfile } from 'actions/auth';
import { getCityList, getDistrictList, getWardList } from 'actions/location';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './style.scss';

function InfoUserForm({ userInfo }) {
  const [fullname, setFullname] = useState(userInfo.fullname);
  const [email, setEmail] = useState(userInfo.email);
  const [phone, setPhone] = useState(userInfo.phone);
  const [city, setCity] = useState(userInfo.city);
  const [district, setDistrict] = useState(userInfo.district);
  const [ward, setWard] = useState(userInfo.ward);
  const [street, setStreet] = useState(userInfo.street);

  const [isActive, setIsActive] = useState(false);
  const focus = useRef(null);
  const [check, setCheck] = useState(true);

  const [btnEdit, setBtnEdit] = useState('Sửa thông tin');
  const [btnChangePassword, setBtnChangePassword] = useState('Đổi mật khẩu');
  const [btnColor1, setBtnColor1] = useState('btn-primary');
  const [btnColor2, setBtnColor2] = useState('btn-primary');

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const districtList = useSelector((state) => state.location.districtList);
  const cityList = useSelector((state) => state.location.cityList);
  const wardList = useSelector((state) => state.location.wardList);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');

  const handleOnPressEditInfo = () => {
    setIsActive(!isActive);
    if (btnEdit === 'Lưu lại') {
      onHandleSubmitForm();
      if (check) {
        setIsActive(!isActive);
        setBtnEdit('Sửa thông tin');
        setBtnChangePassword('Đổi mật khẩu');
        setBtnColor1('btn-primary');
        setBtnColor2('btn-primary');
        setCheck(true);
      } else {
        setIsActive(true);
      }
    } else {
      setBtnEdit('Lưu lại');
      setBtnChangePassword('Hủy');
      setBtnColor1('btn-success');
      setBtnColor2('btn-danger');
    }
  };

  const handleOnPressChangePassword = () => {
    if (btnEdit === 'Lưu lại') {
      resetData();
      setIsActive(!isActive);
      setBtnEdit('Sửa thông tin');
      setBtnChangePassword('Đổi mật khẩu');
      setBtnColor1('btn-primary');
      setBtnColor2('btn-primary');
    } else toggle();
  };

  const renderListLocation = (list) => {
    let html = null;
    if (list) {
      html = list.map((i, key) => {
        return (
          <option data-id={i.ID} value={i.title} key={key}>
            {i.Title}
          </option>
        );
      });
    }
    return html;
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
    dispatch(getDistrictList(e.target[e.target.selectedIndex].dataset.id));
  };

  const onChangeDistrict = (e) => {
    setDistrict(e.target.value);
    dispatch(getWardList(e.target[e.target.selectedIndex].dataset.id));
  };
  useEffect(() => {
    dispatch(getCityList());
  }, []);

  useEffect(() => {
    let city_ = cityList.findIndex((i) => i.Title === city);
    if (city_ < 0) city_ = 0;
    if (cityList.length > 0) dispatch(getDistrictList(cityList[city_].ID));
  }, [cityList]);

  useEffect(() => {
    if (districtList.length > 0) dispatch(getWardList(districtList[0].ID));
  }, [districtList]);

  useEffect(() => {
    focus.current.focus();
  }, [isActive]);

  const resetData = () => {
    setFullname(userInfo.fullname);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
    setCity(userInfo.city);
    setDistrict(userInfo.district);
    setWard(userInfo.ward);
    setStreet(userInfo.street);
  };

  const onHandleSubmitForm = () => {
    //validate data
    if (!fullname) return toast.error('Họ và tên không được trống');
    if (!phone) return toast.error('Số điện thoại không được trống');
    if (/\+?(84|09|03|01[2|6|8|9])+([0-9]{8,9})\b/.test(phone) === false)
      return toast.error('Số điện thoại không hợp lệ');
    if (!street) return toast.error('Địa chỉ không được trống');
    setCheck(false);
    return dispatch(
      updateProfile({
        fullname,
        city,
        district,
        ward,
        street,
        phone,
      }),
    );
  };

  const resetInputChangePassword = () => {
    setPassword('');
    setNewPassword('');
    setReNewPassword('');
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6)
      return toast.error('Mật khẩu phải lớn hơn 5 kí tự');
    if (newPassword !== reNewPassword)
      return toast.error('Mật khẩu không trùng khớp');
    resetInputChangePassword();
    dispatch(changePassword({ password, newPassword }));
    return toggle();
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="w-75">
        <h1 className="title-border-b pb-4">Thông tin tài khoản</h1>
        <div>
          <strong>Họ và Tên:</strong>
          <br />
          <input
            className="form-control mt-2 mb-3"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            disabled={!isActive}
            ref={focus}
          />
        </div>
        <div>
          <strong>Email:</strong>
          <br />
          <input
            className="form-control mt-2 mb-3"
            type="text"
            value={email}
            disabled
          />
        </div>
        <div>
          <strong>Số điện thoại:</strong>
          <br />
          <input
            className="form-control mt-2 mb-3"
            type="text"
            value={phone}
            disabled={!isActive}
          />
        </div>
        <div>
          <strong className="mt-2 mb-3">Tỉnh/ Thành phố:</strong>
          <br />
          <select
            value={city}
            onChange={onChangeCity}
            className="form-control"
            id="district"
            name="district"
            disabled={!isActive}
          >
            {renderListLocation(cityList)}
          </select>
        </div>
        <div>
          <br />
          <strong className="mt-2 mb-3">Quận/ Huyện:</strong>
          <select
            value={district}
            onChange={onChangeDistrict}
            className="form-control"
            id="district"
            name="district"
            disabled={!isActive}
          >
            {renderListLocation(districtList)}
          </select>
        </div>
        <div>
          <br />
          <strong className="mt-2 mb-3">Xã/ Phường:</strong>
          <select
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="form-control"
            id="district"
            name="district"
            disabled={!isActive}
          >
            {renderListLocation(wardList)}
          </select>
        </div>
        <div>
          <br />
          <strong>Địa chỉ:</strong>
          <input
            className="form-control mt-2 mb-3"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={!isActive}
          />
        </div>

        <div>
          <button
            className={`btn ${btnColor1} mr-3`}
            type="submit"
            onClick={handleOnPressEditInfo}
          >
            {btnEdit}
          </button>
          <button
            className={`btn ${btnColor2} `}
            type="submit"
            onClick={handleOnPressChangePassword}
          >
            {btnChangePassword}
          </button>
        </div>
      </form>
      {/* --> Modal */}
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
        // className={className}
      >
        <ModalHeader toggle={toggle}>Đổi mật khẩu</ModalHeader>
        <ModalBody>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control my-4"
              placeholder="Mật khẩu cũ"
            />
            <input
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control my-4"
              placeholder="Mật khẩu mới"
            />
            <input
              value={reNewPassword}
              type="password"
              onChange={(e) => setReNewPassword(e.target.value)}
              className="form-control my-4"
              placeholder="Nhập lại mật khẩu"
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleChangePassword}>
            Xác nhận
          </Button>{' '}
          <Button
            color="danger"
            onClick={() => {
              resetInputChangePassword();
              toggle();
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default InfoUserForm;
