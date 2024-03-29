import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import InfiniteScroll from 'react-infinite-scroller'

import { Button, Loader, Flex, Text } from 'ui'
import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
import { ActionButton } from 'components/Buttons'

import { DELETE_ACCOUNT, LIST_ACCOUNTS } from './queries'
import { transformListProps, mutateProp } from 'apollo/helpers'
import { toNumber } from 'utils'

const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>

const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>

class Row extends Component {
  delete = async () => {
    const { deleteRow, nodeId } = this.props
    await deleteRow({ nodeId })
  }
  render() {
    const { nodeId, passwordHash, personId, person, login, role } = this.props
    return (
      <Tr>
        {/* <Td>{passwordHash}</Td>  */}
        <Td>{personId && personId.label}</Td>
        <Td>{login}</Td>
        <Td>{role}</Td>
        <ActionButton
          is={Link}
          buttonType="edit"
          mx={0}
          to={'/accounts/' + personId.value}
        />
        <ActionButton onClick={this.delete} buttonType="delete" />
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
    const { loading, error, mainQuery, refetch, loadMore, deleteAccount } = this.props
    return (
      <Fragment>
        <Flex style={{ position: 'sticky', top: 56, backgroundColor: 'white' }}>
          <ActionButton buttonType="refetch" onClick={refetch} />
          <ActionButton buttonType="create" is={Link} to={this.toCreate} />
        </Flex>
        <Tbl>
          <Tbody>
            {!loading && !error && (
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={mainQuery.pageInfo.hasNextPage}
                initialLoad={false}
                loader={<p key={'00'}>Loading...</p>}
              >
                <Header headers={['Имя', 'Логин', 'Роль']} />
                <Body deleteRow={deleteAccount} data={mainQuery.nodes} />
              </InfiniteScroll>
            )}
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
    const condition = omitBy({ personId: toNumber(person) }, isNil)
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
