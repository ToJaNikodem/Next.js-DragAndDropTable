import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='flex w-full h-full justify-center mt-12'>
      <SignIn
        path="/sign-in"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      />
    </div>
  )
}
