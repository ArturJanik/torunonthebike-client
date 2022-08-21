import { 
  Route,
  Routes
} from 'react-router-dom';

import { Layout } from './wrappers/Layout/Layout';
import { Map } from './containers/Map/Map';
import { Document } from './containers/Document/Document';

const routes: JSX.Element = (
  <Routes>
    <Route path="polityka-prywatnosci" element={<Document show="privacy" />} />
    <Route path="o-projekcie" element={<Document show="about" />} />
    <Route path="/" element={<Map />} />
  </Routes>
);

function App(): JSX.Element {
  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
