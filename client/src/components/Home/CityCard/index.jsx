import React from 'react';
import { Link } from 'react-router-dom';

function CityCard(props) {
  const { title, img } = props;
  return (
    <Link to={`/search?keyword=${title}`} className="col-4 p-2 city-card">
      <div className="border p-3 bg-white shadow">
        <img src={img} alt={title} className="img-thumbnail" />
        <div className="city-card__title">{title}</div>
      </div>
    </Link>
  );
}

export default CityCard;
