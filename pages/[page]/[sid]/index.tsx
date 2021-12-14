import Image from 'next/image'
import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Product, Pic } from '../../../styles/page/[sid].style'

interface ProductCardProps {
  product: {
    data: { image: string; images2: string; Name: string; price: number }
    success: boolean
  }
  params: {
    page: string
    sid: string
  }
}

function ProductDetail({ product, params }: ProductCardProps) {
  console.log(product)
  console.log(params)
  if (!product) return ''
  return (
    <>
      <Product>
        <Pic>
          <img src={product.data.images2}></img>
        </Pic>
        <h3>{product.data.Name}</h3>
        <p>${product.data.price}</p>
      </Product>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const r = await fetch(`http://localhost:3001/product/${params!.sid}`)
  const product = await r.json()

  return {
    props: {
      product,
      params,
    },
    // 過了1小時之後伺服器會重新抓取資料而重新生成該頁，
    revalidate: 60 * 60,
  }
}

interface V {
  sid: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const r = await fetch(`http://localhost:3001/product`)
  const product = await r.json()
  const myPage = Math.ceil(product.totalPages / 12) + ''
  const paths = product.rows.map((v: V) => ({
    params: { sid: v.sid + '', page: myPage },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default ProductDetail
