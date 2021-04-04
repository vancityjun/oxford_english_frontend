import React, { useState } from 'react'
import Button from './Button'
import TooltipMenu from './TooltipMenu'
import styled from 'styled-components/native'

const TooltipButton = ({menu, buttonTitle = '...'}) => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <Wrap>
      <Button
        onPress={() => setOpenMenu(!openMenu)}
        title={buttonTitle}
        // onBlur={() => setOpenMenu(false)}
      />
      {openMenu &&
        <TooltipMenu menu={menu} />
      }
    </Wrap>
  )
}

const Wrap = styled.View`
  position: relative
`

export default TooltipButton;
