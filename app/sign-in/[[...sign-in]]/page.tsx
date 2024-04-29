import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <>
      <SignIn
        path="/sign-in"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      />
    </>
  )
}
