import CheckIcon from 'assets/icons/check.svg';
import Logo from 'assets/images/logo.png';
import LoginForm from 'components/Common/LoginForm';
import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Login() {
  return (
    <div className="login-admin">
      <div className="bg" />
      <div className="container pt-1 pb-4">
        <Link to="/">
          <img
            src={Logo}
            className="img-responsive"
            style={{ width: '200px' }}
            alt="logo"
          />
        </Link>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="user user-bg">
              <h3>Đăng nhập tài khoản</h3>
              <LoginForm rolePage="2" />
            </div>
            <div className="mt-3 text-muted p-2">
              <p>
                Bạn đã có tài khoản người dùng nhưng chưa được nâng cấp lên làm
                quản trị viên khách sạn? Vui lòng liên hệ đến quản trị viên
                MyHotel để được nâng cấp.
                <br />
                <span>
                  <strong>Email: </strong>
                  <a href="mailto:myhotelweb2020@gmail.com">
                    myhotelweb2020@gmail.com
                  </a>
                </span>
                <br />
                <span>
                  <strong>SĐT: </strong>
                  <a href="tel:+84988899999">0988899999</a>
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-5">
            <h3 className="text-primary">
              Vì sao nên làm đối tác với My Hotel?
            </h3>
            <p>
              <img src={CheckIcon} alt="check icon" className="icon" />
              &nbsp; Mạng lưới khách hàng lớn và rộng khắp cả nước, cung cấp
              lượng đặt phòng ổn định cho khách sạn
            </p>
            <p>
              <img src={CheckIcon} alt="check icon" className="icon" />
              &nbsp; Thông tin của khách sạn được quảng cáo rộng rãi đến khách
              hàng qua các kênh truyền thông của My Hotel
            </p>
            <p>
              <img src={CheckIcon} alt="check icon" className="icon" />
              &nbsp; Hệ thống quản lý phòng và giá trực tuyến cho khách sạn
              thuận tiện và dễ dàng sử dụng. Khách sạn luôn có thể điều chỉnh để
              bán với mức giá cạnh tranh
            </p>
            <p>
              <img src={CheckIcon} alt="check icon" className="icon" />
              &nbsp; Hệ thống thống kê thông tin hữu ích theo từng giai đoạn
              giúp khách sạn đánh giá và lên kế hoạch kinh doanh
            </p>
            <p>
              <img src={CheckIcon} alt="check icon" className="icon" />
              &nbsp; Bộ phận chăm sóc khách hàng chuyên nghiệp luôn hỗ trợ tối
              đa cho khách sạn và khách hàng lưu trú lại khách sạn
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
