import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import vi from "date-fns/locale/vi";
import enGB from "date-fns/locale/en-GB";
import { registerLocale } from "react-datepicker";

import * as serviceWorker from "./serviceWorker";

import store from "./stores/configureStore";
import App from "./containers/App";
import { UserProvider } from "./containers/LoginPage/context";
import { history } from "./utilities/history";

registerLocale("vi", vi);
registerLocale("en-GB", enGB);

(async (window) => {
  const rootEl = document.getElementById("root");

  const render = (Component, el) => {
    ReactDOM.render(
      <Provider store={store}>
        <UserProvider>
          <Component history={history} />
        </UserProvider>
      </Provider>,
      el,
    );
  };

  render(App, rootEl);
})(window);

serviceWorker.unregister();
