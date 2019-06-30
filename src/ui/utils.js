import React, { Fragment } from 'react'
import { Field } from 'react-final-form'
import { Link } from 'react-router-dom'

import { SelectionField } from 'components'
import { Input, Label, Flex } from 'ui'
import { ActionButton } from 'components/Buttons'

// const small = 32767
// const normal = 2147483647
// const big = 9223372036854775807

// const tfPgTypes = {
//   TIMESTAMP: { type: 'datetime-local' },
//   TIMESTAMP_WITH_TIME_ZONE: { type: 'datetime-local' },
//   DATE: { type: 'date' },
//   TIME: { type: 'time' },
//   TIME_WITH_TIME_ZONE: { type: 'time' },
//   SMALLINT: { type: 'number', min: -small - 1, max: small },
//   INTEGER: { type: 'number', min: -normal - 1, max: normal },
//   BIGINT: { type: 'number', min: -big - 1, max: big },
//   NUMERIC: { type: 'number' },
//   REAL: { type: 'number' },
//   DOUBLE_PRECISION: { type: 'number' },
//   SMALLSERIAL: { type: 'number', min: 1, max: small },
//   SERIAL: { type: 'number', min: 1, max: normal },
//   BIGSERIAL: { type: 'number', min: 1, max: big },
//   VARCHAR: { type: 'text' },
//   CHAR: { type: 'text' },
//   TEXT: { type: 'text' },
//   BOOLEAN: { type: 'checkbox' },
//   INET: { type: 'text' },
//   CIDR: { type: 'text' },
//   MACADDR: { type: 'text' },
//   MACADDR8: { type: 'text' }
// }

export const SelectAdapter = ({ input, meta, ...rest }) => (
  <Flex flexDirection="row">
    <SelectionField {...input} defaultValue={meta.initial} {...rest} />
    <ActionButton
      is={Link}
      buttonType="edit"
      mx={0}
      to={
        '/' +
        rest.table +
        '/' +
        (input.value.value ? input.value.value : 'create')
      }
    />
  </Flex>
)

export const InputAdapter = ({ input, label, meta, placeholder }) => (
  <Fragment>
    <Label>{label}</Label>
    <Input {...input} placeholder={placeholder} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </Fragment>
)

export const required = value => (value ? undefined : 'Required')

export const subscription = { submitting: true, pristine: true }

export const renderInput = (name, label, placeholder, type = 'text') => (
  <Field
    name={name}
    label={label}
    validate={required}
    component={InputAdapter}
    type={type}
    placeholder={placeholder}
  />
)
