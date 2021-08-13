import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {

  if (!profile) {
    return <Preloader></Preloader>
  }

  return (
    <div>
      <div>
        {/* <img src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'></img> */}
      </div>
      <div className={classes.descriptionBlock} src='https://blog.matcharesident.com/wp-content/uploads/2019/07/iStock-944453634-750x450.jpg'>
        <img src={profile.photos.large}></img>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}></ProfileStatusWithHooks>
      </div>
    </div >
  )
}
export default ProfileInfo;