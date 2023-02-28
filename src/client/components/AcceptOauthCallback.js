import React, { useEffect } from "react";
import ReactGA from "react-ga4";

export const AcceptOauthCallback = ({ provider }) => {
  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      ReactGA.event({ action: "login", category: "user", label: provider });
      window.opener.postMessage(params + `&provider=${provider}`);
      window.close();
    }
  });
};
