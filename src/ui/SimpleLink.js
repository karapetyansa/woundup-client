import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { fontFamily, color } from 'styled-system'

export const SimpleLink = styled(Link)`
  ${fontFamily}
  text-decoration: none;
  color: inherit;
`


SimpleLink.defaultProps = {
  fontFamily: 'sans',
}
