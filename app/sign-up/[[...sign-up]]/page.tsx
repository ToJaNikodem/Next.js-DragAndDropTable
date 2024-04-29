import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className='flex w-full h-full justify-center mt-12'>
      <SignUp
        path="/sign-up"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      />
    </div>
  )
}
