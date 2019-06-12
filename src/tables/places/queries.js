import gql from 'graphql-tag'

export const FRAGMENT_PLACE = gql`
  fragment Place on Place {
    nodeId
    id
    name
    serviceSuehsr: id @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_PLACE = gql`
  fragment SelectPlace on Place {
    value: id
    label: name
  }
`

export const LIST_PLACES = gql`
  query LIST_PLACES(
    $first: Int!,
    $after: Cursor,
    $condition: PlaceCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allPlaces(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...Place
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_PLACE}
`

export const SELECT_LIST_PLACE = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allPlaces(
      first: $first
      after: $after
      filter: { name: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectPlace
      }
    }
  }
  ${FRAGMENT_SELECT_PLACE}
`
export const CREATE_PLACE = gql`
  mutation createPlace($placePatch: PlaceInput!, $isList: Boolean = false) {
    createPlace(input: { place: $placePatch }) {
      place {
        ...Place
      }
    }
  }
  ${FRAGMENT_PLACE}
`

export const UPDATE_PLACE = gql`
  mutation updatePlace(
    $nodeId: ID!
    $placePatch: PlacePatch!
    $isList: Boolean = false
  ) {
    updatePlace(input: { nodeId: $nodeId, placePatch: $placePatch }) {
      clientMutationId
      place {
        ...Place
      }
    }
  }
  ${FRAGMENT_PLACE}
`

export const DELETE_PLACE = gql`
  mutation deletePlace($nodeId: ID!) {
    deletePlace(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_PLACE = gql`
  query readPlace($id: Int!, $isList: Boolean!) {
    place: placeById(id: $id) {
      ...Place
    }
  }
  ${FRAGMENT_PLACE}
`

export const SELECT_PLACE = gql`
  query Item($value: Int!) {
    item: placeById(id: $value) {
      ...SelectPlace
    }
  }
  ${FRAGMENT_SELECT_PLACE}
`
