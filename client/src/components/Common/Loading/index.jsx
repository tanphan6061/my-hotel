import React from 'react';

import GifLoading from 'assets/images/loading.gif';
import './style.scss';

function Loading() {
  return (
    <div className="loading-page">
      <div className="container-image">
        <img src={GifLoading} alt="loading" />
      </div>
    </div>
  );
}

export default Loading;
