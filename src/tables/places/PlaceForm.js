
import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { Form, Field } from 'react-final-form'
import { Prompt } from 'react-router'

import { objectDifference, getPatch, getInitValues, toNumber } from 'utils'
import { required, subscription, SelectAdapter, InputAdapter } from 'ui/utils'
import { Box, Card, Button } from 'ui'
import { mutateProp } from 'apollo/helpers'
import { READ_PLACE, CREATE_PLACE, UPDATE_PLACE } from './queries'

class PlaceForm extends Component {
  onSubmit = async values => {
    const { place, createPlace, updatePlace, history } = this.props
    const { nodeId,  ...initialValues } = place || {}
    const diff = objectDifference(values, initialValues)
    const placePatch = getPatch(diff)
    try {
      if (place) {
        await updatePlace({ nodeId, placePatch })
      } else {
        const { data } = await createPlace({ placePatch })
        const rowId = data.createPlace.place.id
        history.replace('/places/' + rowId)
      }
    } catch (error) {
      console.log('there was an error sending the query', error)
    }
  }

  render() {
    const { place, initialValues } = this.props
    const { id } = place || {}
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
            <Box>
              <Button type="submit" disabled={submitting}>
                {!!place ? 'Обновить' : 'Создать'}
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

const props = ({ data: { loading, error, place } }) => ({
  loading,
  error,
  place
})

const config = {
  options: ({
    match: {
      params: { place: id }
    }
  }) => ({
    variables: { id: toNumber(id), isList: false },
    fetchPolicy: 'cache-and-network'
  }),
  props
}

export const CreatePlaceForm = graphql(
  CREATE_PLACE,
  mutateProp('createPlace', getInitValues('place'))
)(PlaceForm)

export const UpdatePlaceForm = compose(
  graphql(READ_PLACE, config),
  graphql(UPDATE_PLACE, mutateProp('updatePlace', getInitValues('place')))
)(PlaceForm)
