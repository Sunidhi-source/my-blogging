import React from 'react'
import Profile from './Profile'
import Password from './Password'

function Account() {
  return (
    <>
      <div className="row justify-content-between p-5">
        <div className="col-md-7">
            <h4>New User</h4>
            <hr />
          
          <Profile/>
        </div>
        <div className="col-md-4">
          <h4>Change Password</h4>
            <hr />
          
          <Password/>
        </div>
      </div>
    </>
  )
}

export default Account