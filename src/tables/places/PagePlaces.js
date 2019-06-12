
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListPlaces } from './ListPlaces'
  import { CreatePlaceForm, UpdatePlaceForm } from './PlaceForm'
  import { ListTimetables } from 'tables/timetables/ListTimetables'
  
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
      <Tab is={NavLink} to={`${match.url}/timetables`}>
        Timetables
      </Tab> 
    </Tabs>
  )
  
  export const PagePlaces = ({ match }) => (
    <Page>
      <Route exact path="/places" component={ListPlaces} />
      <Route path={`${match.path}/:place`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreatePlaceForm} />
        <Route exact path={`${match.path}/:place`} component={UpdatePlaceForm} />
        <Route exact path={`${match.path}/:place/timetables`} component={ListTimetables} />
      </Switch>
    </Page>
  )  
  