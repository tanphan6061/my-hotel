import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const Banner = (props) => {
  const { className, items } = props;
  return <UncontrolledCarousel className={className} items={items} />;
};

export default Banner;
