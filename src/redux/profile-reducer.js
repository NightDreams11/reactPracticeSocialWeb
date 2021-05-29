const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'It`s my first post', likesCount: 20 }
    ],
    newPostText: 'it-kamasutra.com'
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {

            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, { id: 5, message: state.newPostText, likesCount: 0 }]
            }

            // let newPost = {
            //     id: 5,
            //     message: state.newPostText,
            //     likesCount: 0
            // };

            // let stateCopy = { ...state };
            // stateCopy.posts = [...state.posts];
            // stateCopy.posts.push(newPost);
            // stateCopy.newPostText = '';
            // return stateCopy;
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
            // let stateCopy = { ...state };

            // stateCopy.newPostText = action.newText;
            // return stateCopy;
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: 'ADD-POST' })

export const updateNewPostTextActionCreator = (text) =>
    ({ type: 'UPDATE-NEW-POST-TEXT', newText: text })

export default profileReducer;