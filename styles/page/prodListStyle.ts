import styled from 'styled-components'

interface Props {
  active?: boolean
  isSpecial_offer?: boolean
}

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
`

export const LeftAside = styled.div`
  width: calc(10% - 5px);
`

export const Category = styled.div`
  padding: 10px;
  list-style-type: none;
  p,
  li {
    font-size: 18px;
    margin-bottom: 10px;
  }
  p {
    font-weight: bold;
  }
`
export const List = styled.div`
  width: calc(75% - 5px);
  display: flex;
  flex-wrap: wrap;
`
export const Item = styled.div`
  width: calc(33.33% - 10px);
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`
export const Pic = styled.div`
  width: 60%;
  margin: 0 auto 10px;
  img {
    width: 100%;
    object-fit: contain;
  }
`
export const Name = styled.div`
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto 10px;
`
export const Price = styled.div<Props>`
  color: ${({ isSpecial_offer }) => (isSpecial_offer ? 'red' : 'black')};
  text-align: center;
`

export const BrowserRecode = styled.div`
  width: calc(15% - 5px);
`
export const BrowserRecodeTitle = styled.h3`
  margin: 0 0 5px;
  font-size: 24px;
  text-align: center;
`

export const NumberButton = styled.button<Props>`
  border: none;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'skyblue' : 'transparent')};
  margin: 0 5px;
  cursor: pointer;
  width: 25px;
  height: 25px;
`

export const PrevNextButton = styled(NumberButton)`
  border-radius: 10%;
  width: 60px;
`

export const ButtonWrap = styled.div`
  width: 30%;
  margin: 20px auto;
`
export const SearchWrap = styled(ButtonWrap)`
  input,
  button {
    height: 23px;
    outline: none;
  }
`
