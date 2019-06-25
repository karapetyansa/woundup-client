
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListPeople } from './ListPeople'
  import { CreatePersonForm, UpdatePersonForm } from './PersonForm'
  import { ListPersonInGroups } from 'tables/person_in_groups/ListPersonInGroups'
  import { ListAccounts } from 'tables/accounts/ListAccounts'
  
  const RefTabs = ({ match }) => (
    <Tabs
      is={Flex}
      my={2}
      borderColor="darken1"
      flexDirection={['column', 'row']}
    >
      <Tab is={NavLink} exact to={`${match.url}`}>
        Главная
      </Tab>
      <Tab is={NavLink} to={`${match.url}/person_in_groups`}>
        Участник групп
      </Tab> 
      <Tab is={NavLink} to={`${match.url}/accounts`}>
        Аккаунты
      </Tab> 
    </Tabs>
  )
  
  export const PagePeople = ({ match }) => (
    <Page>
      <Route exact path="/people" component={ListPeople} />
      <Route path={`${match.path}/:person`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreatePersonForm} />
        <Route exact path={`${match.path}/:person`} component={UpdatePersonForm} />
        <Route exact path={`${match.path}/:person/person_in_groups`} component={ListPersonInGroups} />
        <Route exact path={`${match.path}/:person/accounts`} component={ListAccounts} />
      </Switch>
    </Page>
  )  
  