import React, { Component } from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DEFAULT_THEME, ThemeProvider } from "@zendeskgarden/react-theming";
import ZendeskTable from "./ZendeskTable";
import ZendeskTableDnd from "./ZendeskTableDnd";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <NavLink to="/ZendeskTable">ZendeskTable</NavLink>
      <br />
      <NavLink to="/ZendeskTableDnd">ZendeskTableDnd</NavLink>
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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/ZendeskTable" component={ZendeskTable} />
            <Route path="/ZendeskTableDnd" component={ZendeskTableDnd} />
            <Route component={Error} />
          </Switch>
          <Navigation />
        </div>
      </BrowserRouter>
    );
  }
}
// class App extends React.Component {
//   render() {
//     return (
//       <div style={{ padding: DEFAULT_THEME.space.md }}>
//         <ThemeProvider>
//           <BrowserRouter>
//             <div>
//               <Navigation />
//               <Switch>
//                 {/* <Route path="/" component={HomePage} exact /> */}
//                 <Route path="/ZendeskTable" component={ZendeskTable} />
//                 <Route path="/ZendeskTableDnd" component={ZendeskTableDnd} />
//                 <Route component={Error} />
//               </Switch>
//             </div>
//           </BrowserRouter>
//           {/* <ZendeskTable />
//           <ZendeskTableDnd /> */}
//         </ThemeProvider>
//       </div>
//     );
//   }
// }
export default App;

// ReactDOM.render(<App />, document.getElementById("root"));
