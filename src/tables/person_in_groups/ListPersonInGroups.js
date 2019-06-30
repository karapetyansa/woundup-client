
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  import { ActionButton } from 'components/Buttons'
  
  import { DELETE_PERSON_IN_GROUP, LIST_PERSON_IN_GROUPS } from './queries'
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
      const { nodeId, personId, person, groupId, groupOfPeople } = this.props
      return (
        <Tr> 
          <Td>{personId && personId.label}</Td> 
          <Td>{groupId && groupId.label}</Td>
          <ActionButton is={Link} buttonType="edit" mx={0} to={'/person_in_groups/' + nodeId} />
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
      pathname: '/person_in_groups/create',
      query: { ...this.props.match.params }
    }
    render() {
      const { loading, error, mainQuery, refetch, deletePersonInGroup } = this.props
      return (
        <Fragment>
          <Flex style={{position: 'sticky', top: 56, backgroundColor: "white"}}>
            <ActionButton buttonType="refetch" onClick={refetch} />
            <ActionButton buttonType="create" is={Link} to={this.toCreate} />
          </Flex>
          <Tbl>
            <Tbody>
              <Header headers={[ 'Пользователь', 'Группа пользователей' ]} />
              {!loading &&
                !error && <Body deleteRow={deletePersonInGroup} data={mainQuery.nodes} />}
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
      const { person, group_of_people } = match.params || {}
      const condition = omitBy({ personId: toNumber(person), groupId: toNumber(group_of_people) }, isNil)
      return {
        variables: {
          first: 50,
          condition
        }
      }
    },
    props: transformListProps
  }
  
  export const ListPersonInGroups = compose(
    graphql(DELETE_PERSON_IN_GROUP, mutateProp('deletePersonInGroup')),
    graphql(LIST_PERSON_IN_GROUPS, configObject)
  )(Table)
  
  