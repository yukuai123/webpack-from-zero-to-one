import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "~/routes/Home";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
);

render(<App />, document.getElementById("root"));
