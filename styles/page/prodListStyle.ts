import styled from 'styled-components'
import Link from 'next/link'

interface Props {
  active?: boolean
}

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
