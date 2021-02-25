import Loading from 'components/Common/Loading';
import NotFound from 'components/Common/NotFound';
import { ConnectedRouter } from 'connected-react-router';
import { showRoutes } from 'helpers/routeHelper';
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import NotFound from 'components/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import {
  ADMIN_ROUTES,
  AUTH_ADMIN_ROUTES,
  AUTH_HOME_ROUTES,
  AUTH_MYHOTEL_ROUTES,
  HOME_ROUTES,
  MYHOTEL_ROUTES,
} from 'routes';
import * as uiActions from './actions/ui';
import './App.scss';
import { history } from './redux/configStore';

function App(props) {
  const { isLoading, isSuccess, message, setSweetAlert } = props;

  return (
    <>
      <ConnectedRouter history={history}>
        <Switch>
          {/* Home routes */}
          {showRoutes(AUTH_HOME_ROUTES, 3, true)}
          {showRoutes(HOME_ROUTES, 3, false)}

          {/* admin hotel routes */}
          {showRoutes(AUTH_ADMIN_ROUTES, 2, true)}
          {showRoutes(ADMIN_ROUTES, 2, false)}

          {/* admin website myhotel (Phan Viet Tan đẹp trai) routes */}
          {showRoutes(AUTH_MYHOTEL_ROUTES, 1, true)}
          {showRoutes(MYHOTEL_ROUTES, 1, false)}

          <Route path="/error" component={NotFound} />
          <Redirect to="/error" />
        </Switch>
      </ConnectedRouter>
      {isLoading && <Loading />}
      {isSuccess && (
        <SweetAlert
          success
          onConfirm={() => {
            setSweetAlert(false, '');
          }}
          title=""
        >
          {message}
        </SweetAlert>
      )}
      <span
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="click to scroll top"
        className="fas fa-chevron-up icon-to-top"
      />
      <ToastContainer position="bottom-left" />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.ui.isLoading,
    isSuccess: state.ui.sweetAlert.isSuccess,
    message: state.ui.sweetAlert.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSweetAlert: (isSuccess, message) => {
    dispatch(uiActions.setSweetAlert(isSuccess, message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
