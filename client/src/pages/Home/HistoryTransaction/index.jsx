import { getTransactionUser } from 'actions/transaction';
import Order from 'components/Admin/Order';
import LeftSideBar from 'components/Common/LeftSidebar';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './style.scss';

function HistoryTransaction() {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const transactionList = useSelector(
    (state) => state.transaction.transactionList,
  );

  const handleOnPressDetail = (title_, content_) => {
    setModal(!modal);
    setTitle(title_);
    setContent(content_);
  };
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  useEffect(() => {
    dispatch(getTransactionUser());
  }, []);
  return (
    <div className="container home d-flex mt-5">
      <LeftSideBar />
      <div className="w-75">
        <h1 className="mb-4 border-bottom pb-4">Lịch sử đặt phòng</h1>
        <div>
          <h2>Thông tin chi tiết</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và Tên</th>
                <th>Khách sạn</th>
                <th>Ngày đặt</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {transactionList.reverse().map((item, index) => {
                const dataOrder = {
                  fullname: item.fullname,
                  room: item.room._id,
                  amount: item.amount,
                  startDate: formatDate(item.checkin_date),
                  endDate: formatDate(item.checkout_date),
                  status: item.status,
                  totalPrice: `${item.totalPrice} ₫`,
                  phone: item.phone,
                  hotel: item.room.hotel,
                  transactionCode: item.code,
                };
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {item.fullname}
                      <br />
                      <p
                        className="badge badge-warning "
                        onClick={() => {
                          handleOnPressDetail(
                            'Xem chi tiết hóa đơn',
                            <Order data={dataOrder} />,
                          );
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        Xem chi tiết hóa đơn
                      </p>
                    </td>
                    <td>{item.room.hotel?.name || ''}</td>
                    <td>{formatDate(item.checkin_date)}</td>
                    <td>{formatDate(item.checkout_date)}</td>
                    <td>
                      {item.status === 2 && (
                        <p className="badge badge-success p-2">Đã trả phòng</p>
                      )}
                      {item.status === 1 && (
                        <p className="badge badge-success p-2">Đã nhận phòng</p>
                      )}
                      {item.status === 0 && (
                        <p className="badge badge-warning p-2">
                          Chờ nhận phòng
                        </p>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 200 }}
        toggle={toggle}
        style={{ minWidth: '70%' }}
      >
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Đóng</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default HistoryTransaction;
