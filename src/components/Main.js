
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { SigninPage, SignupPage } from 'components/sign'

import { PagePlaces } from 'tables/places/PagePlaces'
import { PageEvents } from 'tables/events/PageEvents'
import { PagePersonInGroups } from 'tables/person_in_groups/PagePersonInGroups'
import { PageTimetables } from 'tables/timetables/PageTimetables'
import { PageGroupOfPeople } from 'tables/group_of_people/PageGroupOfPeople'
import { PageEventMembers } from 'tables/event_members/PageEventMembers'
import { PageAccounts } from 'tables/accounts/PageAccounts'
import { PagePeople } from 'tables/people/PagePeople'

export const Main = () => (
  <Switch>
    <Route path="/places" render={PagePlaces} />
    <Route path="/events" render={PageEvents} />
    <Route path="/person_in_groups" render={PagePersonInGroups} />
    <Route path="/timetables" render={PageTimetables} />
    <Route path="/group_of_people" render={PageGroupOfPeople} />
    <Route path="/event_members" render={PageEventMembers} />
    <Route path="/accounts" render={PageAccounts} />
    <Route path="/people" render={PagePeople} />
    <Route path="/signin" render={SigninPage} />
    <Route path="/signup" component={SignupPage} />
  </Switch>
)  
  