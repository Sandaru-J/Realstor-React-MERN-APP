import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const httpTarget = 'http://localhost:3000'
    const dispatch = useDispatch();
    const naviagte = useNavigate();
    const handleGoogleClick = async () =>{
        console.log('clicked')
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            console.log("1")
            const result = await signInWithPopup(auth, provider)
            console.log(result)
            const res = await fetch(`${httpTarget}/API/auth/google`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            naviagte('/')
        }catch (error){
            console.log("failed")
            console.log(error)
        }
    }
  return (
    <button  onClick = {handleGoogleClick} type='button'
    className='bg-red-700 text-white p-3 rounded-lg
    uppercase hover:opacity-95'>Continue with Google</button>
  )
}
