
  import React, { Component } from 'react'
  
  import { NavLink, Tabs, Tab, Text } from 'ui'
  
  export class SideBar extends Component {

    render() {
      return (
        <Tabs
          flexDirection="column"
          borderRight={1}
          borderBottom={0}
          alignItems="stretch"
      >
          <Tab is={NavLink} mx={[0, 2]} to={'/places'}>
            <Text textAlign="left">Places</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/events'}>
            <Text textAlign="left">Events</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/person_in_groups'}>
            <Text textAlign="left">Person In Groups</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/timetables'}>
            <Text textAlign="left">Timetables</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/group_of_people'}>
            <Text textAlign="left">Group Of People</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/event_members'}>
            <Text textAlign="left">Event Members</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/accounts'}>
            <Text textAlign="left">Accounts</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/people'}>
            <Text textAlign="left">People</Text>
          </Tab>
        </Tabs>
      )
    }
  }  
  