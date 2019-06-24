import sc from 'styled-components'
import system from '@rebass/components'

const Fx = system(
  {
    position: 'fixed'
  },
  'space',
  'color',
  'zIndex',
  'top',
  'right',
  'bottom',
  'left',
  'position'
)

export const Fixed = sc(Fx)`
z-index: 1;
`
