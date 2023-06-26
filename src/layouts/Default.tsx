import '@css/Default.css'
import { NAV_LINK, MenuLink } from '../constants/layout'
// import { useAuth } from "@hooks/auth"
import { NavLink, Outlet } from 'react-router-dom'
import { FC } from 'react'
import { useAuth } from '@hooks/auth'

const Default: FC = () => {
  const { token, currentUser, logout } = useAuth()
  const avatar = 'https://ss-imgaes.saostar.vn/w800/pc/1676739061999/saostar-inxbpwvck5wi6n4r.png'

  console.log('render');
  
  return (
    <>
      <nav className='nav-bar'>
        <div className='nav-container-menu'>
          {NAV_LINK &&
            NAV_LINK.map((item: MenuLink) => (
              <div key={item.path} className='container-nav-link'>
                <NavLink
                  to={item.path}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {item.title}
                </NavLink>
                <br />
              </div>
            ))}
        </div>
        <div className='nav-container-user'>
          <div
            className='avatar'
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          {token ? (
            <>
              <p>Hello, {currentUser?.name}</p>
              <button style={{ marginLeft: '10px' }} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to='/login'>
                <button>Login</button>
              </NavLink>
            </>
          )}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Default
