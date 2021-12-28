import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { GetStaticPaths } from 'next'
import { useSelector } from 'react-redux'
import {
  ReturnLink,
  BrowserRecode,
  BrowserRecodeTitle,
  BrowserRecodeName,
  Item,
  ItemPic,
  ItemName,
  ItemPrice,
} from '../../../styles/page/prodLDetailStyle'
import { Container } from '../../../components/Container'

interface Props {
  prod: {
    data: {
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
  }
}

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

function Sid({ prod }: Props) {
  // console.log(prod.data)
  const browserRecodeState = useSelector((state: BrowserRecodeState) => {
    return state
  })

  // console.log(
  //   'sid browserRecode',
  //   browserRecodeState.browserRecode.updateBrowserRecode
  // )

  if (!prod) return ''
  return (
    <>
      <Container>
        <Item>
          <ItemPic>
            <img src={prod.data.image} alt="" />
          </ItemPic>
          <ItemName>{prod.data.Name}</ItemName>
          <ItemPrice
            isSpecial_offer={prod.data.special_offer === '' ? false : true}
          >
            $
            {prod.data.special_offer === ''
              ? prod.data.price
              : prod.data.special_offer}
          </ItemPrice>
        </Item>
        <BrowserRecode>
          <BrowserRecodeTitle>瀏覽紀錄</BrowserRecodeTitle>
          {browserRecodeState.browserRecode.myBrowserRecode
            .slice(0)
            .reverse()
            .map((prod, i) => {
              return (
                <div key={prod.sid}>
                  <Link href={`/prodDetail/${prod.sid}`}>
                    <a>
                      <BrowserRecodeName
                        onClick={() => {
                          browserRecodeState.browserRecode.updateBrowserRecode(
                            prod
                          )
                        }}
                      >
                        {i + 1}. {prod.Name}
                      </BrowserRecodeName>
                    </a>
                  </Link>
                </div>
              )
            })}
        </BrowserRecode>
        <ReturnLink href="/prodList/page/1">
          <a>返回商品列表頁</a>
        </ReturnLink>
      </Container>
    </>
  )
}

/*export const getStaticProps: GetStaticProps = async ({ params }) => {
  let r = await fetch(`http://localhost:3001/product/${params!.sid}`)
  let j = await r.json()

  return {
    props: {
      prod: j,
    },
  }
}
*/

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let r = await axios.get(`http://localhost:3001/product/${params!.sid}`)

  return {
    props: {
      prod: r.data,
    },
  }
}

/*export const getStaticPaths: GetStaticPaths = async () => {
  let r = await fetch(`http://localhost:3001/product`)
  let j = await r.json()
  let totalRowsNumber = []
  for (let i = 1; i <= j.totalRows; i++) {
    totalRowsNumber.push(i)
  }
  const paths = totalRowsNumber.map((v) => {
    return { params: { sid: v + '' } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}*/

export const getStaticPaths: GetStaticPaths = async () => {
  let r = await axios.get(`http://localhost:3001/product`)
  let totalRowsNumber = []
  for (let i = 1; i <= r.data.totalRows; i++) {
    totalRowsNumber.push(i)
  }
  const paths = totalRowsNumber.map((v) => {
    return { params: { sid: v + '' } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export default Sid
