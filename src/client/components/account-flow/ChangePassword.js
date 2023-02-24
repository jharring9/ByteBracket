import React, { useState } from "react";
import {
  ErrorAlert,
  normalTransition,
  SuccessAlert,
  ValidatedInput,
} from "../shared";
import { Transition } from "@headlessui/react";

export const ChangePassword = ({ user }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [oldPassError, setOldPassError] = useState(null);
  const [newPassError, setNewPassError] = useState(null);

  /**
   * Update user password.
   */
  const handleUpdate = async (ev) => {
    ev.preventDefault();

    if (!oldPass || oldPass.length === 0) {
      setOldPassError("Please enter your current password.");
      return;
    } else setOldPassError(null);
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(newPass)) {
      setNewPassError("Your password does not meet the strength requirements.");
      return;
    } else setNewPassError(null);

    let res = await fetch(`/v1/user/${user.username}/password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currentPassword: oldPass,
        newPassword: newPass,
      }),
    });
    if (res.ok) {
      setSuccess(true);
      setError(null);
    } else {
      const { error } = await res.json();
      setSuccess(false);
      setError(error);
    }
  };

  return (
    <form className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <Transition as="div" show={success}>
          <SuccessAlert
            setOpen={setSuccess}
            message="Your password has been updated."
          />
        </Transition>
        <Transition as="div" show={!!error} {...normalTransition}>
          <ErrorAlert header="Error updating password" message={error} />
        </Transition>
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Change password
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Use a secure password of at least 8 characters, including a number
            and an uppercase letter.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <ValidatedInput
              inputName="Current Password"
              type="password"
              value={oldPass}
              setValue={setOldPass}
              errorMsg={oldPassError}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ValidatedInput
              inputName="New Password"
              type="password"
              value={newPass}
              setValue={setNewPass}
              errorMsg={newPassError}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
        <button
          type="submit"
          onClick={handleUpdate}
          className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-indigo-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
};
