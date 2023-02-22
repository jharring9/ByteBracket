import React, { useEffect, useState } from "react";
import {
  ErrorAlert,
  normalTransition,
  smoothScrollTop,
  SuccessAlert,
  ValidatedInput,
  validateInput,
} from "../shared";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { Transition } from "@headlessui/react";

export const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [firstError, setFirstError] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  useEffect(() => {
    setFirst(user.first);
    setLast(user.last);
    setEmail(user.email);
  }, [user]);

  /**
   * Revert changes to user account.
   */
  const handleCancel = (ev) => {
    ev.preventDefault();
    setFirst(user.first);
    setLast(user.last);
    setEmail(user.email);
    setFirstError(null);
    setLastError(null);
    setEmailError(null);
  };

  /**
   * Update user account.
   */
  const handleUpdate = async (ev) => {
    ev.preventDefault();
    if (
      !validateInput({
        first,
        setFirstError,
        last,
        setLastError,
        email,
        setEmailError,
      })
    )
      return;

    let res = await fetch(`/v1/user/${user.username}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        first,
        last,
        email,
      }),
    });
    const data = await res.json();
    smoothScrollTop();
    if (res.ok) {
      setSuccess(true);
      setError(null);
      dispatch(setUser(data));
    } else {
      setSuccess(false);
      setError(data.error);
    }
  };

  return (
    <form className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <Transition as="div" show={success}>
          <SuccessAlert
            setOpen={setSuccess}
            message="Your profile has been updated."
          />
        </Transition>
        <Transition as="div" show={!!error} {...normalTransition}>
          <ErrorAlert header="Error updating profile" message={error} />
        </Transition>
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            By default, this information cannot be viewed publicly.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              disabled
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
              value={user.username}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ValidatedInput
              inputName="Email"
              value={email}
              setValue={setEmail}
              errorMsg={emailError}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ValidatedInput
              inputName="First name"
              value={first}
              setValue={setFirst}
              errorMsg={firstError}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <ValidatedInput
              inputName="Last name"
              value={last}
              setValue={setLast}
              errorMsg={lastError}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
        <button
          type="reset"
          onClick={handleCancel}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
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
