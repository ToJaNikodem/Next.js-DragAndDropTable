import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

function NavBar(): JSX.Element {
  return (
    <div className="flex h-12 w-full flex-row items-center justify-between bg-slate-500 text-xl">
      <div className="text-white">
        <Link href="/" className="text-md p-4">
          Home
        </Link>
        <SignedIn>
          <Link href="/dashboard" className="text-md p-4">
            Dashboard
          </Link>
        </SignedIn>
      </div>
      <div className="flex max-w-fit flex-row gap-4 p-4">
        <SignedOut>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: 'outline' })}
          >
            SignIn
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: 'default' })}
          >
            SignUp
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}

export default NavBar
