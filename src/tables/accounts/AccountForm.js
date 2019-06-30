import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues, toNumber } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_ACCOUNT, CREATE_ACCOUNT, UPDATE_ACCOUNT } from './queries'

class AccountForm extends Component {
  onSubmit = async values => {
    const { account, createAccount, updateAccount, history } = this.props
    const { nodeId, ...initialValues } = account || {}
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
          <Card as="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine && !!personId}
              message="Are you sure you want to leave?"
            />
            <Field
              name="personId"
              fkey="person"
              table="people"
              label="Имя пользователя"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите имя"
            />
            <Field
              name="role"
              label="Роль"
              component={InputAdapter}
              type="text"
              placeholder="Введите роль"
            />
            <Field
              name="login"
              label="Логин"
              component={InputAdapter}
              type="text"
              placeholder="Введите логин"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!account ? 'Обновить' : 'Создать'}
              </Button>
              <Button type="button" onClick={reset} disabled={pristine}>
                Сбросить
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
    variables: { id: toNumber(id), isList: false },
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
