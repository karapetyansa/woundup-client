import React, { Component, Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import { createApolloClient } from 'apollo'
import { Flex, Loader } from 'ui'
import { Navbar, SideBar, Main } from 'components'
import { theme } from 'styles'
import { GlobalStyle } from 'styles/globalStyles'

export class App extends Component {
  state = { client: null, loaded: false }
  async componentDidMount() {
    const client = await createApolloClient('http://ksa.spsu.ru/graphql')
    this.setState({ client, loaded: true })
  }
  render() {
    const { client, loaded } = this.state
    if (!loaded) {
      return null
    }
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Fragment>
              <GlobalStyle />
              <Navbar />
              <Flex flexDirection={['column', 'row']}>
                <SideBar />
                <Main />
              </Flex>
            </Fragment>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}
