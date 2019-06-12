import gql from 'graphql-tag'

export const FRAGMENT_PERSON_IN_GROUP = gql`
  fragment PersonInGroup on PersonInGroup {
    nodeId
    personId: personByPersonId {
      value: id
      label: id
    }
    groupId: groupOfPeopleByGroupId {
      value: id
      label: name
    }
    serviceSuehsr: personId @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_PERSON_IN_GROUP = gql`
  fragment SelectPersonInGroup on PersonInGroup {
    value: nodeId
    label: groupId
  }
`

export const LIST_PERSON_IN_GROUPS = gql`
  query LIST_PERSON_IN_GROUPS(
    $first: Int!,
    $after: Cursor,
    $condition: PersonInGroupCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allPersonInGroups(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...PersonInGroup
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_PERSON_IN_GROUP}
`

export const SELECT_LIST_PERSON_IN_GROUP = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allPersonInGroups(
      first: $first
      after: $after
      filter: { group_id: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectPersonInGroup
      }
    }
  }
  ${FRAGMENT_SELECT_PERSON_IN_GROUP}
`
export const CREATE_PERSON_IN_GROUP = gql`
  mutation createPersonInGroup($person_in_groupPatch: PersonInGroupInput!, $isList: Boolean = false) {
    createPersonInGroup(input: { person_in_group: $person_in_groupPatch }) {
      person_in_group {
        ...PersonInGroup
      }
    }
  }
  ${FRAGMENT_PERSON_IN_GROUP}
`

export const UPDATE_PERSON_IN_GROUP = gql`
  mutation updatePersonInGroup(
    $nodeId: ID!
    $person_in_groupPatch: PersonInGroupPatch!
    $isList: Boolean = false
  ) {
    updatePersonInGroup(input: { nodeId: $nodeId, person_in_groupPatch: $person_in_groupPatch }) {
      clientMutationId
      person_in_group {
        ...PersonInGroup
      }
    }
  }
  ${FRAGMENT_PERSON_IN_GROUP}
`

export const DELETE_PERSON_IN_GROUP = gql`
  mutation deletePersonInGroup($nodeId: ID!) {
    deletePersonInGroup(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_PERSON_IN_GROUP = gql`
  query readPersonInGroup($id: ID!, $isList: Boolean!) {
    person_in_group: person_in_group(nodeId: $id) {
      ...PersonInGroup
    }
  }
  ${FRAGMENT_PERSON_IN_GROUP}
`

export const SELECT_PERSON_IN_GROUP = gql`
  query Item($value: ID!) {
    item: person_in_group(nodeId: $value) {
      ...SelectPersonInGroup
    }
  }
  ${FRAGMENT_SELECT_PERSON_IN_GROUP}
`
