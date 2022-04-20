import React from "react";
import './App.css';
import Layout from "./Layouts";
import Home from "./Components/Home";
import Client from "./Components/ClientHome";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme/theme";
import { Route, Switch } from "react-router";
import TicketLibrary from "./Components/TicketLibrary";
import Login from "./Components/Login";
import Sso from "./Components/Login/SSO";
import KnowlegeBase from "./Components/Knowledgebase";
import Setting from "./Components/Settings"
import ClientInfo from "./Components/ClientInfo"
import Ticket from "./Components/Ticket"
import AddTicket from "./Components/AddTicket"
import AdminTicket from "./Components/AdminTicket";
import Project from "./Components/Project";
import Article from "./Components/Article";
import Employee from "./Components/Employee"
import User from "./Components/User"
import TicketDetail from "./Components/TicketDetail"
import Profile from "./Components/Drawer/Profile"
import Notification from "./Components/Drawer/ViewNotification"
import NotFound from "./Components/NotFound"
import TicketOverview from "./Components/TicketOverview/TicketOverview"
import TicketOverviewDetail from "./Components/TicketOverview/TicketOverview_Detail"
import FAQ from "./Components/FAQ"
import KnowledgeBasedetail from "./Components/Knowledgebase/Knowledgebase_detail";
import ClientLibrary from "./Components/ClientTicketLibrary"
import axios from 'axios';
axios.defaults.baseURL = "http://172.25.16.100:8000/"
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        {/* //<Route path="*"  exact component={NotFound} /> */}
        <Route path="/login" exact component={Login} />

        <Route path="/sso" exact component={Sso} />
        <Layout>
          <Route path="/" exact component={Home} />
          <Route
            path="/ClientHome/:clientid/:userId"
            exact
            component={Client}
          />
          <Route path="/client/:id" component={ClientInfo} />
          <Route path="/library" component={TicketLibrary} />
          <Route path="/Clientlibrary/:clientid" component={ClientLibrary} />
          <Route path="/knowlegebase" component={KnowlegeBase} />
          <Route path="/setting" component={Setting} />
          <Route path="/ticket/:clientid/:userId/:id" component={Ticket} />
          <Route path="/Clientticket/:clientid/:userId" component={AddTicket} />
          <Route path="/adminticket/:id" component={AdminTicket} />
          <Route path="/project/:id" component={Project} />
          <Route path="/article" component={Article} />
          <Route path="/employee" component={Employee} />
          <Route path="/user" component={User} />
          <Route path="/profile/:clientid/:userId" component={Profile} />
          <Route path="/ticketdetail/:id" component={TicketDetail} />
          <Route path="/notification" component={Notification} />
          <Route path="/Notfound" component={NotFound} />
          <Route path="/ticketoverview" component={TicketOverview} />
          <Route
            path="/ticketoverviews/detail/:id"
            component={TicketOverviewDetail}
          />
          <Route path="/faq" component={FAQ} />
          <Route
            path="/knowlegebases/detail/:id"
            component={KnowledgeBasedetail}
          />
        </Layout>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
