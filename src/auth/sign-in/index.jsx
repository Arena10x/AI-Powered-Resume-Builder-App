import React from 'react'
import { SignedIn,SignIn } from '@clerk/clerk-react'

function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn />
    </div>
  )
}

export default SignInPage
