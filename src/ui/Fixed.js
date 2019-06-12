import sc from 'styled-components'
import sys from 'system-components'

// import { Fixed as Fx } from 'rebass'
const Position = sys(
    'space',
    'color',
    'zIndex',
    'top',
    'right',
    'bottom',
    'left'
  )
  
const Fx = sys({
    is: Position
  }, {
    position: 'fixed'
  })

export const Fixed = sc(Fx)`
z-index: 1;
`
