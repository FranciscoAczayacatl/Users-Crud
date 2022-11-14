import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const initialValues={
  first_name:'',
  last_name:'',
  email:'',
  password:'',
  birthday:''

}

const UsersForm = ({getUser,userSelected,deselectUser,buttonClose,setAddPopUp,setUpdatePopUp}) => {

  const { register, handleSubmit,reset } = useForm();
  useEffect(()=>{
    if (userSelected) {
      reset(userSelected);
    }else{
      reset(initialValues);
    }
  },[userSelected]);

  const submit = (data) => {
    if(userSelected){
      axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,data)
      .then(()=>{
        getUser();
        deselectUser();
        buttonClose();
        setUpdatePopUp(true);
      })
      .catch(error=>console.log(error.response?.data));
    }else{
      axios.post('https://users-crud1.herokuapp.com/users/',data)
      .then(()=>{
        getUser(); 
        deselectUser(); 
        buttonClose();
        setAddPopUp(true);
      })
      .catch(error=>console.log(error.response?.data));

    }
  }
 

  return (
    <div className='form' >
      <div className='form-content'>
        <div className='buttonclose'><button onClick={()=>{buttonClose(); deselectUser();}}>X</button></div>
      <div className='title-form'>
        <h1>New user</h1>
      </div>
      <form onSubmit={handleSubmit(submit)}>

        <div className='usernames'>
          <div className='name'>
            <label htmlFor="first_name"><i class="fa-regular fa-user"></i></label>
            <input {...register('first_name')} type="text" id='first_name' placeholder='FIRS NAME'/>
          </div>
          <div className='name'>
            <input {...register('last_name')} type="text" id='last_name' placeholder='LAST NAME' />
          </div> 
        </div>
        <div >
          <label htmlFor="email"><i class="fa-regular fa-envelope"></i></label>
          <input {...register('email')} type="email" id='email' placeholder='EMAIL' />
        </div>
        <div>
          <label htmlFor="password"><i class="fa-solid fa-lock"></i></label>
          <input {...register('password')} type="password" id="password" placeholder='PASSWORD' />
        </div>
        <div>
          <label htmlFor="birthday"><i class="fa-solid fa-cake-candles"></i></label>
          <input {...register('birthday')} type="date"  id="birthday" />
        </div>
        <button>Submit</button>
      </form>
      </div>
    </div>
  );
};

export default UsersForm;