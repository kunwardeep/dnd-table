import React, { Component } from "react";
import "@atlaskit/css-reset";
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming";
import ZendeskTable from "./ZendeskTable";
import ZendeskTableDnd from "./ZendeskTableDnd";
import GenericZendeskTable from "./GenericZendeskTable";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/ZendeskTable">ZendeskTable</NavLink>
      <br />
      <NavLink to="/ZendeskTableDnd">ZendeskTableDnd</NavLink>
      <br />
      <NavLink to="/GenericZendeskTable">GenericZendeskTable</NavLink>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

const theme = {
  ...DEFAULT_THEME,
  // rtl: true,
};

class App extends Component {
  render() {
    return (
      <div style={{ padding: DEFAULT_THEME.space.md }}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <div>
              <Navigation />
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/ZendeskTable" component={ZendeskTable} />
                <Route path="/ZendeskTableDnd" component={ZendeskTableDnd} />
                <Route
                  path="/GenericZendeskTable"
                  component={GenericZendeskTable}
                />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}
export default App;

// ReactDOM.render(<App />, document.getElementById("root"));
