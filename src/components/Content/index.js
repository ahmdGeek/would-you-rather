/**
Comoponent responsible to tender the bulj content of the page between header and footer
It contains switch component of differnt routes(views)
 */

import { Redirect, Route, Switch } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import { Leaderboard } from '../Leaderboard';
import { NewQuestion } from '../NewQuestion';
import { NotFound } from '../NotFound';
import { PrivateRoute } from '../PrivateRoute';
import { QuestionDetail } from '../QuestionDetail';

const Content = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />
    <PrivateRoute path="/dashboard"/*  component={Dashboard} */>
      <Dashboard />
    </PrivateRoute>
    <PrivateRoute path="/leaderboard"/*  component={Leaderboard} */>
      <Leaderboard />
    </PrivateRoute>
    <PrivateRoute path="/add">
      <NewQuestion />
    </PrivateRoute>
    <PrivateRoute path="/questions/:question_id">
      <QuestionDetail />
    </PrivateRoute>
    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Content;
export {
  Content,
};
