
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListPersonInGroups } from './ListPersonInGroups'
  import { CreatePersonInGroupForm, UpdatePersonInGroupForm } from './PersonInGroupForm'
  
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
  
  export const PagePersonInGroups = ({ match }) => (
    <Page>
      <Route exact path="/person_in_groups" component={ListPersonInGroups} />
      <Route path={`${match.path}/:person_in_group`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreatePersonInGroupForm} />
        <Route exact path={`${match.path}/:person_in_group`} component={UpdatePersonInGroupForm} />
      </Switch>
    </Page>
  )  
  