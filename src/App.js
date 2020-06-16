import React from 'react';

import Layout from './container/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
