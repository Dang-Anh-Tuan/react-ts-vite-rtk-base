export interface MenuLink {
  path: string
  title: string
}

export const NAV_LINK: MenuLink[] = [
  {
    path: '/',
    title: 'Home'
  },
  {
    path: '/hello',
    title: 'Hello'
  },
  {
    path: '/contact',
    title: 'Contact'
  }
]
