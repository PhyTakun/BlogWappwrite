import React from 'react'
import LogoutBtn from './LogoutBtn'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../Logo'

function Header() {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 bg-slate-300 border-b border-slate-200 sticky top-0 z-50'>
      <Container>
        <nav className='flex items-center'>
          <div className='mr-4'>
            <Link to={'/'}>
              <Logo width='70px' />
            </Link>
          </div>

          <ul className='flex items-center ml-auto gap-1'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className='px-4 py-2 rounded-md text-sm font-medium text-slate-600
                      transition-colors duration-150
                      hover:bg-slate-100 hover:text-slate-900'
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header