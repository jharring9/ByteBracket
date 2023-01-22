import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "../../public/assets/index.css";

export const mockTableData = [];
for (let i = 0; i < 25; i++) {
  let apRank = Math.floor(Math.random() * 25) + 1;
  mockTableData.push({
    team: `Team ${i + 1}`,
    rank: i + 1,
    apRank: apRank,
    diff: apRank - (i + 1),
  });
}
export let biggestMovers = [...mockTableData].sort((a, b) => {
  return Math.abs(a.diff) - Math.abs(b.diff);
});
biggestMovers = biggestMovers.slice(-5);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
