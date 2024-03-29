import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import InfiniteScroll from 'react-infinite-scroller'

import { Button, Loader, Flex, Text } from 'ui'
import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
import { ActionButton } from 'components/Buttons'

import { DELETE_PLACE, LIST_PLACES } from './queries'
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
        <ActionButton
          is={Link}
          buttonType="edit"
          is={Link}
          mx={0}
          to={'/places/' + id}
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
    pathname: '/places/create',
    query: { ...this.props.match.params }
  }
  render() {
    const {
      loading,
      error,
      mainQuery,
      refetch,
      loadMore,
      deletePlace
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
                <Header headers={['ИД', 'Название']} />
                <Body deleteRow={deletePlace} data={mainQuery.nodes} />
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

export const ListPlaces = compose(
  graphql(DELETE_PLACE, mutateProp('deletePlace')),
  graphql(LIST_PLACES, configObject)
)(Table)
