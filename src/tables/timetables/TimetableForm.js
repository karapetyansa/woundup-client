
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues, toNumber } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_TIMETABLE, CREATE_TIMETABLE, UPDATE_TIMETABLE } from './queries'

class TimetableForm extends Component {
  onSubmit = async values => {
    const { timetable, createTimetable, updateTimetable, history } = this.props
    const { nodeId,  ...initialValues } = timetable || {}
    const diff = objectDifference(values, initialValues)
    const timetablePatch = getPatch(diff)
    try {
      if (timetable) {
        await updateTimetable({ nodeId, timetablePatch })
      } else {
        const { data } = await createTimetable({ timetablePatch })
        const rowId = data.createTimetable.timetable.id
        history.replace('/timetables/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { timetable, initialValues } = this.props
    const { id } = timetable || {}
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
              name="eventId"
              fkey='event'
              label="Событие"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите событие"
            />
            <Field
              name="placeId"
              fkey='place'
              label="Место проведения"
              component={SelectAdapter}
              type="text"
              placeholder="Выберите место проведения"
            />
            <Field
              name="startTime"
              label="Начало"
              component={InputAdapter}
              type="datetime-local"
              placeholder="Введите время начала"
            />
            <Field
              name="endTime"
              label="Окончание"
              component={InputAdapter}
              type="datetime-local"
              placeholder="Введите время окончания"
            />
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!timetable ? 'Обновить' : 'Создать'}
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

const props = ({ data: { loading, error, timetable } }) => ({
  loading,
  error,
  timetable
})

const config = {
  options: ({
    match: {
      params: { timetable: id }
    }
  }) => ({
    variables: { id: toNumber(id), isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreateTimetableForm = graphql(
  CREATE_TIMETABLE,
  mutateProp('createTimetable', getInitValues('timetable'))
)(TimetableForm)

export const UpdateTimetableForm = compose(
  graphql(READ_TIMETABLE, config),
  graphql(UPDATE_TIMETABLE, mutateProp('updateTimetable', getInitValues('timetable')))
)(TimetableForm)
