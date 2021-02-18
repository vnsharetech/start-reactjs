import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { IntlProvider } from "react-intl";
import { useSelector } from "react-redux";
import { setDefaultLocale } from "react-datepicker";

import { useUserState } from "../LoginPage/context";

// ###
import AppLocale from "../../i18n";

import LoginPage from "../LoginPage";

const AdminLayout = React.lazy(() => import("../Admin"));

export default function App(props) {
  const { isAuthenticated } = useUserState();

  const languageState = useSelector((state) => state.language);
  const { locale } = languageState;

  if (locale === "NL") {
    setDefaultLocale("nl");
  } else {
    setDefaultLocale("en-GB");
  }

  const currentAppLocale = AppLocale[locale];

  return (
    <ConnectedRouter history={props.history}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
       
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={AdminLayout} />
          </Switch>
       
      </IntlProvider>
    </ConnectedRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...options }) {
    const finalComponent = isAuthenticated ? component : LoginPage;
    return <Route {...options} component={finalComponent} />;
  }
}
