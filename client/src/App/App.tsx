import React from 'react';
import { NsReactForm } from 'netsuite-react';
import { getReactFormRows } from 'domain/nsReactFormElements';
import * as clientActions from 'domain/nsReactClientActions';

const App = () => {
  return (
    <NsReactForm
      header="Snoosweek Demo App"
      subheader="See what NetSuite-React can do for you!"
      rows={getReactFormRows()}
      clientActions={clientActions}
    />
  );
};

export default App;
