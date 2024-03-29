import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import InfiniteScroll from 'react-infinite-scroller'

import { Button, Loader, Flex, Text, SimpleLink } from 'ui'
import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
import { ActionButton } from 'components/Buttons'

import { DELETE_EVENT_MEMBER, LIST_EVENT_MEMBERS } from './queries'
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
    const {
      nodeId,
      isModerator,
      eventId,
      event,
      participant,
      groupOfPeople
    } = this.props
    return (
      <Tr>
        <Td>{isModerator}</Td>
        <Td>
          {eventId && (
            <SimpleLink to={'/events/' + eventId.value}>
              {eventId.label}
            </SimpleLink>
          )}
        </Td>
        <Td>
          {participant && (
            <SimpleLink to={'/group_of_people/' + participant.value}>
              {participant.label}
            </SimpleLink>
          )}
        </Td>
        <Td>
          <ActionButton
            is={Link}
            buttonType="edit"
            mx={0}
            to={'/event_members/' + nodeId}
          />
        </Td>
        <Td>
          <ActionButton onClick={this.delete} buttonType="delete" />
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
    pathname: '/event_members/create',
    query: { ...this.props.match.params }
  }
  render() {
    const {
      loading,
      error,
      mainQuery,
      refetch,
      loadMore,
      deleteEventMember
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
                <Header headers={['Ведущие', 'Событие', 'Группа участников']} />
                <Body deleteRow={deleteEventMember} data={mainQuery.nodes} />
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
    const { event, group_of_people } = match.params || {}
    const condition = omitBy(
      { eventId: toNumber(event), participant: toNumber(group_of_people) },
      isNil
    )
    return {
      variables: {
        first: 50,
        condition
      }
    }
  },
  props: transformListProps
}

export const ListEventMembers = compose(
  graphql(DELETE_EVENT_MEMBER, mutateProp('deleteEventMember')),
  graphql(LIST_EVENT_MEMBERS, configObject)
)(Table)
