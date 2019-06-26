import React from 'react'
import { Button } from 'ui'
import deleteIcon from 'assets/deleteIcon.svg'
import createIcon from 'assets/createIcon.svg'
import refetchIcon from 'assets/refetchIcon.svg'
import editIcon from 'assets/editIcon.svg'

const buttonTypes = {
  delete: deleteIcon,
  create: createIcon,
  edit: editIcon,
  refetch: refetchIcon,
}

export const ActionButton = ({onClick, buttonType, ...rest}) => (
  <Button {...rest} mx={0} buttonStyle={'default'} onClick={onClick}>
    <img src={buttonTypes[buttonType]}></img>
  </Button>
)
