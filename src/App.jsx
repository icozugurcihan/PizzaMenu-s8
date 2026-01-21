import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Order from "./pages/Order";
import Success from "./pages/Success";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/order" component={Order} />
      <Route path="/success" component={Success} />
    </Switch>
  );
}

export default App;
