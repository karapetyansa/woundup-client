
  import React, { Component, Fragment } from 'react'
  import { Link } from 'react-router-dom'
  import { graphql, compose } from 'react-apollo'
  import omitBy from 'lodash/omitBy'
  import isNil from 'lodash/isNil'

  import { Button, Loader, Flex, Text } from 'ui'
  import { Table as Tbl, Tr, Th, Td, Tbody } from 'ui/Table'
  
  import { DELETE_TIMETABLE, LIST_TIMETABLES } from './queries'
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
      const { nodeId, id, eventId, event, placeId, startTime, endTime } = this.props
      return (
        <Tr> 
          <Td>{id}</Td> 
          <Td>{eventId && eventId.label}</Td> 
          <Td>{startTime && new Date(startTime+'z').toLocaleString()}</Td> 
          <Td>{endTime && new Date(endTime+'z').toLocaleString()}</Td> 
          <Td>{placeId && placeId.label}</Td>
          <Td>
            <Button is={Link} mx={0} to={'/timetables/' + id}>
              Редактировать
            </Button>
          </Td>
          <Td>
            <Button mx={0} onClick={this.delete}>
              Удалить
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
      pathname: '/timetables/create',
      query: { ...this.props.match.params }
    }
    render() {
      const { loading, error, mainQuery, refetch, deleteTimetable } = this.props
      return (
        <Fragment>
          <Flex>
            <Button onClick={refetch}>Обновить с сервера</Button>
            <Button is={Link} to={this.toCreate}>
              Создать
            </Button>
          </Flex>
          <Tbl>
            <Tbody>
              <Header headers={[ 'ИД', 'Событие', 'Начало', 'Конец', 'Место' ]} />
              {!loading &&
                !error && <Body deleteRow={deleteTimetable} data={mainQuery.nodes} />}
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
      const { event, place } = match.params || {}
      const condition = omitBy({ eventId: toNumber(event), placeId: toNumber(place) }, isNil)
      return {
        variables: {
          first: 50,
          condition
        }
      }
    },
    props: transformListProps
  }
  
  export const ListTimetables = compose(
    graphql(DELETE_TIMETABLE, mutateProp('deleteTimetable')),
    graphql(LIST_TIMETABLES, configObject)
  )(Table)
  
  