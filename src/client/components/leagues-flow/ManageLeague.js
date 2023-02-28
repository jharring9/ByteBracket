import React, { useEffect, useState } from "react";
import { Switch, Transition } from "@headlessui/react";
import {
  ErrorAlert,
  normalTransition,
  SuccessAlert,
  ValidatedInput,
} from "../shared";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";

export const ManageLeague = ({
  id,
  name,
  max,
  maxPerUser,
  isPrivate,
  entries,
  joinCode,
  lockDate,
  onClose,
  onSave,
}) => {
  const { user } = useSelector((state) => state.user);

  const [leagueName, setLeagueName] = useState(name);
  const [maxEntries, setMaxEntries] = useState(max);
  const [maxEntriesPerUser, setMaxEntriesPerUser] = useState(maxPerUser);
  const [isPublic, setIsPublic] = useState(!isPrivate);
  const [code, setCode] = useState(joinCode);
  const [closeDate, setCloseDate] = useState(lockDate);

  const [leagueNameError, setLeagueNameError] = useState(null);
  const [maxEntriesError, setMaxEntriesError] = useState(null);
  const [maxEntriesPerUserError, setMaxEntriesPerUserError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!leagueName || leagueName.trim().length === 0) {
      setLeagueNameError("League name is required");
      return;
    } else setLeagueNameError(null);

    if (!maxEntries || maxEntries < 1) {
      setMaxEntriesError("Max entries must be greater than 0");
      return;
    } else if (maxEntries > 100) {
      setMaxEntriesError("Max entries cannot be greater than 100");
      return;
    } else if (maxEntries < entries) {
      setMaxEntriesError("Max entries cannot be less than current entries");
      return;
    } else setMaxEntriesError(null);

    if (!maxEntriesPerUser || maxEntriesPerUser < 1) {
      setMaxEntriesPerUserError("Max entries per user must be greater than 0");
      return;
    } else setMaxEntriesPerUserError(null);

    if (!isPublic && (!code || code.trim().length === 0)) {
      setCodeError("League code is required for private leagues");
      return;
    } else setCodeError(null);

    const result = await fetch(`/v1/league/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: leagueName,
        maxEntries: maxEntries,
        entriesPerUser: maxEntriesPerUser,
        isPrivate: !isPublic,
        lockDate: closeDate,
        code: code,
      }),
    });
    if (result.ok) {
      ReactGA.event({ action: "modifyleague", category: "league" });
      setSuccess(true);
      onSave();
      return;
    }
    const { error } = await result.json();
    setError(error);
  };

  useEffect(() => {
    if (!user.username) {
      onClose();
    }
  }, [user]);

  return (
    <main className="pt-8 pb-16">
      <div className="max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Modify League Settings
          </h2>
        </div>

        <form className="divide-y divide-gray-200 lg:col-span-9">
          <div className="py-6 px-4 sm:p-6 lg:pb-8">
            <Transition as="div" show={success}>
              <SuccessAlert
                setOpen={setSuccess}
                message="League settings have been updated."
              />
            </Transition>
            <Transition as="div" show={!!error} {...normalTransition}>
              <ErrorAlert
                header="Error updating league settings"
                message={error}
              />
            </Transition>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <ValidatedInput
                  inputName="League Name"
                  value={leagueName}
                  setValue={setLeagueName}
                  errorMsg={leagueNameError}
                />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <ValidatedInput
                  inputName="Max Entries"
                  type="number"
                  value={maxEntries}
                  setValue={setMaxEntries}
                  errorMsg={maxEntriesError}
                />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <ValidatedInput
                  inputName="Max Entries per User"
                  type="number"
                  value={maxEntriesPerUser}
                  setValue={setMaxEntriesPerUser}
                  errorMsg={maxEntriesPerUserError}
                />
              </div>
              <div className="col-span-4 flex items-center justify-center sm:col-span-4">
                <div>
                  <label
                    htmlFor="isPublic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Publicly joinable
                  </label>
                  <Switch
                    name="isPublic"
                    checked={isPublic}
                    onChange={setIsPublic}
                    className={`${isPublic ? "bg-indigo-700" : "bg-indigo-200"}
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
              <div className="col-span-8 sm:col-span-6">
                <ValidatedInput
                  inputName="League Code"
                  popoverInfo="This is the code that users must enter to join your league."
                  value={code}
                  setValue={setCode}
                  errorMsg={codeError}
                  disabled={isPublic}
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
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
          </div>
          <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
            <button
              type="reset"
              onClick={onClose}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
