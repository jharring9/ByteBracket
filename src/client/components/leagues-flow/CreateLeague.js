import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ErrorAlert,
  InfoPopover,
  LoadingWrapper,
  ValidatedInput,
} from "../shared";
import ReactGA from "react-ga4";
import { Helmet } from "react-helmet";

export const CreateLeague = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [maxEntriesPerUser, setMaxEntriesPerUser] = useState(1);
  const [code, setCode] = useState("");
  const [closeDate, setCloseDate] = useState("2023-03-16T05:00:00-1700");

  const [nameError, setNameError] = useState(null);
  const [maxEntriesPerUserError, setMaxEntriesPerUserError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim().length === 0) {
      setNameError("League name is required");
      return;
    } else setNameError(null);

    if (!maxEntriesPerUser || maxEntriesPerUser < 1) {
      setMaxEntriesPerUserError("Must be greater than 0");
      return;
    } else setMaxEntriesPerUserError(null);

    if (!code || code.trim().length === 0) {
      setCodeError("Join code is required");
      return;
    } else setCodeError(null);

    const response = await fetch("/v1/league", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        entriesPerUser: maxEntriesPerUser,
        code,
        lockDate: closeDate,
      }),
    });
    if (response.ok) {
      ReactGA.event({ action: "createleague", category: "league" });
      const { id } = await response.json();
      navigate(`/leagues/${id}`);
    } else {
      const { error } = await response.json();
      setError(error);
    }
  };

  return (
    <>
      <Helmet title="Create League - ByteBracket" />
      <LoadingWrapper>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1
              className="text-center text-7xl text-indigo-700"
              style={{ fontFamily: "loveloBold" }}
            >
              B
            </h1>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a League
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/leagues"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                join a public league
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                {error && (
                  <ErrorAlert
                    className="mb-6"
                    header="Error logging in"
                    message={error}
                  />
                )}
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12">
                    <ValidatedInput
                      inputName="League Name"
                      popoverInfo="The name of the league that will be displayed to users."
                      value={name}
                      setValue={setName}
                      errorMsg={nameError}
                    />
                  </div>
                  <div className="col-span-12">
                    <ValidatedInput
                      inputName="Entries Allowed per User"
                      type="number"
                      popoverInfo="The total number of entries allowed per user in the league."
                      value={maxEntriesPerUser}
                      setValue={setMaxEntriesPerUser}
                      errorMsg={maxEntriesPerUserError}
                    />
                  </div>
                  <div className="col-span-12">
                    <ValidatedInput
                      inputName="Join Code"
                      popoverInfo="This is the code that users must enter to join your league. Only applies to private leagues."
                      value={code}
                      setValue={setCode}
                      errorMsg={codeError}
                    />
                  </div>
                  <div className="col-span-12">
                    <InfoPopover
                      name="League Lock Date"
                      details="Final date that users will be able to add/remove entries. After this date, other users' brackets will be viewable."
                    />
                    <select
                      id="lockDate"
                      value={closeDate}
                      onChange={(e) => setCloseDate(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                    >
                      <option value="2025-03-18T12:30:00-0400">March 18</option>
                      <option value="2025-03-19T12:30:00-0400">March 19</option>
                      <option value="2025-03-20T12:00:00-0400">March 20</option>
                    </select>
                  </div>
                </div>

                <div>
                  <button
                    onClick={onSubmit}
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LoadingWrapper>
    </>
  );
};
