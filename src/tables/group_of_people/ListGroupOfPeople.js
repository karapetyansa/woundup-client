import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import InfiniteScroll from 'react-infinite-scroller'

import { Button, Loader, Flex, Text } from 'ui'
import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
import { ActionButton } from 'components/Buttons'

import { DELETE_GROUP_OF_PEOPLE, LIST_GROUP_OF_PEOPLE } from './queries'
import { transformListProps, mutateProp } from 'apollo/helpers'

const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>

const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>

class Row extends Component {
  delete = async () => {
    const { deleteRow, nodeId } = this.props
    await deleteRow({ nodeId })
  }
  render() {
    const { nodeId, id, name, abbrName } = this.props
    return (
      <Tr>
        <Td>{id}</Td>
        <Td>{name}</Td>
        <Td>{abbrName}</Td>
        <ActionButton
          is={Link}
          buttonType="edit"
          mx={0}
          to={'/group_of_people/' + id}
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
    pathname: '/group_of_people/create',
    query: { ...this.props.match.params }
  }
  render() {
    const {
      loading,
      error,
      mainQuery,
      refetch,
      loadMore,
      deleteGroupOfPeople
    } = this.props
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
                <Header headers={['ИД', 'Название', 'Номер']} />
                <Body deleteRow={deleteGroupOfPeople} data={mainQuery.nodes} />
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
    return {
      variables: {
        first: 50
      }
    }
  },
  props: transformListProps
}

export const ListGroupOfPeople = compose(
  graphql(DELETE_GROUP_OF_PEOPLE, mutateProp('deleteGroupOfPeople')),
  graphql(LIST_GROUP_OF_PEOPLE, configObject)
)(Table)
