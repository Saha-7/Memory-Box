'use client'

import Image from "next/image"
import Link from "next/link"
import SignIn from "./signin"
import { useEffect, useState } from "react"
import { onAuthStateChangedHelper } from "../firebase/firebase"
import { User } from "firebase/auth"
import Upload from "./upload"

export default function Navbar() {
    // Initialized user state
    const [user, setUser] = useState<User | null>(null)

    useEffect(()=>{
        const unsubscribe = onAuthStateChangedHelper((user)=>{
            setUser(user)
        })
        // cleanup subscription on unmount
        return () => unsubscribe()
    }, [])

    return(
        <nav className="flex items-center justify-between bg-gradient-to-l from-gray-800 to-gray-300 px-4 py-2 shadow-lg shadow-black ">
            <Link href="/" className="flex items-center cursor-pointer">
            <Image 
                src="/logo_mb.png" 
                alt="logo" 
                width={60}  
                height={60} 
                className="w-16 h-16 rounded-full" 
            />
            </Link>
            { user && <Upload/>}
            <SignIn user={user}/>
        </nav>
    )
}