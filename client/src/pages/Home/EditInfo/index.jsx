import React from 'react';
import InfoUserForm from 'components/Common/InfoUserForm';
import './style.scss';
import LeftSideBar from 'components/Common/LeftSidebar';
import { useSelector } from 'react-redux';

function EditInfo() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return (
    <div className="container home d-flex mt-5">
      <LeftSideBar />
      <InfoUserForm userInfo={userInfo} />
    </div>
  );
}

export default EditInfo;
