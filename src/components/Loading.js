import React from 'react'
import {
  CircularProgress,
} from '@material-ui/core'

export default function Loading({
  style = {},
}) {
  return (
      <div style={style}>
        <CircularProgress disableShrink style={{ alignContent: 'center' }} />
      </div>
  )
}
