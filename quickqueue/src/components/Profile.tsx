import React, { useContext } from 'react';
import { UserContext } from '../App';
import { useHistory, Redirect } from "react-router-dom";
import { ProfileNavBar } from './ProfileNavBar';
import { CustomerHistory } from './CustomerHistory';
import '../styles/Profile.css'

export const Profile: React.FunctionComponent<any> = () => {

  let currentUser = useContext(UserContext)
  console.log(currentUser)

  return currentUser ? (
    <>
      <ProfileNavBar />

      <div className='profileWrapper'>

        <div className='profileOwner'>

          <h1>{`${currentUser.firstName} ${currentUser.lastName}`}</h1>

          <div className='profileDetails'>
            <p>{`Email: ${currentUser.email}`}</p>
            <p>{`Account Type: ${currentUser.userRole}`}</p>
            <p>{`Account Number: ${currentUser.userId}`}</p>
          </div>
        </div>

        <div className='historyWrapper'>
          <div className='topBorder'></div>
          <CustomerHistory />
        </div>

      </div>


    </>

  ) : (

      <Redirect to="/login" />

    );

}