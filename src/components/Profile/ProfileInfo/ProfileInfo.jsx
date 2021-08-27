import React, { useEffect, useState } from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/photo.jpg';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader></Preloader>
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false);
      });
  };

  return (
    <div>
      <div>
        {/* <img src='https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'></img> */}
      </div>
      <div className={classes.descriptionBlock} src='https://blog.matcharesident.com/wp-content/uploads/2019/07/iStock-944453634-750x450.jpg'>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}></img>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected}></input>}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}></ProfileDataForm> // initialValues={profile} передаём, чтобы значения полей сохранялись при режиме редактирования
          : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner}></ProfileData>}

        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}></ProfileStatusWithHooks>
      </div>
    </div >
  )
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div>
      <b>Full name</b>: {profile.fullName}
    </div>
    <div>
      <b>Looking for a job</b>: {profile.lookingForAJob ? "Yes" : "no"}
    </div>

    {profile.lookingForAJob &&
      <div>
        <b>My professional skills</b>: {profile.lookingForAJobDescription}
      </div>
    }

    <div>
      <b>About me</b>: {profile.aboutMe}
    </div>
    {/* Object.keys() пробегается по ключам объекта и создаёт массив строк  */}
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}></Contact>
      })}
    </div>
  </div>
}

const Contact = ({ contactTitle, contactValue }) => {
  return <div className={classes.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;