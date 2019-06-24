import gql from 'graphql-tag.macro'

export const FRAGMENT_PERSON = gql`
  fragment Person on Person {
    nodeId
    name
    id
    serviceSuehsr: name @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_PERSON = gql`
  fragment SelectPerson on Person {
    value: id
    label: name
  }
`

export const LIST_PEOPLE = gql`
  query LIST_PEOPLE(
    $first: Int!,
    $after: Cursor,
    $condition: PersonCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allPeople(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...Person
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_PERSON}
`

export const SELECT_LIST_PERSON = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allPeople(
      first: $first
      after: $after
      filter: { name: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectPerson
      }
    }
  }
  ${FRAGMENT_SELECT_PERSON}
`
export const CREATE_PERSON = gql`
  mutation createPerson($personPatch: PersonInput!, $isList: Boolean = false) {
    createPerson(input: { person: $personPatch }) {
      person {
        ...Person
      }
    }
  }
  ${FRAGMENT_PERSON}
`

export const UPDATE_PERSON = gql`
  mutation updatePerson(
    $nodeId: ID!
    $personPatch: PersonPatch!
    $isList: Boolean = false
  ) {
    updatePerson(input: { nodeId: $nodeId, personPatch: $personPatch }) {
      clientMutationId
      person {
        ...Person
      }
    }
  }
  ${FRAGMENT_PERSON}
`

export const DELETE_PERSON = gql`
  mutation deletePerson($nodeId: ID!) {
    deletePerson(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_PERSON = gql`
  query readPerson($id: Int!, $isList: Boolean!) {
    person: personById(id: $id) {
      ...Person
    }
  }
  ${FRAGMENT_PERSON}
`

export const SELECT_PERSON = gql`
  query Item($value: Int!) {
    item: personById(id: $value) {
      ...SelectPerson
    }
  }
  ${FRAGMENT_SELECT_PERSON}
`
