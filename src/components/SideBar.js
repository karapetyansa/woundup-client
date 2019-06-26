import React, { Component, Fragment } from 'react'

import { NavLink, Tabs, Tab, Text } from 'ui'

export class SideBar extends Component {
  render() {
    return (
      <div>
        <Tabs
          style={{position:"sticky", top: 56}}
          flexDirection="column"
          borderRight={1}
          borderBottom={0}
          alignItems="stretch"
        >
          <Tab is={NavLink} mx={[0, 2]} to={'/places'}>
            <Text textAlign="left">Места</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/events'}>
            <Text textAlign="left">События</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/person_in_groups'}>
            <Text textAlign="left">Члены групп</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/timetables'}>
            <Text textAlign="left">Расписание</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/group_of_people'}>
            <Text textAlign="left">Группы пользователей</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/event_members'}>
            <Text textAlign="left">Участники</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/accounts'}>
            <Text textAlign="left">Аккаунты</Text>
          </Tab>
          <Tab is={NavLink} mx={[0, 2]} to={'/people'}>
            <Text textAlign="left">Пользователи</Text>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
