import React from 'react'
import Paginator from '../common/Paginator/Paginator';
import User from './User';


const Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} ></Paginator>
        {
            users.map(u => <User
                user={u}
                followingInProgress={props.followingInProgress}
                key={u.id}
                unfollow={props.unfollow}
                follow={props.follow}
            ></User>)
        }
    </div>
}

export default Users;