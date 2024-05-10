import { SignUp } from '@clerk/nextjs'

export default function SignUpPage(): JSX.Element {
  return (
    <div className="mt-12 flex h-full w-full justify-center">
      <SignUp
        path="/sign-up"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      />
    </div>
  )
}
