import { SignIn } from '@clerk/nextjs'

export default function SignInPage(): JSX.Element {
  return (
    <div className="mt-12 flex h-full w-full justify-center">
      <SignIn
        path="/sign-in"
        fallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      />
    </div>
  )
}
