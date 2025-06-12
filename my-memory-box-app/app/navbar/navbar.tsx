import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return(
        <nav className="flex items-center justify-between bg-gradient-to-b from-blue-500 to-blue-700 px-4 py-2 ">
            <Link href="/" className="flex items-center cursor-pointer">
            <Image 
                src="/logo_mb.png" 
                alt="logo" 
                width={60}  
                height={60} 
                className="w-20 h-20 rounded-full" 
            />
            </Link>
        </nav>
    )
}