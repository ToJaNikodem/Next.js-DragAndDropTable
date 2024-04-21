import { SignIn } from '@clerk/nextjs'

function SignInPage() {
  return (
    <>
      <SignIn
        path="/sign-in"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      />
    </>
  )
}

export default SignIn
