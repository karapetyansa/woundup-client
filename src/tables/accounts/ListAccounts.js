
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  
  import { DELETE_ACCOUNT, LIST_ACCOUNTS } from './queries'
  import { transformListProps, mutateProp } from 'apollo/helpers'
  
  const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>
  
  const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>
  
  class Row extends Component {
    delete = async () => {
      const { deleteRow, nodeId } = this.props
      await deleteRow({ nodeId })
    }
    render() {
      const { nodeId, passwordHash, personId, person } = this.props
      return (
        <Tr> 
          {/* <Td>{passwordHash}</Td>  */}
          <Td>{personId && personId.label}</Td>
          <Td>
            <Button is={Link} mx={0} to={'/accounts/' + personId.value}>
              Edit
            </Button>
          </Td>
          <Td>
            <Button mx={0} onClick={this.delete}>
              Delete
            </Button>
          </Td>
        </Tr>
      )
    }
  }
  
  const renderRow = deleteRow => row => (
    <Row key={row.nodeId} deleteRow={deleteRow} {...row} />
  )
  
  const Body = ({ data, deleteRow }) => data.map(renderRow(deleteRow))
  
  class Table extends Component {
    toCreate = {
      pathname: '/accounts/create',
      query: { ...this.props.match.params }
    }
    render() {
      const { loading, error, mainQuery, refetch, deleteAccount } = this.props
      return (
        <Fragment>
          <Flex>
            <Button onClick={refetch}>Refetch</Button>
            <Button is={Link} to={this.toCreate}>
              Create
            </Button>
          </Flex>
          <Tbl>
            <Tbody>
              <Header headers={[ 'Password Hash', 'Person Id' ]} />
              {!loading &&
                !error && <Body deleteRow={deleteAccount} data={mainQuery.nodes} />}
            </Tbody>
          </Tbl>
          {error && <Text>error</Text>}
          {loading && <Loader />}
        </Fragment>
      )
    }
  }
  
  const configObject = {
    options: ({ match = {} }) => {
      const { person } = match.params || {}
      const condition = omitBy({ personId: person }, isNil)
      return {
        variables: {
          first: 50,
          condition
        }
      }
    },
    props: transformListProps
  }
  
  export const ListAccounts = compose(
    graphql(DELETE_ACCOUNT, mutateProp('deleteAccount')),
    graphql(LIST_ACCOUNTS, configObject)
  )(Table)
  
  