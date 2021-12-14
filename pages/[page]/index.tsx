import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { Container } from '../../components/Container'
import {
  Buttons,
  NumberButton,
  PreNextButton,
  Search,
  SearchButton,
  ProductList,
  Product,
  Pic,
} from '../../styles/page/[page].style'

interface Props {
  data: {
    rows: [
      {
        sid: number
        price: number
        special_offer: string
        quantity: string
        EXP: string
        Edible_Method: string
        Location: string
        MFD: string
        Name: string
        brand_company: string
        categories: string
        image: string
        images2: string
        nutrient: string
        place_origin: string
      }
    ]
    totalPages: number
  }
  params: {
    page: string
  }
  keyWord: string
  setKeyWord: (val: string) => void
}

function ProductsList({ data, params, keyWord, setKeyWord }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  // params的page
  console.log(params.page)
  const router = useRouter()
  // router.query的page
  const { page } = router.query
  console.log(data)

  // params和router.query的page值都一樣

  return (
    <>
      <Buttons>
        <PreNextButton
          disabled={+params.page - 1 < 1 ? true : false}
          onClick={() => {
            router.push(`/${+params.page - 1}`)
          }}
        >
          上一頁
        </PreNextButton>
        {+params.page <= 1 ? (
          ''
        ) : (
          <NumberButton
            onClick={() => {
              router.push(`/${+params.page - 1}`)
            }}
          >
            {+params.page - 1}
          </NumberButton>
        )}
        <NumberButton active>{+params.page}</NumberButton>
        {+params.page >= data.totalPages ? (
          ''
        ) : (
          <NumberButton
            onClick={() => {
              router.push(`/${+params.page + 1}`)
            }}
          >
            {+params.page + 1}
          </NumberButton>
        )}
        <PreNextButton
          disabled={+params.page + 1 > data.totalPages ? true : false}
          onClick={() => {
            router.push(`/${+params.page + 1}`)
          }}
        >
          下一頁
        </PreNextButton>
      </Buttons>
      <Search>
        <input
          type="text"
          ref={inputRef}
          /*
              要預防 inputRef.current 報錯
              1.在current後加上!
              2. if(inputRef.current){} 包起來
            */
          onKeyUp={(e) => {
            if (inputRef.current) {
              if (e.keyCode === 13) {
                inputRef.current.value === ''
                  ? router.push(`/1`)
                  : router.push(`/search/${inputRef.current.value}/page/1`)
                setKeyWord(inputRef.current.value)
              }
            }
          }}
        />
        <SearchButton
          /*
              要預防 inputRef.current 報錯
              1.在current後加上!
              2. if(inputRef.current){} 包起來
            */
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value === ''
                ? router.push(`/1`)
                : router.push(`/search/${inputRef.current.value}/page/1`)
              setKeyWord(inputRef.current.value)
            }
          }}
        >
          搜尋
        </SearchButton>
      </Search>
      <Container>
        <ProductList>
          {data.rows
            ? data.rows.map((product) => {
                return (
                  <Product key={product.sid}>
                    <Pic>
                      <img src={product.image} />
                    </Pic>
                    <Link href={`/${+params.page}/${product.sid}`}>
                      <a>{product.Name}</a>
                    </Link>
                    <p>${product.price}</p>
                  </Product>
                )
              })
            : ''}
        </ProductList>
      </Container>
    </>
  )
}

// SSR
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const r = await fetch(`http://localhost:3001/product?page=${params!.page}`)
  const j = await r.json()

  return {
    props: {
      data: j,
      params,
    },
  }
}

export default ProductsList
