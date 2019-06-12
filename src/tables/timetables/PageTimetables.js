
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListTimetables } from './ListTimetables'
  import { CreateTimetableForm, UpdateTimetableForm } from './TimetableForm'
  
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
  
  export const PageTimetables = ({ match }) => (
    <Page>
      <Route exact path="/timetables" component={ListTimetables} />
      <Route path={`${match.path}/:timetable`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreateTimetableForm} />
        <Route exact path={`${match.path}/:timetable`} component={UpdateTimetableForm} />
      </Switch>
    </Page>
  )  
  