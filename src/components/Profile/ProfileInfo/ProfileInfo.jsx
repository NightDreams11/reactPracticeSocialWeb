import React from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/photo.jpg';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {

  if (!profile) {
    return <Preloader></Preloader>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>
      <div>
        {/* <img src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'></img> */}
      </div>
      <div className={classes.descriptionBlock} src='https://blog.matcharesident.com/wp-content/uploads/2019/07/iStock-944453634-750x450.jpg'>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}></img>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected}></input>}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}></ProfileStatusWithHooks>
      </div>
    </div >
  )
}
export default ProfileInfo;