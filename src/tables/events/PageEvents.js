
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListEvents } from './ListEvents'
  import { CreateEventForm, UpdateEventForm } from './EventForm'
  import { ListTimetables } from 'tables/timetables/ListTimetables'
  import { ListEventMembers } from 'tables/event_members/ListEventMembers'
  
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
      <Tab is={NavLink} to={`${match.url}/timetables`}>
        Расписание
      </Tab> 
      <Tab is={NavLink} to={`${match.url}/event_members`}>
        Участники
      </Tab> 
    </Tabs>
  )
  
  export const PageEvents = ({ match }) => (
    <Page>
      <Route exact path="/events" component={ListEvents} />
      <Route path={`${match.path}/:event`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreateEventForm} />
        <Route exact path={`${match.path}/:event`} component={UpdateEventForm} />
        <Route exact path={`${match.path}/:event/timetables`} component={ListTimetables} />
        <Route exact path={`${match.path}/:event/event_members`} component={ListEventMembers} />
      </Switch>
    </Page>
  )  
  