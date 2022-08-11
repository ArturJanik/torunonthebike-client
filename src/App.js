import React from 'react';
import { 
  Route,
  Switch
} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import { Map } from './containers/Map/Map';
import Document from './containers/Document/Document';

const routes = (
  <Switch>
    <Route exact path="/polityka-prywatnosci" render={ () => <Document show="privacy" /> } />
    <Route exact path="/o-projekcie" render={ () => <Document show="about" /> } />
    <Route component={ Map } />
  </Switch>
)

function App() {
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
