import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header';

function App() {
  const { isLoaded, isSignedIn } = useUser();

  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading session...</p>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to={'/auth/sign-in'} />
  }

  // If signed in, render the child routes (Dashboard/Home)
  return (
    <>
      {/* You can add a Navbar component here to show on all pages */}
      <Header />
      <Outlet />
    </>
  )
}

export default App