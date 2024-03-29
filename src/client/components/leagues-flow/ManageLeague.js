import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  ErrorAlert,
  InfoPopover,
  normalTransition,
  SuccessAlert,
  ValidatedInput,
} from "../shared";
import { useSelector } from "react-redux";
import ReactGA from "react-ga4";

export const ManageLeague = ({
  id,
  name,
  isPrivate,
  joinCode,
  lockDate,
  onClose,
  onSave,
}) => {
  const { user } = useSelector((state) => state.user);

  const [leagueName, setLeagueName] = useState(name);
  const [code, setCode] = useState(joinCode);
  const [closeDate, setCloseDate] = useState(lockDate);

  const [leagueNameError, setLeagueNameError] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!leagueName || leagueName.trim().length === 0) {
      setLeagueNameError("League name is required");
      return;
    } else setLeagueNameError(null);

    if (isPrivate && (!code || code.trim().length === 0)) {
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
              <div className="col-span-12">
                <ValidatedInput
                  inputName="League Code"
                  popoverInfo="This is the code that users must enter to join your league."
                  value={code}
                  setValue={setCode}
                  errorMsg={codeError}
                  disabled={!isPrivate}
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
                  <option value="2024-03-18T05:00:00-1700">March 18</option>
                  <option value="2024-03-19T05:00:00-1700">March 19</option>
                  <option value="2024-03-20T05:00:00-1700">March 20</option>
                  <option value="2024-03-21T05:00:00-1700">March 21</option>
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
