
  import React from 'react'
  import { Route, Switch } from 'react-router-dom'
  
  import { Page, Flex, Tabs, Tab, NavLink } from 'ui'
  import { ListAccounts } from './ListAccounts'
  import { CreateAccountForm, UpdateAccountForm } from './AccountForm'
  
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
  
  export const PageAccounts = ({ match }) => (
    <Page>
      <Route exact path="/accounts" component={ListAccounts} />
      <Route path={`${match.path}/:account`} component={RefTabs} />
      <Switch>
        <Route exact path={`${match.path}/create`} component={CreateAccountForm} />
        <Route exact path={`${match.path}/:account`} component={UpdateAccountForm} />
      </Switch>
    </Page>
  )  
  