import React, { useRef, useState, useEffect, useCallback } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  Main,
  LeftAside,
  Category,
  List,
  Item,
  Pic,
  Name,
  Price,
  BrowserRecode,
  BrowserRecodeTitle,
  NumberButton,
  PrevNextButton,
  ButtonWrap,
  SearchWrap,
} from '../../../styles/page/prodListStyle'
import { Container } from '../../../components/Container'

// props類型
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
// prod類型
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
// 瀏覽紀錄的商品v類型
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
// redux state類型
interface BrowserRecodeState {
  browserRecode: {
    myBrowserRecode: [
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
    updateBrowserRecode: Function
  }
}

const category = ['保健食品', '生活用品', '醫療器材']

function Prodlist({ params, data }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  // console.log(params)
  // console.log(data)

  // 添加商品瀏覽紀錄函式
  const updateBrowserRecode = (prod: Prod) => {
    let myRecode = JSON.parse(localStorage.getItem('recode') || '[]')
    // 查詢此商品是否有在瀏覽紀錄裡
    let index = myRecode.findIndex((v: V) => {
      return v.sid === prod.sid
    })

    // > -1 代表有 先移除再重新添加 否則就直接添加
    if (index > -1) {
      myRecode = myRecode.filter((v: V) => {
        return v.sid !== prod.sid
      })
      myRecode.push(prod)
    } else {
      myRecode.push(prod)
    }

    // 瀏覽紀錄最多4筆 超過就刪除最舊的
    if (myRecode.length > 4) {
      myRecode = myRecode.filter((v: V, i: number) => {
        return i !== 0
      })
      localStorage.setItem('recode', JSON.stringify(myRecode))
    } else {
      localStorage.setItem('recode', JSON.stringify(myRecode))
    }

    // 將狀態存到redux
    getBrowseRecordFromLocalStorage()
  }

  // 寄送狀態
  const dispatch = useDispatch()
  // 接收狀態
  const browserRecodeState = useSelector((state: BrowserRecodeState) => {
    return state
  })

  // console.log(browserRecodeState.browserRecode.myBrowserRecode)

  // 獲取localstorage瀏覽紀錄並寄到redux
  const getBrowseRecordFromLocalStorage = () => {
    const newBrowseRecord = localStorage.getItem('recode') || '[]'

    dispatch({
      type: 'browser_recode',
      payload: {
        myBrowserRecode: JSON.parse(newBrowseRecord),
        updateBrowserRecode,
      },
    })
  }

  useEffect(() => {
    // 頁面一掛載完就調用
    getBrowseRecordFromLocalStorage()
  }, [])

  // 上下按鈕該到哪個頁面的判斷函式
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
      <Container>
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

        <Main>
          <LeftAside>
            <Category>
              <p>商品類別</p>
              <li style={{ fontSize: '18px', marginBottom: '10px' }}>
                <Link href={`/prodList/page/1`}>
                  <a>全部商品</a>
                </Link>
              </li>
              {category.map((v, i) => {
                return (
                  <li
                    style={{ fontSize: '18px', marginBottom: '10px' }}
                    key={i}
                  >
                    <Link href={`/prodList/category/${v}/page/1`}>
                      <a>{v}</a>
                    </Link>
                  </li>
                )
              })}
            </Category>
          </LeftAside>
          <List>
            {data.rows.map((prod) => {
              return (
                <Item key={prod.sid}>
                  <Pic>
                    <img src={prod.image} alt="" />
                  </Pic>
                  <Link href={`/prodDetail/${prod.sid}`}>
                    <a>
                      <Name
                        onClick={() => {
                          updateBrowserRecode(prod)
                        }}
                      >
                        {prod.Name}
                      </Name>
                    </a>
                  </Link>
                  <Price
                    isSpecial_offer={prod.special_offer === '' ? false : true}
                  >
                    ${prod.special_offer ? prod.special_offer : prod.price}
                  </Price>
                </Item>
              )
            })}
          </List>
          <BrowserRecode>
            <BrowserRecodeTitle>瀏覽紀錄</BrowserRecodeTitle>
            {browserRecodeState.browserRecode.myBrowserRecode
              ? browserRecodeState.browserRecode.myBrowserRecode
                  .slice(0)
                  .reverse()
                  .map((prod: Prod, i) => {
                    return (
                      <div key={prod.sid}>
                        <Link href={`/prodDetail/${prod.sid}`}>
                          <a>
                            <h4
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
          </BrowserRecode>
        </Main>
      </Container>
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
