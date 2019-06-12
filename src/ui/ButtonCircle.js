import styled from 'styled-components'
import sys from 'system-components'

const css = props => props.css

const Base = sys(
  'space',
  'color',
  'fontSize',
  css
)

Base.displayName = 'Base'

export const ButtonCircle = styled(Base)`
  color: ${({ theme }) => theme.colors.button.color};
  background-color: ${({ theme }) => theme.colors.button.backgroundColor};
  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`
