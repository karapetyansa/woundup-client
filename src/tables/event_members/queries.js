import gql from 'graphql-tag.macro'

export const FRAGMENT_EVENT_MEMBER = gql`
  fragment EventMember on EventMember {
    nodeId
    isModerator
    eventId: eventByEventId {
      value: id
      label: name
    }
    participant: groupOfPersonByParticipant {
      value: id
      label: name
    }
    serviceSuehsr: isModerator @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_EVENT_MEMBER = gql`
  fragment SelectEventMember on EventMember {
    value: nodeId
    label: isModerator
  }
`

export const LIST_EVENT_MEMBERS = gql`
  query LIST_EVENT_MEMBERS(
    $first: Int!,
    $after: Cursor,
    $condition: EventMemberCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allEventMembers(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...EventMember
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_EVENT_MEMBER}
`

export const SELECT_LIST_EVENT_MEMBER = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allEventMembers(
      first: $first
      after: $after
      filter: { is_moderator: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectEventMember
      }
    }
  }
  ${FRAGMENT_SELECT_EVENT_MEMBER}
`
export const CREATE_EVENT_MEMBER = gql`
  mutation createEventMember($eventMemberPatch: EventMemberInput!, $isList: Boolean = false) {
    createEventMember(input: { eventMember: $eventMemberPatch }) {
      eventMember {
        ...EventMember
      }
    }
  }
  ${FRAGMENT_EVENT_MEMBER}
`

export const UPDATE_EVENT_MEMBER = gql`
  mutation updateEventMember(
    $nodeId: ID!
    $eventMemberPatch: EventMemberPatch!
    $isList: Boolean = false
  ) {
    updateEventMember(input: { nodeId: $nodeId, eventMemberPatch: $eventMemberPatch }) {
      clientMutationId
      eventMember {
        ...EventMember
      }
    }
  }
  ${FRAGMENT_EVENT_MEMBER}
`

export const DELETE_EVENT_MEMBER = gql`
  mutation deleteEventMember($nodeId: ID!) {
    deleteEventMember(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_EVENT_MEMBER = gql`
  query readEventMember($id: ID!, $isList: Boolean!) {
    eventMember: eventMember(nodeId: $id) {
      ...EventMember
    }
  }
  ${FRAGMENT_EVENT_MEMBER}
`

export const SELECT_EVENT_MEMBER = gql`
  query Item($value: ID!) {
    item: eventMember(nodeId: $value) {
      ...SelectEventMember
    }
  }
  ${FRAGMENT_SELECT_EVENT_MEMBER}
`
