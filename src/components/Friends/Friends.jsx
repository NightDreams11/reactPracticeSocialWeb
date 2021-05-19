import React from 'react'
import FriendsItem from './FriendsItem/FriendsItem';

const Friends = (props) => {
    let friendsElement = props.state.sitebar.map(f => <FriendsItem name={f.name}></FriendsItem>)
    return (
        <div>
            {friendsElement}
        </div>
    )
}

export default Friends;