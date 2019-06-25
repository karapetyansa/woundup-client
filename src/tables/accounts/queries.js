import gql from 'graphql-tag.macro'

export const FRAGMENT_ACCOUNT = gql`
  fragment Account on Account {
    nodeId
    role
    login
    personId: personByPersonId {
      value: id
      label: name
    }
    serviceSuehsr: login @skip(if: $isList)
  }
`

const FRAGMENT_SELECT_ACCOUNT = gql`
  fragment SelectAccount on Account {
    value: personId
    label: name
  }
`

export const LIST_ACCOUNTS = gql`
  query LIST_ACCOUNTS(
    $first: Int!,
    $after: Cursor,
    $condition: AccountCondition,
    $isList: Boolean = true
  ) {
    mainQuery: allAccounts(
      first: $first,
      after: $after,
      condition: $condition
    ) {
      nodes {
        ...Account
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${FRAGMENT_ACCOUNT}
`

export const SELECT_LIST_ACCOUNT = gql`
  query List($first: Int!, $after: Cursor, $searchValue: String) {
    list: allAccounts(
      first: $first
      after: $after
      filter: { passwordHash: { includesInsensitive: $searchValue } }
    ) {
      nodes {
        ...SelectAccount
      }
    }
  }
  ${FRAGMENT_SELECT_ACCOUNT}
`
export const CREATE_ACCOUNT = gql`
  mutation createAccount($accountPatch: AccountInput!, $isList: Boolean = false) {
    createAccount(input: { account: $accountPatch }) {
      account {
        ...Account
      }
    }
  }
  ${FRAGMENT_ACCOUNT}
`

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $nodeId: ID!
    $accountPatch: AccountPatch!
    $isList: Boolean = false
  ) {
    updateAccount(input: { nodeId: $nodeId, accountPatch: $accountPatch }) {
      clientMutationId
      account {
        ...Account
      }
    }
  }
  ${FRAGMENT_ACCOUNT}
`

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($nodeId: ID!) {
    deleteAccount(input: { nodeId: $nodeId }) {
      clientMutationId
    }
  }
`

export const READ_ACCOUNT = gql`
  query readAccount($id: Int!, $isList: Boolean!) {
    account: accountByPersonId(personId: $id) {
      ...Account
    }
  }
  ${FRAGMENT_ACCOUNT}
`

export const SELECT_ACCOUNT = gql`
  query Item($value: Int!) {
    item: accountByPersonId(personId: $value) {
      ...SelectAccount
    }
  }
  ${FRAGMENT_SELECT_ACCOUNT}
`
