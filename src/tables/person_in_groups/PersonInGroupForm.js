
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_PERSON_IN_GROUP, CREATE_PERSON_IN_GROUP, UPDATE_PERSON_IN_GROUP } from './queries'

class PersonInGroupForm extends Component {
  onSubmit = async values => {
    const { person_in_group, createPersonInGroup, updatePersonInGroup, history } = this.props
    const { nodeId,  ...initialValues } = person_in_group || {}
    const diff = objectDifference(values, initialValues)
    const person_in_groupPatch = getPatch(diff)
    try {
      if (person_in_group) {
        await updatePersonInGroup({ nodeId, person_in_groupPatch })
      } else {
        const { data } = await createPersonInGroup({ person_in_groupPatch })
        const rowId = data.createPersonInGroup.person_in_group.nodeId
        history.replace('/person_in_groups/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { person_in_group, initialValues } = this.props
    console.log('PersonInGroupForm', this.props)
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card is="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine}
              message="Are you sure you want to leave?"
            />
            <Field
              name="personId"
              fkey='person'
              label="Пользвоатель"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите пользователя"
            />
            <Field
              name="groupId"
              fkey='group_of_people'
              label="Группа пользователей"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите группу"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!person_in_group ? 'Обновить' : 'Создать'}
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

const props = ({ data: { loading, error, personInGroup } }) => ({
  loading,
  error,
  personInGroup
})

const config = {
  options: ({
    match: {
      params: { person_in_group: id }
    }
  }) => ({
    variables: { id, isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreatePersonInGroupForm = graphql(
  CREATE_PERSON_IN_GROUP,
  mutateProp('createPersonInGroup', getInitValues('personInGroup'))
)(PersonInGroupForm)

export const UpdatePersonInGroupForm = compose(
  graphql(READ_PERSON_IN_GROUP, config),
  graphql(UPDATE_PERSON_IN_GROUP, mutateProp('updatePersonInGroup', getInitValues('personInGroup'))),
)(PersonInGroupForm)
