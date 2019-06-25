
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues, toNumber } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_EVENT, CREATE_EVENT, UPDATE_EVENT } from './queries'

class EventForm extends Component {
  onSubmit = async values => {
    const { event, createEvent, updateEvent, history } = this.props
    const { nodeId,  ...initialValues } = event || {}
    const diff = objectDifference(values, initialValues)
    const eventPatch = getPatch(diff)
    try {
      if (event) {
        await updateEvent({ nodeId, eventPatch })
      } else {
        const { data } = await createEvent({ eventPatch })
        const rowId = data.createEvent.event.id
        history.replace('/events/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { event, initialValues } = this.props
    const { id } = event || {}
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
              label="Название"
              component={InputAdapter}
              type="text"
              placeholder="Введите название"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!event ? 'Обновить' : 'Создать'}
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

const props = ({ data: { loading, error, event } }) => ({
  loading,
  error,
  event
})

const config = {
  options: ({
    match: {
      params: { event: id }
    }
  }) => ({
    variables: { id: toNumber(id), isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreateEventForm = graphql(
  CREATE_EVENT,
  mutateProp('createEvent', getInitValues('event'))
)(EventForm)

export const UpdateEventForm = compose(
  graphql(READ_EVENT, config),
  graphql(UPDATE_EVENT, mutateProp('updateEvent', getInitValues('event')))
)(EventForm)
