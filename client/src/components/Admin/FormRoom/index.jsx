/**
 * Type: Component
 * Name: Form Room
 * Author: Phan Viet Tan
 * Role:  form Room component
 * Version: 1.0.0
 */

import { toast } from 'react-toastify';
import { VIEWS } from 'helpers/viewHelper';
import React, { useEffect, useState } from 'react';
import './style.scss';

function FormHotel(props) {
  const {
    hotelEditing,
    equipmentList,
    action,
    saveButton,
    roomEditing,
    children,
  } = props;

  const [selectedFile, setSelectedFile] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [area, setArea] = useState(5);
  const [people, setPeople] = useState(1);
  const [views, setViews] = useState('0');
  const [equipments, setEquipments] = useState([]);
  const [price, setPrice] = useState(1000);

  useEffect(() => {
    if (roomEditing?._id) {
      setName(roomEditing.name);
      setQuantity(roomEditing.quantity);
      setArea(roomEditing.area);
      setPeople(roomEditing.people);
      setViews(roomEditing.views);
      setEquipments(roomEditing.equipments);
      setPrice(roomEditing.price);
    }
  }, [roomEditing]);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (!equipments.includes(value))
      return setEquipments([...equipments, value]);

    const index = equipments.findIndex((i) => i === value);

    return setEquipments([
      ...equipments.slice(0, index),
      ...equipments.slice(index + 1),
    ]);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!name) return toast.error('Tên phòng không được trống');
    if (!price) return toast.error('Giá phòng không được trống');
    if (!quantity) return toast.error('Số lượng phòng không được trống');
    if (!area) return toast.error('Diện tích phòng không được trống');
    if (price % 1000 !== 0)
      return toast.error('Giá phòng phải là bội của 1000');
    if (equipments.length < 1)
      return toast.error('Vui lòng chọn ít nhất một tiện nghi');
    if (area < 5)
      return toast.error('Diện tích cho phòng khách sạn tối thiểu 5m2');
    if (!roomEditing?._id && selectedFile.length < 1)
      return toast.error('Vui lòng chọn ít nhất 1 ảnh cho phòng');
    const formData = new FormData();
    for (let i = 0; i < selectedFile.length; i += 1) {
      formData.append('media', selectedFile[i], selectedFile[i].name);
    }

    if (roomEditing?._id) {
      return action({
        id: roomEditing._id,
        hotel: hotelEditing._id,
        name,
        quantity,
        area,
        people,
        equipments,
        views,
        price,
      });
    }
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('area', area);
    formData.append('people', people);
    equipments.forEach((i) => {
      formData.append('equipments', i);
    });
    formData.append('views', views);
    formData.append('price', price);
    formData.append('hotel', hotelEditing._id);

    return action(formData);
  };

  return (
    <div>
      <form>
        <div className="box">
          <div className="box-header">THÔNG TIN CƠ BẢN</div>
          <div className="box-content">
            <div>
              <p style={{ fontSize: '1.1rem' }}>Thêm ảnh phòng</p>
              <div>
                <div className="d-flex align-items-center">
                  <label
                    type="button"
                    htmlFor="media"
                    className="btn m-0 btn-info w-50 border"
                  >
                    Chọn ảnh
                    <input
                      id="media"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        setSelectedFile(e.target.files);
                      }}
                      name="media"
                      className="form-control-file border"
                      accept=".gif,.jpg,.jpeg,.png,.webp"
                      multiple
                    />
                  </label>
                  <p
                    className="text-danger pl-3 m-0"
                    style={{ fontSize: '0.9rem' }}
                  >
                    * Gợi Ý:
                    <br />
                    - Ảnh nên đạt kích thước 1000x600, có độ phân giải cao để
                    đạt hiệu quả nhất.
                    <br />- Giữ Ctrl để có thể select nhiều ảnh 1 lúc
                  </p>
                </div>
                {selectedFile.length === 1 && (
                  <span>Bạn đã chọn {selectedFile[0].name}</span>
                )}
                {selectedFile.length > 1 && (
                  <span>
                    Bạn đã chọn {selectedFile[0].name} và{' '}
                    {selectedFile.length - 1} ảnh khác{' '}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-5">
              <p style={{ fontSize: '1.1rem' }}>Thông tin phòng</p>
              <table className="table table-bordered room-table">
                <tbody>
                  <tr className="form-group">
                    <th>Tên loại phòng</th>
                    <td>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Nhập tên loại phòng"
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="form-group">
                    <th>Số lượng</th>
                    <td>
                      <input
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        type="number"
                        min="1"
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="form-group">
                    <th>Diện Tích (m2)</th>
                    <td>
                      <input
                        type="number"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        min="1"
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="form-group">
                    <th>Giá</th>
                    <td>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="1000"
                        step="1000"
                        className="form-control"
                      />
                    </td>
                  </tr>
                  <tr className="form-group">
                    <th>Số người tối đa</th>
                    <td>
                      <input
                        type="number"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        min="1"
                        className="form-control"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="my-5">
              <p style={{ fontSize: '1.1rem' }}>Hướng Phòng</p>
              <div>
                {VIEWS.map((view, index) => {
                  return (
                    <label
                      key={index}
                      style={{
                        minWidth: '17%',
                        margin: '0 3% 0 0',
                        cursor: 'pointer',
                      }}
                      htmlFor={index}
                      className="radio-inline"
                    >
                      <input
                        id={index}
                        type="radio"
                        value={view.value}
                        name="views"
                        checked={view.value === `${views}`}
                        onChange={(e) => setViews(e.target.value)}
                      />
                      &nbsp;{view.name}
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '1.1rem' }}>Tiện nghi phòng</p>
              <div className="d-flex flex-wrap">
                {equipmentList.map((equipment, index) => (
                  <div style={{ width: '33.33%' }} key={index}>
                    <input
                      id={equipment._id}
                      className="form-control"
                      value={equipment._id}
                      type="checkbox"
                      style={{ display: 'none' }}
                      checked={equipments.includes(equipment._id)}
                      onChange={handleCheckboxChange}
                    />
                    <label
                      className="btn btn-default btn-lg equiment-icon"
                      htmlFor={equipment._id}
                    >
                      <span className={equipment.icon} /> {equipment.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                onClick={handleSubmitForm}
                type="submit"
                className="btn btn-primary"
                ref={saveButton}
              >
                {children}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

FormHotel.propTypes = {};

export default FormHotel;
