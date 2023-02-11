import React, { useEffect } from "react";

export const AcceptOauthCallback = ({ provider }) => {
  useEffect(() => {
    const params = window.location.search;
    if (window.opener) {
      window.opener.postMessage(params + `&provider=${provider}`);
      window.close();
    }
  });
};
