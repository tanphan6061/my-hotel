import HomeFooter from 'components/Home/Footer';
import HomeHeader from 'components/Home/Header';
import React from 'react';
import './style.scss';

function HomeLayout(props) {
  const { children } = props;
  return (
    <div>
      <HomeHeader />
      <main>
        {/* content page */}
        {children}
        {/* content page */}
      </main>
      <HomeFooter />
    </div>
  );
}

HomeLayout.propTypes = {};

export default HomeLayout;
