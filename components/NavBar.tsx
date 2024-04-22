import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center text-white text-xl w-full h-12 bg-slate-500">
      <div>
        <Link href="/" className="text-md p-4">
          Home
        </Link>
        <SignedIn>
          <Link href="/dashboard" className="text-md p-4">
            Dashboard
          </Link>
        </SignedIn>
      </div>
      <div className="max-w-fit p-4 flex flex-row gap-4">
        <SignedOut>
          <Link href="/sign-in" className='px-3 block h-8 w-max-fit bg-yellow-300 text-black rounded-md border-2 border-yellow-300'>SignIn</Link>
          <Link href="/sign-up" className='px-3 block h-8 w-max-fit bg-white text-black rounded-md border-2 border-yellow-300'>SignUp</Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default NavBar
