import React, { Component } from 'react';
import classes from './MyPosts.module.css'
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const MyPosts = React.memo(props => { //Внутри метод подобный ShouldComponentUpdate

  console.log("render yo")
  let postsElements = [...props.posts].reverse().map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} id={p.id}></Post>)

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={onAddPost}></AddPostFormRedux>
      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
});

const maxLenght10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={"newPostText"} placeholder={"Enter your post"}
          validate={[required, maxLenght10]}></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default MyPosts;