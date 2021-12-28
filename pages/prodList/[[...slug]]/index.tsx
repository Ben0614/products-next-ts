import React, { useRef, useState, useEffect, useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  NumberButton,
  PrevNextButton,
  ButtonWrap,
  SearchWrap,
} from '../../../styles/page/prodListStyle'

interface Props {
  params: {
    slug: Array<string>
  }
  data: {
    page: string
    perPage: number
    totalPages: number
    totalRows: number
    rows: [
      {
        EXP: string
        Edible_Method: string
        Location: string
        MFD: string
        Name: string
        brand_company: string
        categories: string
        create_at: string
        image: string
        images2: string
        nutrient: string
        place_origin: string
        price: number
        quantity: string
        sid: number
        special_offer: string
      }
    ]
  }
}
interface Prod {
  EXP: string
  Edible_Method: string
  Location: string
  MFD: string
  Name: string
  brand_company: string
  categories: string
  create_at: string
  image: string
  images2: string
  nutrient: string
  place_origin: string
  price: number
  quantity: string
  sid: number
  special_offer: string
}
interface V {
  EXP: string
  Edible_Method: string
  Location: string
  MFD: string
  Name: string
  brand_company: string
  categories: string
  create_at: string
  image: string
  images2: string
  nutrient: string
  place_origin: string
  price: number
  quantity: string
  sid: number
  special_offer: string
}
const category = ['保健食品', '生活用品', '醫療器材']

