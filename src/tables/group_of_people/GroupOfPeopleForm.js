
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_GROUP_OF_PEOPLE, CREATE_GROUP_OF_PEOPLE, UPDATE_GROUP_OF_PEOPLE } from './queries'

class GroupOfPeopleForm extends Component {
  onSubmit = async values => {
    const { group_of_people, createGroupOfPeople, updateGroupOfPeople, history } = this.props
    const { nodeId,  ...initialValues } = group_of_people || {}
    const diff = objectDifference(values, initialValues)
    const group_of_peoplePatch = getPatch(diff)
    try {
      if (group_of_people) {
        await updateGroupOfPeople({ nodeId, group_of_peoplePatch })
      } else {
        const { data } = await createGroupOfPeople({ group_of_peoplePatch })
        const rowId = data.createGroupOfPeople.group_of_people.id
        history.replace('/group_of_people/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { group_of_people, initialValues } = this.props
    const { id } = group_of_people || {}
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card as="form" flexDirection="column" onSubmit={handleSubmit}>
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
            <Field
              name="abbrName"
              label="Abbr Name"
              component={InputAdapter}
              type="text"
              placeholder="Insert Abbr Name"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!group_of_people ? 'Update' : 'Create'}
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

const props = ({ data: { loading, error, group_of_people } }) => ({
  loading,
  error,
  group_of_people
})

const config = {
  options: ({
    match: {
      params: { group_of_people: id }
    }
  }) => ({
    variables: { id: Number(id), isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreateGroupOfPeopleForm = graphql(
  CREATE_GROUP_OF_PEOPLE,
  mutateProp('createGroupOfPeople', getInitValues('group_of_people'))
)(GroupOfPeopleForm)

export const UpdateGroupOfPeopleForm = compose(
  graphql(READ_GROUP_OF_PEOPLE, config),
  graphql(UPDATE_GROUP_OF_PEOPLE, mutateProp('updateGroupOfPeople', getInitValues('group_of_people')))
)(GroupOfPeopleForm)
