import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Page from './[page]/index'
import ShopPage from './[page]'
import { GetServerSideProps } from 'next'

function HomePage({}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Link href="/1">
        <a style={{ fontSize: '40px' }}>Go To Shop</a>
      </Link>
    </div>
  )
}

export default HomePage
