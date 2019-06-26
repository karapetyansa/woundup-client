import React from 'react'
import styled from 'styled-components'

import { Box } from 'ui'

export const Table = ({ children }) => <Box as="table">{children}</Box>

export const Tbody = ({ children }) => <Box as="tbody">{children}</Box>

export const Th = styled(Box)`
  font-family: sans-serif;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 0px 8px;
`.withComponent('th')

export const Td = Th.withComponent('td')

export const Tr = styled(Box)`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`.withComponent('tr')
