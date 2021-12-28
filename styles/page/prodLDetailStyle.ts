import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  isSpecial_offer?: boolean
}

export const ReturnLink = styled(Link)`
  color: red;
  a {
    color: red;
  }
`
export const Item = styled.div`
  width: 70%;
  margin: 100px auto;
`
export const ItemPic = styled.div`
  width: 40%;
  margin: auto;
  img {
    width: 100%;
  }
`
export const ItemName = styled.h3`
  text-align: center;
`
export const ItemPrice = styled.p<Props>`
  color: ${({ isSpecial_offer }) => (isSpecial_offer ? 'red' : 'black')};
  text-align: center;
  font-size: 20px;
`
export const BrowserRecode = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0 100px;
`
export const BrowserRecodeTitle = styled.h3`
  margin: 0 0 5px;
  font-size: 24px;
  text-align: center;
`
export const BrowserRecodeName = styled.h4`
  text-align: center;
  margin: 10px 0;
`
