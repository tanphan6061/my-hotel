/**
 * Type: Component
 * Name: Form hotel
 * Author: Phan Viet Tan
 * Role:  form hotel component
 * Version: 1.0.0
 */

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as locationActions from 'actions/location';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import './style.scss';

/**
 * render list locations: citis, districts, wards
 * @param list
 */
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

/**
 * form hotel component
 * @param {*} props
 */
function FormHotel(props) {
  const {
    saveButton,
    location,
    locationActionCreators,
    action, // action: edit hotel hoặc add hotel
    children,
    isSuccess,
    hotelEditing,
  } = props;
  const { cityList, districtList, wardList } = location;
  const { getCityList, getDistrictList, getWardList } = locationActionCreators;

  /**
   * dữ liệu của form
   *  */
  const [name, setName] = useState('');
  const [star, setStar] = useState('1');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [status, setStatus] = useState('available'); //'closed', 'temporarily', 'available', 'out of room'
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('Tiền Giang');
  const [district, setDistrict] = useState('Huyện Cái Bè');
  const [ward, setWard] = useState('Xã Hậu Mỹ Bắc A');
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * load danh sách city
   */
  useEffect(() => {
    getCityList();
  }, []);

  /**
   * load danh dách quận huyện (lần đầu tiên khi mở trang)
   */
  useEffect(() => {
    if (cityList.length > 0) getDistrictList(cityList[0].ID);
  }, [cityList]);

  /**
   * load danh sách ward khi district thay đổi
   */
  useEffect(() => {
    if (districtList.length > 0) getWardList(districtList[0].ID);
  }, [districtList]);

  /**
   * load dữ liệu khi tồn tại hotelEditing ( Nếu đang sửa thông hotel )
   */
  useEffect(() => {
    if (hotelEditing?.name) {
      setName(hotelEditing.name);
      setStar(hotelEditing.star);
      setCity(hotelEditing.city);
      setDistrict(hotelEditing.district);
      setWard(hotelEditing.ward);
      setStreet(hotelEditing.street);
      setDescription(hotelEditing.description);
      setStatus(hotelEditing.status);
      setPhone(`0${hotelEditing.phone}`);
    }
  }, [hotelEditing]);

  /**
   * reset dữ liệu khi thực hiện thành công (trong trường hợp là modal thêm hotel ở trang chủ thì cần reset)
   */
  useEffect(() => {
    if (isSuccess) {
      setName('');
      setStar('1');
      setCity('Tiền Giang');
      setDistrict('Huyện Cái Bè');
      setWard('Xã Hậu Mỹ Bắc A');
      setStreet('');
      setDescription('');
      setStatus('available');
      setPhone('');
      setSelectedFile(null);
    }
  }, [isSuccess]);

  /**
   * submit form
   */
  const onHandleSubmitForm = () => {
    //validate data
    if (!name) return toast.error('Tên khách sạn không được trống');
    if (!phone) return toast.error('Số điện thoại không được trống');
    if (/\+?(84|09|03|01[2|6|8|9])+([0-9]{8,9})\b/.test(phone) === false)
      return toast.error('Số điện thoại không hợp lệ');
    if (!district) return toast.error('Địa chỉ không được trống');
    if (!description) return toast.error('Mô tả khách sạn không được trống');
    if (!hotelEditing?._id && !selectedFile)
      return toast.error('Vui lòng chọn ảnh avatar cho khách sạn');
    if (hotelEditing?._id) {
      // lấy data và thực hiện action
      return action({
        id: hotelEditing._id,
        description,
        name,
        star,
        status,
        street,
        phone,
        city,
        district,
        ward,
      });
    }
    const formData = new FormData();
    // if (id) formData.append('id', id);
    if (selectedFile)
      formData.append('avatar', selectedFile, selectedFile.name);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('star', star);
    formData.append('status', status);
    formData.append('city', city);
    formData.append('district', district);
    formData.append('ward', ward);
    formData.append('street', street);
    formData.append('phone', phone);
    return action(formData);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
    getDistrictList(e.target[e.target.selectedIndex].dataset.id);
  };

  const onChangeDistrict = (e) => {
    setDistrict(e.target.value);
    getWardList(e.target[e.target.selectedIndex].dataset.id);
  };

  return (
    <div>
      <form>
        <div className="box">
          <div className="box-header">THÔNG TIN CƠ BẢN</div>
          <div className="box-content">
            <div className="row">
              <div className="col-md-7">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="name" className="d-block control-label">
                      Tên Khách Sạn:
                      <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control"
                        placeholder="Nhập tên khách sạn"
                      />
                    </label>
                  </div>
                </div>
                <div className="row m-0">
                  <div className="col-md-5">
                    <div className="box-content-line">
                      <div className="form-group">
                        <label htmlFor="city" className="d-block control-label">
                          Tỉnh/ Thành phố:
                          <select
                            value={city}
                            onChange={onChangeCity}
                            className="form-control"
                            id="city"
                          >
                            {renderListLocation(cityList)}
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="box-content-line">
                      <div className="form-group">
                        <label htmlFor="ward" className="d-block control-label">
                          Xã/ Phường:
                          <select
                            className="form-control"
                            id="ward"
                            onChange={(e) => setWard(e.target.value)}
                            value={ward}
                          >
                            {renderListLocation(wardList)}
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="box-content-line">
                      <div className="form-group">
                        <label htmlFor="district" className="d-block">
                          Quận/ Huyện:
                          <select
                            value={district}
                            onChange={onChangeDistrict}
                            className="form-control"
                            id="district"
                          >
                            {renderListLocation(districtList)}
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="box-content-line">
                      <div className="form-group">
                        <label
                          htmlFor="street"
                          className="d-block control-label"
                        >
                          Địa chỉ:
                          <input
                            onChange={(e) => setStreet(e.target.value)}
                            value={street}
                            id="street"
                            className="form-control"
                            placeholder="Nhập địa chỉ"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5" style={{ paddingLeft: '0px' }}>
                <div className="row m-0">
                  <div className="col-md-5" style={{ paddingLeft: '0px' }}>
                    <div className="box-content-line">
                      <div className="form-group">
                        <label htmlFor="star" className="control-label d-block">
                          Hạng sao:
                          <select
                            onChange={(e) => setStar(e.target.value)}
                            value={star}
                            id="star"
                            className="form-control"
                          >
                            <option value="1">1 Sao</option>
                            <option value="2">2 Sao</option>
                            <option value="3">3 Sao</option>
                            <option value="4">4 Sao</option>
                            <option value="5">5 Sao</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="box-content-line">
                      <div className="form-group">
                        <label
                          htmlFor="status"
                          className="control-label d-block"
                        >
                          Trạng thái hoạt động:
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            id="status"
                            className="form-control"
                          >
                            <option value="available">Có sẵn</option>
                            <option value="out of room">Hết phòng</option>
                            <option value="temporarily">Tạm đóng cửa</option>
                            <option value="closed">Đóng cửa</option>
                          </select>
                        </label>
                      </div>
                    </div>
                    <div className="box-content-line">
                      <div className="form-group">
                        <label
                          htmlFor="phone"
                          className="d-block control-label"
                        >
                          Số điện thoại:
                          <input
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            id="phone"
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7" style={{ padding: '0 ' }}>
                    <div className="box-content-line">
                      <p className="text-center">
                        Ảnh đại diện cho khách sạn:{' '}
                      </p>
                      <img
                        id="avt"
                        src={
                          hotelEditing?.avatar
                            ? hotelEditing.avatar
                            : 'https://via.placeholder.com/1000x600'
                        }
                        className="img-thumbnail"
                        alt="Avatar-ks"
                      />
                      <input
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        type="file"
                        name="avt"
                        className="form-control-file border"
                        accept=".gif,.jpg,.jpeg,.png,.webp"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-header">MÔ TẢ KHÁCH SẠN</div>
          <div className="box-content">
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                setDescription(editor.getData());
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            ref={saveButton}
            onClick={onHandleSubmitForm}
            className="btn btn-primary"
            style={{ width: '150px' }}
            type="button"
          >
            {children}
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  location: state.location,
  isSuccess: state.ui.sweetAlert.isSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  locationActionCreators: bindActionCreators(locationActions, dispatch),
});

FormHotel.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(FormHotel);
