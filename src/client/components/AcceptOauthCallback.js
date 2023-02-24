import React, { useEffect } from "react";
import ReactGA from "react-ga4";

export const AcceptOauthCallback = ({ provider }) => {
  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      ReactGA.event("login", { method: provider });
      window.opener.postMessage(params + `&provider=${provider}`);
      window.close();
    }
  });
};
