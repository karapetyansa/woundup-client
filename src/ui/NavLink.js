import styled from 'styled-components'
import { NavLink as Nl } from 'react-router-dom'
import { fontFamily, color } from 'styled-system'

import { selectColor } from 'styles/helpers'

export const NavLink = styled(Nl)`
  ${fontFamily}
  &:hover {
    color: inherit;
  }
  &.active {
    ${props => `border-color: ${selectColor('accent')(props)};`};
  }
`


NavLink.defaultProps = {
  fontFamily: 'sans',
}