function Prodlist({ params, data }: Props) {
  const [myBrowserRecode, setMyBrowserRecode] = useState([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  // console.log(params)
  console.log(data)

  const updateBrowserRecode = (prod: Prod) => {
    let myRecode = JSON.parse(localStorage.getItem('recode') || '[]')
    let index = myRecode.findIndex((v: V) => {
      return v.sid === prod.sid
    })

    if (index > -1) {
      myRecode = myRecode.filter((v: V) => {
        return v.sid !== prod.sid
      })
      myRecode.push(prod)
    } else {
      myRecode.push(prod)
    }

    if (myRecode.length > 4) {
      myRecode = myRecode.filter((v: V, i: number) => {
        return i !== 0
      })
      localStorage.setItem('recode', JSON.stringify(myRecode))
    } else {
      localStorage.setItem('recode', JSON.stringify(myRecode))
    }

    setMyBrowserRecode(myRecode)
  }

  const dispatch = useDispatch()
  dispatch({
    type: 'browser_recode',
    payload: {
      myBrowserRecode,
      setMyBrowserRecode,
      updateBrowserRecode,
    },
  })

  const getBrowseRecordFromLocalStorage = () => {
    const newBrowseRecord = localStorage.getItem('recode') || '[]'
    setMyBrowserRecode(JSON.parse(newBrowseRecord))
  }

  useEffect(() => {
    getBrowseRecordFromLocalStorage()
  }, [])

  const prevPage = (firstWord: string) => {
    switch (firstWord) {
      case 'page':
        router.push(`/prodList/page/${+params.slug[1] - 1}`)
        break
      case 'keyword':
        router.push(
          `/prodList/keyword/${params.slug[1]}/page/${+params.slug[3] - 1}`
        )
        break
      case 'category':
        router.push(
          `/prodList/category/${params.slug[1]}/page/${+params.slug[3] - 1}`
        )
        break
      default:
        break
    }
  }
  const nextage = (firstWord: string) => {
    switch (firstWord) {
      case 'page':
        router.push(`/prodList/page/${+params.slug[1] + 1}`)
        break
      case 'keyword':
        router.push(
          `/prodList/keyword/${params.slug[1]}/page/${+params.slug[3] + 1}`
        )
        break
      case 'category':
        router.push(
          `/prodList/category/${params.slug[1]}/page/${+params.slug[3] + 1}`
        )
        break
      default:
        break
    }
  }

  if (!data) return ''
  return (
    <>
      <div
        className="container"
        style={{
          width: '1140px',
          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 15px',
        }}
      >
        <SearchWrap>
          <input
            ref={inputRef}
            type="text"
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                if ((e.target as HTMLInputElement).value === '') {
                  router.push(`/prodList/page/1`)
                } else {
                  router.push(
                    `/prodList/keyword/${
                      (e.target as HTMLInputElement).value
                    }/page/1`
                  )
                }
              }
            }}
          />
          <button
            onClick={() => {
              if (inputRef.current!.value === '') {
                router.push(`/prodList/page/1`)
              } else {
                router.push(
                  `/prodList/keyword/${inputRef.current!.value}/page/1`
                )
              }
            }}
          >
            搜尋
          </button>
        </SearchWrap>
        <ButtonWrap>
          {/* 上一頁 */}
          <PrevNextButton
            onClick={() => {
              prevPage(params!.slug![0])
            }}
            disabled={
              params!.slug![0] === 'page'
                ? +params.slug[1] <= 1
                  ? true
                  : false
                : +params.slug[3] <= 1
                ? true
                : false
            }
          >
            上一頁
          </PrevNextButton>
          {/* 數字上一頁 */}
          {params!.slug![0] === 'page' ? (
            +params.slug[1] <= 1 ? null : (
              <NumberButton
                onClick={() => {
                  router.push(`/prodList/page/${+params.slug[1] - 1}`)
                }}
              >
                {+params.slug[1] - 1}
              </NumberButton>
            )
          ) : params!.slug![0] === 'keyword' ? (
            +params.slug[3] <= 1 ? null : (
              <NumberButton
                onClick={() => {
                  router.push(
                    `/prodList/keyword/${params.slug[1]}/page/${
                      +params.slug[3] - 1
                    }`
                  )
                }}
              >
                {+params.slug[3] - 1}
              </NumberButton>
            )
          ) : params!.slug![0] === 'category' ? (
            +params.slug[3] <= 1 ? null : (
              <NumberButton
                onClick={() => {
                  router.push(
                    `/prodList/category/${params.slug[1]}/page/${
                      +params.slug[3] - 1
                    }`
                  )
                }}
              >
                {+params.slug[3] - 1}
              </NumberButton>
            )
          ) : (
            ''
          )}
          {/* 現在頁數 */}
          <NumberButton active>
            {params!.slug![0] === 'page' ? +params.slug[1] : +params.slug[3]}
          </NumberButton>
          {/* 數字下一頁 */}
          {params!.slug![0] === 'page' ? (
            +params.slug[1] >= data.totalPages ? null : (
              <NumberButton
                onClick={() => {
                  router.push(`/prodList/page/${+params.slug[1] + 1}`)
                }}
              >
                {+params.slug[1] + 1}
              </NumberButton>
            )
          ) : params!.slug![0] === 'keyword' ? (
            +params.slug[3] >= data.totalPages ? null : (
              <NumberButton
                onClick={() => {
                  router.push(
                    `/prodList/keyword/${params.slug[1]}/page/${
                      +params.slug[3] + 1
                    }`
                  )
                }}
              >
                {+params.slug[3] + 1}
              </NumberButton>
            )
          ) : params!.slug![0] === 'category' ? (
            +params.slug[3] >= data.totalPages ? null : (
              <NumberButton
                onClick={() => {
                  router.push(
                    `/prodList/category/${params.slug[1]}/page/${
                      +params.slug[3] + 1
                    }`
                  )
                }}
              >
                {+params.slug[3] + 1}
              </NumberButton>
            )
          ) : (
            ''
          )}
          {/* 下一頁 */}
          <PrevNextButton
            onClick={() => {
              nextage(params!.slug![0])
            }}
            disabled={
              params!.slug![0] === 'page'
                ? +params.slug[1] >= data.totalPages
                  ? true
                  : false
                : +params.slug[3] >= data.totalPages
                ? true
                : false
            }
          >
            下一頁
          </PrevNextButton>
        </ButtonWrap>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className="main"
        >
          <div
            style={{
              width: 'calc(10% - 5px)',
            }}
          >
            <ul style={{ padding: '10px' }}>
              <p
                style={{
                  fontSize: '18px',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                }}
              >
                商品類別
              </p>
              <li style={{ fontSize: '18px', marginBottom: '10px' }}>
                <Link href={`/prodList/page/1`}>全部商品</Link>
              </li>
              {category.map((v, i) => {
                return (
                  <li
                    style={{ fontSize: '18px', marginBottom: '10px' }}
                    key={i}
                  >
                    <Link href={`/prodList/category/${v}/page/1`}>{v}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
          <div
            className="list"
            style={{
              width: 'calc(75% - 5px)',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {data.rows.map((prod) => {
              return (
                <div
                  style={{
                    width: 'calc(25% - 10px)',
                    padding: '10px',
                    margin: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                  }}
                  key={prod.sid}
                >
                  <div style={{ width: '50%', margin: '0 auto' }}>
                    <img src={prod.image} alt="" />
                  </div>
                  <Link href={`/prodDetail/${prod.sid}`}>
                    <a>
                      <h3
                        style={{
                          textAlign: 'center',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        onClick={() => {
                          updateBrowserRecode(prod)
                        }}
                      >
                        {prod.Name}
                      </h3>
                    </a>
                  </Link>
                  <p
                    style={{
                      color: prod.special_offer ? 'red' : 'black',
                      textAlign: 'center',
                    }}
                  >
                    ${prod.special_offer ? prod.special_offer : prod.price}
                  </p>
                </div>
              )
            })}
          </div>
          <div
            style={{
              width: 'calc(15% - 5px)',
            }}
          >
            <p
              style={{
                margin: '0 0 5px',
                fontSize: '24px',
                textAlign: 'center',
              }}
            >
              <strong>瀏覽紀錄</strong>
            </p>
            {myBrowserRecode
              ? myBrowserRecode
                  .slice(0)
                  .reverse()
                  .map((prod: Prod, i) => {
                    return (
                      <div key={prod.sid}>
                        <Link href={`/prodDetail/${prod.sid}`}>
                          <a>
                            <h4
                              style={{
                                textAlign: 'center',
                              }}
                              onClick={() => {
                                updateBrowserRecode(prod)
                              }}
                            >
                              {i + 1}. {prod.Name}
                            </h4>
                          </a>
                        </Link>
                      </div>
                    )
                  })
              : ''}
          </div>
        </div>
      </div>
    </>
  )
}

/*export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let r: Response | undefined
  switch (params!.slug![0]) {
    case 'page':
      r = await fetch(`http://localhost:3001/product?page=${params!.slug![1]}`)
      break
    case 'keyword':
      r = await fetch(
        `http://localhost:3001/product?keyword=${encodeURI(
          params!.slug![1]
        )}&page=${params!.slug![3]}`
      )
      break
    case 'category':
      r = await fetch(
        `http://localhost:3001/product?category=${encodeURI(
          params!.slug![1]
        )}&page=${params!.slug![3]}`
      )
      break
    default:
      break
  }

  let j = await r!.json()

  return {
    props: {
      data: j,
      params,
    },
  }
}*/

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let r: AxiosRequestConfig
  ;(axios.defaults.method = 'GET'),
    (axios.defaults.baseURL = 'http://localhost:3001')
  switch (params!.slug![0]) {
    case 'page':
      r = await axios({
        url: '/product',
        params: { page: params!.slug![1] },
      })
      break
    case 'keyword':
      r = await axios({
        url: '/product',
        params: { keyword: params!.slug![1], page: params!.slug![3] },
      })
      break
    case 'category':
      r = await axios({
        url: '/product',
        params: { category: params!.slug![1], page: params!.slug![3] },
      })
      break
    default:
      break
  }

  return {
    props: {
      data: r!.data,
      params,
    },
  }
}

export default Prodlist
