import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as colors from '../colors'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'

const Layout = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  background-color: ${colors.white};
`

const MainOutletContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MainOutlet = styled.div`
  flex-grow: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const AppView = ({
  onSignOut,
  sidebarContent,
  children
}) => (
  <Layout>
    <Sidebar title="dchat">
      {sidebarContent ? sidebarContent : null}
    </Sidebar>
    <MainOutletContainer>
      <TopNav onSignOut={onSignOut}/>
      <MainOutlet>
        {children}
      </MainOutlet>
    </MainOutletContainer>
  </Layout>
)

AppView.propTypes = {
  renderSidebar: PropTypes.func,
  onSignOut: PropTypes.func
}