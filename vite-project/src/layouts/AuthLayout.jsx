import Header from '../components/Header' 
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default AuthLayout