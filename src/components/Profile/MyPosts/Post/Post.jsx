import classes from "./Post.module.css"

const Post = (props) => {
  return (
    <div className={classes.item}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhwq9oYKTiJoXzdntOkDqlD6pMCVGf48LTIw&usqp=CAU"
        alt="postPhoto"
      />
      {props.message}
      <div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  )
}
export default Post
