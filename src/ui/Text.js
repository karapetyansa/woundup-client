import styled from 'styled-components'
import {
  space,
  fontSize,
  fontWeight,
  textAlign,
  lineHeight,
  color
} from 'styled-system'

export const Text = styled.div`
  font-family: sans-serif
  ${color}
  ${space}
  ${fontSize}
  ${fontWeight}
  ${textAlign}
  ${lineHeight}
`

Text.displayName = 'Text'
