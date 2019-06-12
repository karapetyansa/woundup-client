
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListEventMembers } from './ListEventMembers'
  import { CreateEventMemberForm, UpdateEventMemberForm } from './EventMemberForm'
  
  const RefTabs = ({ match }) => (
    <Tabs
      is={Flex}
      my={2}
      borderColor="darken1"
      flexDirection={['column', 'row']}
    >
      <Tab is={NavLink} exact to={`${match.url}`}>
        Main
      </Tab>
    </Tabs>
  )
  
  export const PageEventMembers = ({ match }) => (
    <Page>
      <Route exact path="/event_members" component={ListEventMembers} />
      <Route path={`${match.path}/:event_member`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreateEventMemberForm} />
        <Route exact path={`${match.path}/:event_member`} component={UpdateEventMemberForm} />
      </Switch>
    </Page>
  )  
  