import React from 'react';

import './style.scss';
import HomeIcon from 'assets/icons/home.svg';
import EmailIcon from 'assets/icons/email.svg';
import PhoneIcon from 'assets/icons/phone.svg';

function HomeFooter() {
  return (
    <footer className="footer-content">
      <div className="text-center">
        <a href="#myPage" className="top" title="To Top">
          <span className="glyphicon glyphicon-chevron-up" />
        </a>
      </div>
      <div className="container d-flex">
        <div className="col-md-5">
          <section id="lienhe">
            <h3 style={{ borderBottom: '2px solid #daa520', width: '40%' }}>
              Liên Hệ
            </h3>
            <ul className="list-unstyled">
              <li>
                <p>
                  <img
                    className="lienhe__icon"
                    src={HomeIcon}
                    alt="home icon"
                  />
                  &nbsp; Địa chỉ văn phòng: 70/10 đường Tô Ký, quận 12, Thành
                  phố Hồ Chí Minh
                </p>
              </li>
              <li>
                <p>
                  <img
                    className="lienhe__icon"
                    src={EmailIcon}
                    alt="email icon"
                  />
                  &nbsp; Email: myhotelweb2020@gmail.com
                </p>
              </li>
              <li>
                <p>
                  <img
                    className="lienhe__icon"
                    src={PhoneIcon}
                    alt="phone icon"
                  />
                  &nbsp; Sđt: 0988899999
                </p>
              </li>
              <li>
                <p>Tài khoản ngân hàng số: 00123456789</p>
              </li>
            </ul>
          </section>
        </div>

        <div className="col-md-5 offset-md-2">
          <h3 style={{ borderBottom: '2px solid #daa520', width: '40%' }}>
            Điều Khoản
          </h3>
          <ul className="list-unstyled">
            <li>
              <a href="#myHotel">Chính sách và quy định chung</a>
            </li>
            <li>
              <a href="#myHotel">Quy định về thanh toán</a>
            </li>
            <li>
              <a href="#myHotel">Quy định về xác nhận thông tin đặt phòng</a>
            </li>
            <li>
              <a href="#myHotel">
                Chính sách về hủy đặt phòng và hoàn trả tiền
              </a>
            </li>
            <li>
              <a href="#myHotel">Chính sách bảo mật thông tin</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="text-center">©2020 MyHotel.vn All Rights Reserved.</p>
    </footer>
  );
}

HomeFooter.propTypes = {};

export default HomeFooter;
