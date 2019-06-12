// export { Tabs, Tab } from 'rebass'

import sys from 'system-components'
import { Flex } from 'ui'

export const Tabs = sys({
  is: Flex,
  borderBottom: 1,
  borderColor: 'gray'
})

Tabs.displayName = 'Tabs'

export const Tab = sys({
  is: 'a',
  fontSize: 1,
  fontWeight: 'bold',
  mr: 3,
  py: 2,
  color: 'inherit',
  borderBottom: 2,
  borderColor: 'transparent',
  hover: {
    color: 'blue'
  }
}, {
  textDecoration: 'none'
})

Tab.displayName = 'Tab'


