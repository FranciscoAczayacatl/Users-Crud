import axios from 'axios';
import { useEffect, useState } from 'react'
import UsersList from './components/UsersList';
import './App.css'
import UsersForm from './components/UsersForm';

function App() {

  const [usersList, setUsersList] = useState([]);
  const [userSelected, setUserSelected]=useState(null);
  const [addUser, setAddUser]=useState(false);
  const [delate, setdelate]=useState(false);
  const [addPopUp, setAddPopUp]=useState(false);
  const [updatePopUp, setUpdatePopUp]=useState(false);

  useEffect(()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res=>setUsersList(res.data))
  },[]);
 
  const getUser=()=>{
    axios.get('https://users-crud1.herokuapp.com/users/')
    .then(res=>setUsersList(res.data));
  }
 
  const buttonUserAdd=()=>{
    setAddUser(true)
  }
  const buttonClose=()=>{
    setAddUser(false)
  }
  const selectUser=(user)=>{
      setUserSelected(user)
      setAddUser(true)
  }
  const deselectUser=()=>{
    setUserSelected(null);
  }
  const delateUser=(user)=>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}`)
    .then(()=>{getUser(); setdelate(true);});
  }
  console.log(delate);
  return (
    <div className="App">
     {
      delate ?(
        <div className='delate-succes'>
        <div className='card-delate'>
          <div className='icon-delate'><i class="fa-regular fa-trash-can fa-2xl"></i></div>
          <h2>Deleted User</h2>
          <button onClick={()=>setdelate(false)}>OK</button>
        </div>
      </div>
      ):false
     }
     {
        addPopUp ?(
          <div className='delate-succes'>
          <div className='card-delate'>
            <div className='icon-delate add'><i class="fa-solid fa-check fa-2xl"></i></div>
            <h2>Add User</h2>
            <button onClick={()=>setAddPopUp(false)}>OK</button>
          </div>
        </div>
        ):false
     }
     {
      updatePopUp ?(
        <div className='delate-succes'>
        <div className='card-delate'>
          <div className='icon-delate update'><i class="fa-solid fa-upload fa-2xl"></i></div>
          <h2>Update User</h2>
          <button onClick={()=>setUpdatePopUp(false)}>OK</button>
        </div>
      </div>
      ):false
     }
      {
        addUser?( <UsersForm getUser={getUser} userSelected={userSelected} deselectUser={deselectUser} buttonClose={buttonClose} setAddPopUp={setAddPopUp} setUpdatePopUp={setUpdatePopUp}/>):false
      }
      <div className='title'>
        <h1>USERS </h1>
      </div>
      <div className='button-add'>
        <button onClick={buttonUserAdd}> <i class="fa-solid fa-user-plus"> </i></button>
      </div>    
        <UsersList usersList={usersList} selectUser={selectUser} delateUser={delateUser} />     
    </div>
  )
}

export default App
