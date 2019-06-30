
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  import { ActionButton } from 'components/Buttons'
  
  import { DELETE_EVENT_MEMBER, LIST_EVENT_MEMBERS } from './queries'
  import { transformListProps, mutateProp } from 'apollo/helpers'
  import { toNumber } from 'utils';
  
  const renderHeaderCell = (cell, i) => <Th key={i}>{cell}</Th>
  
  const Header = ({ headers }) => <Tr>{headers.map(renderHeaderCell)}</Tr>
  
  class Row extends Component {
    delete = async () => {
      const { deleteRow, nodeId } = this.props
      await deleteRow({ nodeId })
    }
    render() {
      const { nodeId, isModerator, eventId, event, participant, groupOfPeople } = this.props
      return (
        <Tr> 
          <Td>{isModerator}</Td> 
          <Td>{eventId && eventId.label}</Td> 
          <Td>{participant && participant.label}</Td>
          <Td>
            <ActionButton is={Link} buttonType="edit" mx={0} to={'/event_members/' + nodeId} />
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
      const { loading, error, mainQuery, refetch, deleteEventMember } = this.props
      return (
        <Fragment>
          <Flex style={{position: 'sticky', top: 56, backgroundColor: "white"}}>
            <ActionButton buttonType="refetch" onClick={refetch} />
            <ActionButton buttonType="create" is={Link} to={this.toCreate} />
          </Flex>
          <Tbl>
            <Tbody>
              <Header headers={[ 'Ведущие', 'Событие', 'Группа участников' ]} />
              {!loading &&
                !error && <Body deleteRow={deleteEventMember} data={mainQuery.nodes} />}
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
      const condition = omitBy({ eventId: toNumber(event), participant: toNumber(group_of_people) }, isNil)
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
  
  