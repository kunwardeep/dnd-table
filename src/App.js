import React, { Component } from "react";
import "@atlaskit/css-reset";
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming";
import ZendeskTable from "./ZendeskTable";
import ZendeskTableDnd from "./ZendeskTableDnd";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/ZendeskTable">ZendeskTable JS</NavLink>
      <br />
      <NavLink to="/ZendeskTableDnd">ZendeskTable TS</NavLink>
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
              <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/ZendeskTable" element={<ZendeskTable />} />
                <Route path="/ZendeskTableDnd" element={<ZendeskTableDnd />} />

                <Route component={Error} />
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    );
  }
}
export default App;

// ReactDOM.render(<App />, document.getElementById("root"));
