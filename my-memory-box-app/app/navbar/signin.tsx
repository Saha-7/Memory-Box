import React from 'react'
import { signInWithGoogle, signOut } from '../firebase/firebase'

const SignIn = () => {
  return (
    <>
    <button onClick={signOut} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
      Sign Out
    </button>
    <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ml-2">
      Sign In
    </button>
    </>
  )
}

export default SignIn