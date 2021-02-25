import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import classnames from 'classnames';
import Order from 'components/Admin/Order';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionHotel } from 'actions/transaction';
import moment from 'moment';

const convertStatus = (id) => {
  switch (id) {
    case 1:
      return 'Đã nhận phòng';
    default:
      return 'Chờ nhận phòng';
  }
};

const formatDate = (date) => {
  return moment(date).format('DD/MM/YYYY');
};

function Booking() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [order, setOrder] = useState([]);
  const [keyword, setKeyword] = useState([]);

  const transactionList = useSelector(
    (state) => state.transaction.transactionList,
  );
  const hotelEditing = useSelector((state) => state.hotels.hotelEditing);
  const isSuccess = useSelector((state) => state.ui.sweetAlert.isSuccess);

  useEffect(() => {
    if (isSuccess === true) {
      setModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (hotelEditing._id) {
      dispatch(getTransactionHotel(hotelEditing._id));
    }
  }, [hotelEditing]);

  const handleOnPress = (type) => {
    if (type === 0) {
      setIsActive(0);
    } else if (type === 1) {
      setIsActive(1);
    } else {
      setIsActive(2);
    }
  };

  const handleOnPressDetail = (title_, content_) => {
    setModal(!modal);
    setTitle(title_);
    setContent(content_);
  };

  useEffect(() => {
    if (keyword !== '') {
      setOrder(
        transactionList
          .filter(
            (i) =>
              i.status === isActive &&
              (i.phone.indexOf(keyword) > -1 ||
                i.fullname.toLowerCase().indexOf(keyword.toLowerCase()) > -1),
          )
          .reverse(),
      );
    } else
      setOrder(transactionList.filter((i) => i.status === isActive).reverse());
  }, [isActive, transactionList, keyword]);

  useEffect(() => {
    setOrder(transactionList.filter((i) => i.status === isActive).reverse());
  }, [transactionList]);

  return (
    <div>
      <div className="admin-header">
        <h2>Đơn Đặt Phòng</h2>
        <span>
          Số đơn {isActive === 0 ? 'chưa xác nhận' : 'đã xác nhận'}:{' '}
          {order.length}
        </span>
      </div>
      <div className="admin-content">
        <div>
          <button
            type="button"
            className={`btn border mr-3 ${isActive === 0 ? 'btn-primary' : ''}`}
            onClick={() => handleOnPress(0)}
          >
            Đơn Chưa Xác Nhận
          </button>
          <button
            type="button"
            className={`btn border mr-3 ${isActive === 1 ? 'btn-primary' : ''}`}
            onClick={() => handleOnPress(1)}
          >
            Đơn Đã Xác Nhận
          </button>
        </div>
        <div className="d-flex align-items-center mt-4">
          <input
            type="text"
            className="form-control w-50  mr-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập số điện thoại hoặc tên khách hàng"
          />
          <i className="fa fa-search" style={{ cursor: 'pointer' }} />
        </div>
        {order.length > 0 && (
          <div className="box-content">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ và Tên</th>
                  <th>SĐT</th>
                  <th>Giá</th>
                  <th>Ngày đặt</th>
                  <th>Ngày trả</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => {
                  const dataOrder = {
                    fullname: item.fullname,
                    room: item.room,
                    amount: item.amount,
                    startDate: formatDate(item.checkin_date),
                    endDate: formatDate(item.checkout_date),
                    status: item.status,
                    totalPrice: `${item.totalPrice} ₫`,
                    phone: item.phone,
                    hotel: hotelEditing,
                    id: item._id,
                  };
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.fullname} <br />
                        {isActive === 1 && (
                          <span
                            className="badge   badge-warning "
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleOnPressDetail(
                                'Chi tiết đơn',
                                <Order data={dataOrder} />,
                              )
                            }
                          >
                            Click vào xem chi tiết đơn
                          </span>
                        )}
                        {isActive === 0 && (
                          <span
                            className="badge   badge-warning "
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              handleOnPressDetail(
                                'Xác nhận đơn',
                                <Order data={dataOrder} />,
                              )
                            }
                          >
                            Click vào để xác nhận đơn
                          </span>
                        )}
                      </td>
                      <td>{item.phone}</td>
                      <td>
                        {item.totalPrice.toLocaleString('it-IT', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                      <td>{formatDate(item.checkin_date)}</td>
                      <td>{formatDate(item.checkout_date)}</td>
                      <td>
                        <p
                          className={classnames('badge', {
                            'badge-success p-2': isActive === 1,
                            'badge-danger p-2': isActive === 0,
                          })}
                        >
                          {convertStatus(item.status)}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {order.length === 0 && (
          <div className="text-danger mt-5">Hiện không có đơn nào</div>
        )}
      </div>

      {/* --> Modal */}
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        style={{ minWidth: '80%' }}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Hủy</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Booking;
