import gql from 'graphql-tag.macro'

export const FRAGMENT_GROUP_OF_PEOPLE = gql`
  fragment GroupOfPeople on GroupOfPerson {
    nodeId
    id
    name
    abbrName @skip(if: $isList)
    serviceSuehsr: id @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_GROUP_OF_PEOPLE = gql`
  fragment SelectGroupOfPeople on GroupOfPerson {
    value: id
    label: name
  }
`

export const LIST_GROUP_OF_PEOPLE = gql`
  query LIST_GROUP_OF_PEOPLE(
    $first: Int!,
    $after: Cursor,
    $condition: GroupOfPersonCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allGroupOfPeople(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...GroupOfPeople
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_GROUP_OF_PEOPLE}
`

export const SELECT_LIST_GROUP_OF_PEOPLE = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allGroupOfPeople(
      first: $first
      after: $after
      filter: { name: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectGroupOfPeople
      }
    }
  }
  ${FRAGMENT_SELECT_GROUP_OF_PEOPLE}
`
export const CREATE_GROUP_OF_PEOPLE = gql`
  mutation createGroupOfPeople($group_of_peoplePatch: GroupOfPeopleInput!, $isList: Boolean = false) {
    createGroupOfPeople(input: { group_of_people: $group_of_peoplePatch }) {
      group_of_people {
        ...GroupOfPeople
      }
    }
  }
  ${FRAGMENT_GROUP_OF_PEOPLE}
`

export const UPDATE_GROUP_OF_PEOPLE = gql`
  mutation updateGroupOfPeople(
    $nodeId: ID!
    $group_of_peoplePatch: GroupOfPeoplePatch!
    $isList: Boolean = false
  ) {
    updateGroupOfPeople(input: { nodeId: $nodeId, group_of_peoplePatch: $group_of_peoplePatch }) {
      clientMutationId
      group_of_people {
        ...GroupOfPeople
      }
    }
  }
  ${FRAGMENT_GROUP_OF_PEOPLE}
`

export const DELETE_GROUP_OF_PEOPLE = gql`
  mutation deleteGroupOfPeople($nodeId: ID!) {
    deleteGroupOfPeople(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_GROUP_OF_PEOPLE = gql`
  query readGroupOfPeople($id: Int!, $isList: Boolean!) {
    group_of_people: groupOfPersonById(id: $id) {
      ...GroupOfPeople
    }
  }
  ${FRAGMENT_GROUP_OF_PEOPLE}
`

export const SELECT_GROUP_OF_PEOPLE = gql`
  query Item($value: Int!) {
    item: groupOfPersonById(id: $value) {
      ...SelectGroupOfPeople
    }
  }
  ${FRAGMENT_SELECT_GROUP_OF_PEOPLE}
`
