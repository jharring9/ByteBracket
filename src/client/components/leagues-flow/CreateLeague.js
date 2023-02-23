import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { ErrorAlert, LoadingWrapper, ValidatedInput } from "../shared";
import { Switch } from "@headlessui/react";

export const CreateLeague = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [maxEntries, setMaxEntries] = useState(25);
  const [maxEntriesPerUser, setMaxEntriesPerUser] = useState(1);
  const [isPublic, setIsPublic] = useState(true);
  const [code, setCode] = useState("");
  const [closeDate, setCloseDate] = useState("2023-03-16T05:00:00-0600");

  const [nameError, setNameError] = useState(null);
  const [maxEntriesError, setMaxEntriesError] = useState(null);
  const [maxEntriesPerUserError, setMaxEntriesPerUserError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim().length === 0) {
      setNameError("League name is required");
      return;
    } else setNameError(null);

    if (!maxEntries || maxEntries < 1) {
      setMaxEntriesError("Must be greater than 0");
      return;
    } else if (maxEntries > 100) {
      setMaxEntriesError("Cannot be greater than 100");
      return;
    } else setMaxEntriesError(null);

    if (!maxEntriesPerUser || maxEntriesPerUser < 1) {
      setMaxEntriesPerUserError("Must be greater than 0");
      return;
    } else setMaxEntriesPerUserError(null);

    if (!isPublic && (!code || code.trim().length === 0)) {
      setCodeError("Required for private leagues");
      return;
    } else setCodeError(null);

    const response = await fetch("/v1/league", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        maxEntries,
        entriesPerUser: maxEntriesPerUser,
        isPrivate: !isPublic,
        code,
        lockDate: closeDate,
      }),
    });
    if (response.ok) {
      const { id } = await response.json();
      navigate(`/leagues/${id}`);
    } else {
      const { error } = await response.json();
      setError(error);
    }
  };

  useEffect(() => {
    document.title = "Create League - ByteBracket";
  }, [])

  return (
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
                <div className="col-span-12 sm:col-span-6">
                  <ValidatedInput
                    inputName="Max Entries"
                    type="number"
                    popoverInfo="The maximum total number of entries allowed in the league."
                    value={maxEntries}
                    setValue={setMaxEntries}
                    errorMsg={maxEntriesError}
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <ValidatedInput
                    inputName="Entries Allowed per User"
                    type="number"
                    popoverInfo="The total number of entries allowed per user in the league."
                    value={maxEntriesPerUser}
                    setValue={setMaxEntriesPerUser}
                    errorMsg={maxEntriesPerUserError}
                  />
                </div>
                <div className="col-span-4">
                  <div>
                    <label
                      htmlFor="isPublic"
                      className="mt-1 block text-sm font-medium text-gray-700"
                    >
                      Publicly joinable
                    </label>
                    <Switch
                      name="isPublic"
                      checked={isPublic}
                      onChange={setIsPublic}
                      className={`${
                        isPublic ? "bg-indigo-700" : "bg-indigo-200"
                      }
          relative mt-1 inline-flex h-[37px] w-[81px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                      <span
                        aria-hidden="true"
                        className={`${
                          isPublic ? "translate-x-11" : "translate-x-0"
                        }
            pointer-events-none inline-block h-[33px] w-[33px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                </div>
                <div className="col-span-8">
                  <ValidatedInput
                    inputName="Join Code"
                    popoverInfo="This is the code that users must enter to join your league. Only applies to private leagues."
                    value={code}
                    setValue={setCode}
                    errorMsg={codeError}
                    disabled={isPublic}
                  />
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="lockDate"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    League Lock Date
                  </label>
                  <select
                    id="lockDate"
                    value={closeDate}
                    onChange={(e) => setCloseDate(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-700 focus:ring-indigo-700"
                  >
                    <option value="2023-03-13T05:00:00-0600">March 13</option>
                    <option value="2023-03-14T05:00:00-0600">March 14</option>
                    <option value="2023-03-15T05:00:00-0600">March 15</option>
                    <option value="2023-03-16T05:00:00-0600">March 16</option>
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
  );
};
