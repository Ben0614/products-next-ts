import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '50px',
      }}
    >
      <Link href="/prodList/page/1">
        <a>Go To Shop</a>
      </Link>
    </div>
  )
}

export default Home
