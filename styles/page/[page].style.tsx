import styled from 'styled-components'

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
`

export const NumberButton = styled.button<{ active?: boolean }>`
  border: none;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? 'skyblue' : '')};
  margin: 0 5px;
  cursor: pointer;
`

export const PreNextButton = styled(NumberButton)`
  border-radius: 10%;
  margin: 0;
`

export const Search = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

export const SearchButton = styled(NumberButton)`
  border-radius: 10%;
  margin: 0;
`

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const Product = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 31%;
  margin: 0 10px 20px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px;
  a {
    font-size: 20px;
    font-weight: bold;
  }
`

export const Pic = styled.div`
  width: 50%;
  margin: 0 auto;
`
