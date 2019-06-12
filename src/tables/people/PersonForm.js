
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_PERSON, CREATE_PERSON, UPDATE_PERSON } from './queries'

class PersonForm extends Component {
  onSubmit = async values => {
    const { person, createPerson, updatePerson, history } = this.props
    const { nodeId,  ...initialValues } = person || {}
    const diff = objectDifference(values, initialValues)
    const personPatch = getPatch(diff)
    try {
      if (person) {
        await updatePerson({ nodeId, personPatch })
      } else {
        const { data } = await createPerson({ personPatch })
        const rowId = data.createPerson.person.id
        history.replace('/people/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { person, initialValues } = this.props
    const { id } = person || {}
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine && !!id}
              message="Are you sure you want to leave?"
            />
            <Field
              name="name"
              label="Name"
              component={InputAdapter}
              type="text"
              placeholder="Insert Name"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!person ? 'Update' : 'Create'}
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

const props = ({ data: { loading, error, person } }) => ({
  loading,
  error,
  person
})

const config = {
  options: ({
    match: {
      params: { person: id }
    }
  }) => ({
    variables: { id, isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreatePersonForm = graphql(
  CREATE_PERSON,
  mutateProp('createPerson', getInitValues('person'))
)(PersonForm)

export const UpdatePersonForm = compose(
  graphql(READ_PERSON, config),
  graphql(UPDATE_PERSON, mutateProp('updatePerson', getInitValues('person')))
)(PersonForm)
