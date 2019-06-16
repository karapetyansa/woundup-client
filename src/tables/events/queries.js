import gql from 'graphql-tag.macro'

export const FRAGMENT_EVENT = gql`
  fragment Event on Event {
    nodeId
    id
    name
    serviceSuehsr: id @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_EVENT = gql`
  fragment SelectEvent on Event {
    value: id
    label: name
  }
`

export const LIST_EVENTS = gql`
  query LIST_EVENTS(
    $first: Int!,
    $after: Cursor,
    $condition: EventCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allEvents(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...Event
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_EVENT}
`

export const SELECT_LIST_EVENT = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allEvents(
      first: $first
      after: $after
      filter: { name: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectEvent
      }
    }
  }
  ${FRAGMENT_SELECT_EVENT}
`
export const CREATE_EVENT = gql`
  mutation createEvent($eventPatch: EventInput!, $isList: Boolean = false) {
    createEvent(input: { event: $eventPatch }) {
      event {
        ...Event
      }
    }
  }
  ${FRAGMENT_EVENT}
`

export const UPDATE_EVENT = gql`
  mutation updateEvent(
    $nodeId: ID!
    $eventPatch: EventPatch!
    $isList: Boolean = false
  ) {
    updateEvent(input: { nodeId: $nodeId, eventPatch: $eventPatch }) {
      clientMutationId
      event {
        ...Event
      }
    }
  }
  ${FRAGMENT_EVENT}
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($nodeId: ID!) {
    deleteEvent(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_EVENT = gql`
  query readEvent($id: Int!, $isList: Boolean!) {
    event: eventById(id: $id) {
      ...Event
    }
  }
  ${FRAGMENT_EVENT}
`

export const SELECT_EVENT = gql`
  query Item($value: Int!) {
    item: eventById(id: $value) {
      ...SelectEvent
    }
  }
  ${FRAGMENT_SELECT_EVENT}
`
