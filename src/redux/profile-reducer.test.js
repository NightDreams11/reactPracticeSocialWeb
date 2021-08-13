import reactDom from "react-dom";
import profileReducer, { addPostActionCreator } from "./profile-reducer";
import App from "../App"
import React from "react";

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     reactDom.render(<App></App>, div);
//     reactDom.unmountComponenttAtNode(div);
// })
it('length of posts shiuld be encremented', () => {
    // 1. Test data
    let action = addPostActionCreator('it-kamasutra.com')
    let state = {
        posts: [
            { id: 1, message: 'Hi, how are you?', likesCount: 15 },
            { id: 2, message: 'It`s my first post', likesCount: 20 }
        ]
    }
    // 2. Action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.posts.length).toBe(5);
})

