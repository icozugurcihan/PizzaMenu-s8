import { Switch, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  const [order, setOrder] = useState(null);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/order">
        <Order setOrder={setOrder} />
      </Route>

      <Route path="/success">
        <Success order={order} />
      </Route>
    </Switch>
  );
}

export default App;
