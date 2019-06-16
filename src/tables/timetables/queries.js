import gql from 'graphql-tag.macro'

export const FRAGMENT_TIMETABLE = gql`
  fragment Timetable on Timetable {
    nodeId
    id
    startTime @skip(if: $isList)
    endTime @skip(if: $isList)
    eventId: eventByEventId {
      value: id
      label: name
    }
    placeId: placeByPlaceId {
      value: id
      label: name
    }
    serviceSuehsr: id @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_TIMETABLE = gql`
  fragment SelectTimetable on Timetable {
    value: id
    label: eventId
  }
`

export const LIST_TIMETABLES = gql`
  query LIST_TIMETABLES(
    $first: Int!,
    $after: Cursor,
    $condition: TimetableCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allTimetables(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...Timetable
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_TIMETABLE}
`

export const SELECT_LIST_TIMETABLE = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allTimetables(
      first: $first
      after: $after
      filter: { event_id: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectTimetable
      }
    }
  }
  ${FRAGMENT_SELECT_TIMETABLE}
`
export const CREATE_TIMETABLE = gql`
  mutation createTimetable($timetablePatch: TimetableInput!, $isList: Boolean = false) {
    createTimetable(input: { timetable: $timetablePatch }) {
      timetable {
        ...Timetable
      }
    }
  }
  ${FRAGMENT_TIMETABLE}
`

export const UPDATE_TIMETABLE = gql`
  mutation updateTimetable(
    $nodeId: ID!
    $timetablePatch: TimetablePatch!
    $isList: Boolean = false
  ) {
    updateTimetable(input: { nodeId: $nodeId, timetablePatch: $timetablePatch }) {
      clientMutationId
      timetable {
        ...Timetable
      }
    }
  }
  ${FRAGMENT_TIMETABLE}
`

export const DELETE_TIMETABLE = gql`
  mutation deleteTimetable($nodeId: ID!) {
    deleteTimetable(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_TIMETABLE = gql`
  query readTimetable($id: Int!, $isList: Boolean!) {
    timetable: timetableById(id: $id) {
      ...Timetable
    }
  }
  ${FRAGMENT_TIMETABLE}
`

export const SELECT_TIMETABLE = gql`
  query Item($value: Int!) {
    item: timetableById(id: $value) {
      ...SelectTimetable
    }
  }
  ${FRAGMENT_SELECT_TIMETABLE}
`
