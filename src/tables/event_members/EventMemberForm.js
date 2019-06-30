
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_EVENT_MEMBER, CREATE_EVENT_MEMBER, UPDATE_EVENT_MEMBER } from './queries'

class EventMemberForm extends Component {
  onSubmit = async values => {
    const { event_member, createEventMember, updateEventMember, history } = this.props
    const { nodeId,  ...initialValues } = event_member || {}
    const diff = objectDifference(values, initialValues)
    const event_memberPatch = getPatch(diff)
    try {
      if (event_member) {
        await updateEventMember({ nodeId, event_memberPatch })
      } else {
        const { data } = await createEventMember({ event_memberPatch })
        const rowId = data.createEventMember.event_member.nodeId
        history.replace('/event_members/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { eventMember, initialValues } = this.props
    return (
      <Form
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        subscription={subscription}
        render={({ handleSubmit, form: { reset }, submitting, pristine }) => (
          <Card as="form" flexDirection="column" onSubmit={handleSubmit}>
            <Prompt
              when={!pristine}
              message="Are you sure you want to leave?"
            />
            <Field
              name="eventId"
              fkey='event'
              label="Событие"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите событие"
            />
            <Field
              name="isModerator"
              label="Ведущие"
              component={InputAdapter}
              type="checkbox"
              placeholder="Введите true или false"
            />
            <Field
              name="participant"
              fkey='group_of_people'
              label="Группа участников"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите группу участников"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!eventMember ? 'Обновить' : 'Создать'}
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

const props = ({ data: { loading, error, eventMember } }) => ({
  loading,
  error,
  eventMember
})

const config = {
  options: ({
    match: {
      params: { event_member: id }
    }
  }) => ({
    variables: { id, isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreateEventMemberForm = graphql(
  CREATE_EVENT_MEMBER,
  mutateProp('createEventMember', getInitValues('eventMember'))
)(EventMemberForm)

export const UpdateEventMemberForm = compose(
  graphql(READ_EVENT_MEMBER, config),
  graphql(UPDATE_EVENT_MEMBER, mutateProp('updateEventMember', getInitValues('eventMember')))
)(EventMemberForm)
