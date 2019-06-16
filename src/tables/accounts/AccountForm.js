
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_ACCOUNT, CREATE_ACCOUNT, UPDATE_ACCOUNT } from './queries'

class AccountForm extends Component {
  onSubmit = async values => {
    const { account, createAccount, updateAccount, history } = this.props
    const { nodeId,  ...initialValues } = account || {}
    const diff = objectDifference(values, initialValues)
    const accountPatch = getPatch(diff)
    try {
      if (account) {
        await updateAccount({ nodeId, accountPatch })
      } else {
        const { data } = await createAccount({ accountPatch })
        const rowId = data.createAccount.account.personId
        history.replace('/accounts/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { account, initialValues } = this.props
    const { personId } = account || {}
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine && !!personId}
              message="Are you sure you want to leave?"
            />
            <Field
              name="personId"
              fkey='person'
              label="Person Id"
              component={SelectAdapter}
              type="text"
              placeholder="Select Person Id"
            />
            <Field
              name="passwordHash"
              label="Password Hash"
              component={InputAdapter}
              type="text"
              placeholder="Insert Password Hash"
            />
            <Field
              name="role"
              label="Role"
              component={InputAdapter}
              type="text"
              placeholder="Insert Role"
            />
            <Field
              name="login"
              label="Login"
              component={InputAdapter}
              type="text"
              placeholder="Insert Login"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!account ? 'Update' : 'Create'}
              </Button>
              <Button type="button" onClick={reset} disabled={pristine}>
                Reset
              </Button>
            </Box>
          </Card>
        )}
      />
    )
  }
}

const props = ({ data: { loading, error, account } }) => ({
  loading,
  error,
  account
})

const config = {
  options: ({
    match: {
      params: { account: id }
    }
  }) => ({
    variables: { id: Number(id), isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreateAccountForm = graphql(
  CREATE_ACCOUNT,
  mutateProp('createAccount', getInitValues('account'))
)(AccountForm)

export const UpdateAccountForm = compose(
  graphql(READ_ACCOUNT, config),
  graphql(UPDATE_ACCOUNT, mutateProp('updateAccount', getInitValues('account')))
)(AccountForm)
