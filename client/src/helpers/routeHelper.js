import AuthMiddlewareRoutes from 'components/Common/AuthMiddlewareRoutes';
import React from 'react';
import { Route } from 'react-router-dom';

export const showRoutes = (arrayRoutes, rolePage = 3, isAuthPage = false) => {
  if (arrayRoutes.length > 0) {
    return arrayRoutes.map((route, index) => {
      return (
        <AuthMiddlewareRoutes
          key={index}
          path={route.path}
          exact={'exact' in route ? route.exact : true}
          component={route.component}
          isAuthPage={isAuthPage}
          rolePage={rolePage}
          isAuthRequirePage={route.isAuthRequirePage}
        />
      );
    });
  }
  return null;
};

export const showSubRoutes = (arrayRoutes) => {
  if (arrayRoutes.length > 0) {
    return arrayRoutes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={'exact' in route ? route.exact : true}
          component={route.component}
        />
      );
    });
  }
  return null;
};
