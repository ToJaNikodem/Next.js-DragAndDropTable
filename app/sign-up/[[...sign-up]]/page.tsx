import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <>
      <SignUp
        path="/sign-up"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      />
    </>
  )
}
