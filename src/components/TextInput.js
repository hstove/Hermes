import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import * as colors from '../colors'
import { Paper } from './Paper'

const Input = styled.input.attrs({
  type: 'text'
})`
  font-size: 1em;
  border: 1px solid ${colors.grey};
  border-radius: 4px;
  width: 100%;
  padding: 0.5em 1em;

  &:focus {
    outline: none;
  }
`

const Outer = styled.div`
  font-size: 1em;
  margin: 0.75rem 0;
`

const Inner = styled(Paper)`
  ${props => props.fullWidth && css`
    display: flex;
    box-shadow: none;
  `}
`

const Label = styled.label`
  margin-bottom: 2px;
  font-size: 0.9rem;
  display: block;
`

export const TextInput = ({
  className,
  type = 'text',
  fullWidth,
  layer,
  label,
  unstyled,
  ...other
}) => (
  <Outer className={className} fullWidth={fullWidth}>
    { label ? <Label>{label}</Label> : null }
    <Inner layer={layer} fullWidth={fullWidth} unstyled={unstyled}>
      <Input type={type}
             fullWidth={fullWidth}
             {...other}/>
    </Inner>
  </Outer>
)
TextInput.propTypes = {
  type: PropTypes.string,
  layer: Paper.propTypes.layer,
  fullWidth: PropTypes.bool,
  block: PropTypes.bool
}
TextInput.defaultProps = {
  layer: 1
}
