import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import HomeLayout from 'pages/Home/Layout';
import AdminLayout from 'pages/Admin/Layout';
import MyhotelLayout from 'pages/Myhotel/Layout';

function AuthMiddlewareRoutes({
  component: Component,
  isAuth,
  isAuthPage,
  isAuthRequirePage,
  roleAuth, // 1: admin website myhotel, 2: admin chu khach san, 3: nguoi dung
  rolePage,
  ...rest
}) {
  let isRedirect = false;
  let urlRedirect = '/';

  /**
   *  Nếu là các trang auth: đăng nhập, đăng ký,...
   * và đã đăng nhập tài khoản đúng quyền thì
   * redirect sang trang chủ sau khi đã đăng nhập tương ứng
   */

  if (isAuthPage && isAuth && roleAuth <= rolePage) {
    isRedirect = true;
    if (rolePage === 2) urlRedirect = '/admin/hotel';
    if (rolePage === 1) urlRedirect = '/myhotel';
  }

  /**
   *  Nếu là các trang yêu cầu đăng nhập để thực tiếp
   * nhưng chưa đăng nhập hoặc đã đăng nhập nhưng k đúng quyền thì
   * redirect sang trang đăng nhập tương ứng
   */
  if (isAuthRequirePage && (!isAuth || roleAuth > rolePage)) {
    isRedirect = true;
    if (rolePage === 1) urlRedirect = '/myhotel/login';
    else if (rolePage === 2) urlRedirect = '/admin/login';
    else urlRedirect = '/login';
  }

  // set lay out for page
  let Layout = ({ children }) => <>{children}</>; // mặc đỊnh layout không có gì cả, chỉ chứa component chính

  if (rolePage === 1 && !isAuthPage) {
    // vì trang login myhotel admin k có layout
    Layout = MyhotelLayout;
  }
  if (rolePage === 2 && !isAuthPage) {
    // vì trang login admin k có layout
    Layout = AdminLayout;
  }
  if (rolePage === 3) {
    Layout = HomeLayout;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isRedirect ? (
          <Redirect
            to={{
              pathname: urlRedirect,
              state: { from: props.location },
            }}
          />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.auth,
    roleAuth: state.auth.userInfo.role,
  };
};

export default connect(mapStateToProps, null)(AuthMiddlewareRoutes);
