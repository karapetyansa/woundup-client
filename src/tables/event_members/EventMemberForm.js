
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
    const { event_member, initialValues } = this.props
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
              name="eventId"
              fkey='event'
              label="Event Id"
              component={SelectAdapter}
              type="text"
              placeholder="Select Event Id"
            />
            <Field
              name="participant"
              fkey='person'
              label="Participant"
              component={SelectAdapter}
              type="text"
              placeholder="Select Participant"
            />
            <Field
              name="moderator"
              fkey='person'
              label="Moderator"
              component={SelectAdapter}
              type="text"
              placeholder="Select Moderator"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!event_member ? 'Update' : 'Create'}
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

const props = ({ data: { loading, error, event_member } }) => ({
  loading,
  error,
  event_member
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
  mutateProp('createEventMember', getInitValues('event_member'))
)(EventMemberForm)

export const UpdateEventMemberForm = compose(
  graphql(READ_EVENT_MEMBER, config),
  graphql(UPDATE_EVENT_MEMBER, mutateProp('updateEventMember', getInitValues('event_member')))
)(EventMemberForm)
