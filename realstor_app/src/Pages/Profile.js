import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable }from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'

export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const[ file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] =useState(0);
  const [fileUpError, setFileUpError] = useState(false)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const httpTarget = 'http://localhost:3000'
  console.log(formData)
  
  // // firebase storage ruels
  // allow read;
  // allow write:if
  // request.resource.size < 2*1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(() =>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/
        snapshot.totalBytes) * 100;
        // console.log('Upload is '+ progress+'% done')
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUpError(true);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>
          setFormData({ ...formData, avatar: downloadURL })
        ); 
      }
    );
  }
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res = await fetch(`${httpTarget}/API/user/update/${currentUser._id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(currentUser._id)
      console.log(res)
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        console.log(data.message)
        return;
      } 
      dispatch(updateUserSuccess(data))
    }catch(error){
      dispatch(updateUserFailure(error.message));
      console.log(error.message)
    }
  }
  const handleSignout = async () =>{
    try{
      const res = await fetch(`${httpTarget}/API/user/sign-out`);
      const data = await res.json();
      if(data.success === false){
        return
      }
    }catch (error){
      console.log(error)
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) =>setFile(e.target.files[0])} 
          type='file' 
          ref={fileRef} 
          hidden 
          accept='image/*'/>
        <img 
          onClick={() => fileRef.current.click()} 
          src={formData?.avatar || currentUser.avatar} 
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <p className='text-sm self-center'>
          {fileUpError ? ( 
            <span className='text-red-700'>Error Image Upload</span>
          )  : filePerc > 0 && filePerc<100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          )  : filePerc === 100 ?(
              <span className='text-green-700 mx-auto'>Image Successfully Uploaded</span>
          )  : (
              " "
          )}
        </p>
        <input 
          type='text' 
          placeholder='UserName' 
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg mt-3'
          onChange={handleChange}
          />
        <input 
          type='text' 
          placeholder='email' 
          defaultValue={currentUser.email}
          id='email'
          className='border p-3 rounded-lg mt-3'
          onChange={handleChange}
          />
        <input 
          type='password' 
          placeholder='password' 
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg mt-3'/>
        <button className='bg-slate-700 text-white rounded-lg p-3
        uppercase hover:opacity-95'>{loading ? 'Loading...': 'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error: ' ' }</p>
    </div>
  )
}
