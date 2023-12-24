import React, { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  const [changeDetails, setChangeDetails] = useState(false)

  function onLogOut() {
    auth.signOut()
    navigate("/sign-in")
  }

  function onChange(e) {
    setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }))
  }

  async function onSubmit() {
    try {
      // update display name in firebase auth
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser,{
          displayName: name
        })
        // update the name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        })
      }
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Could't Update the profile details")
    }
  }

  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            <input type="text" id='name' value={name} disabled={!changeDetails} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200" }`} />
            <input type="email" id='email' value={email} disabled={!changeDetails} onChange={onChange} className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out' />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>Do you want to change your name?<span onClick={() =>{changeDetails && onSubmit(); setChangeDetails((prevState) => !prevState)} } className='text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer'>{changeDetails ? "Apply Change" : "Edit"}</span></p>
              <p onClick={onLogOut} className='text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer'>Sign Out</p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}