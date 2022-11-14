import React from 'react';


const UsersList = ({usersList, selectUser,delateUser}) => {

  return (
    <div className='user-list'>
      {
        usersList.map((user)=>(
          <ul key={user.id}>
            <div className='card-users'>
             <h1>{user.first_name} {user.last_name}</h1>
             <p><b>Email: </b> <br />{user.email}</p>
             <p><b>Password: </b><br /> {user.password}</p>
             <p><b>Birthday: </b> <br /> {user.birthday}</p>
              <div className='buttons-card'>
                <button onClick={()=>selectUser(user)}><i class="fa-solid fa-user-pen"></i></button>
                <button onClick={()=>delateUser(user)}><i class="fa-solid fa-user-minus"></i></button>
              </div>
             
            </div >
            
          </ul>
        ))
      }
    </div>
  );
};

export default UsersList;