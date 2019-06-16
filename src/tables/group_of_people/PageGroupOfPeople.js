
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListGroupOfPeople } from './ListGroupOfPeople'
  import { CreateGroupOfPeopleForm, UpdateGroupOfPeopleForm } from './GroupOfPeopleForm'
  import { ListPersonInGroups } from 'tables/person_in_groups/ListPersonInGroups'
  import { ListEventMembers } from 'tables/event_members/ListEventMembers'
  
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
      <Tab is={NavLink} to={`${match.url}/person_in_groups`}>
        Person In Groups
      </Tab> 
      <Tab is={NavLink} to={`${match.url}/event_members`}>
        Event Members
      </Tab> 
    </Tabs>
  )
  
  export const PageGroupOfPeople = ({ match }) => (
    <Page>
      <Route exact path="/group_of_people" component={ListGroupOfPeople} />
      <Route path={`${match.path}/:group_of_people`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreateGroupOfPeopleForm} />
        <Route exact path={`${match.path}/:group_of_people`} component={UpdateGroupOfPeopleForm} />
        <Route exact path={`${match.path}/:group_of_people/person_in_groups`} component={ListPersonInGroups} />
        <Route exact path={`${match.path}/:group_of_people/event_members`} component={ListEventMembers} />
      </Switch>
    </Page>
  )  
  