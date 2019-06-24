
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  
  import { DELETE_PERSON, LIST_PEOPLE } from './queries'
  import { transformListProps, mutateProp } from 'apollo/helpers'
  
  const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>
  
  const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>
  
  class Row extends Component {
    delete = async () => {
      const { deleteRow, nodeId } = this.props
      await deleteRow({ nodeId })
    }
    render() {
      const { nodeId, id, name } = this.props
      return (
        <Tr> 
          <Td>{id}</Td>
          <Td>{name}</Td>
          <Td>
            <Button is={Link} mx={0} to={'/people/' + id}>
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
      pathname: '/people/create',
      query: { ...this.props.match.params }
    }
    render() {
      const { loading, error, mainQuery, refetch, deletePerson } = this.props
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
              <Header headers={[ 'Id' ]} />
              {!loading &&
                !error && <Body deleteRow={deletePerson} data={mainQuery.nodes} />}
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
      return {
        variables: {
          first: 50,
        }
      }
    },
    props: transformListProps
  }
  
  export const ListPeople = compose(
    graphql(DELETE_PERSON, mutateProp('deletePerson')),
    graphql(LIST_PEOPLE, configObject)
  )(Table)
  
  