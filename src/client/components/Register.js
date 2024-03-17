import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ErrorAlert, ValidatedInput, validateInput } from "./shared";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import ReactGA from "react-ga4";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParams, _] = useSearchParams();
  const returnUrl = queryParams.get("return");
  const { user } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [firstError, setFirstError] = useState(null);
  const [lastError, setLastError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const loginInterval = useRef();

  useEffect(() => {
    if (user.username) {
      navigate(returnUrl ? `/${returnUrl}` : "/account");
    }
  }, [user]);

  useEffect(() => {
    document.title = "Register - ByteBracket";
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(loginInterval.current);
    };
  }, []);

  const onRegister = async (ev) => {
    ev.preventDefault();
    if (
      !validateInput({
        username,
        setUsernameError,
        first,
        setFirstError,
        last,
        setLastError,
        email,
        setEmailError,
        password,
        setPasswordError,
        isNewPassword: true,
      })
    )
      return;

    const res = await fetch("/v1/user", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        first: first,
        last: last,
        email: email,
        password: password,
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      ReactGA.event({ action: "register", category: "user" });
      dispatch(setUser(data));
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1
          className="text-center text-7xl text-indigo-700"
          style={{ fontFamily: "loveloBold" }}
        >
          B
        </h1>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            login to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {error && (
              <ErrorAlert
                className="mb-6"
                header="Error registering"
                message={error}
              />
            )}
            <div>
              <ValidatedInput
                inputName="Username"
                value={username}
                setValue={setUsername}
                errorMsg={usernameError}
                autocomplete="username"
              />
            </div>
            <div>
              <ValidatedInput
                inputName="First Name"
                value={first}
                setValue={setFirst}
                errorMsg={firstError}
              />
            </div>
            <div>
              <ValidatedInput
                inputName="Last Name"
                value={last}
                setValue={setLast}
                errorMsg={lastError}
              />
            </div>
            <div>
              <ValidatedInput
                inputName="Email Address"
                type="email"
                value={email}
                setValue={setEmail}
                errorMsg={emailError}
              />
            </div>
            <div>
              <ValidatedInput
                inputName="Password"
                type="password"
                value={password}
                setValue={setPassword}
                errorMsg={passwordError}
              />
            </div>

            <div>
              <button
                onClick={onRegister}
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Create account
              </button>
            </div>
          </form>

          {/*<div className="mt-6">*/}
          {/*  <div className="relative">*/}
          {/*    <div className="absolute inset-0 flex items-center">*/}
          {/*      <div className="w-full border-t border-gray-300" />*/}
          {/*    </div>*/}
          {/*    <div className="relative flex justify-center text-sm">*/}
          {/*      <span className="bg-white px-2 text-gray-500">*/}
          {/*        Or continue with*/}
          {/*      </span>*/}
          {/*    </div>*/}
          {/*  </div>*/}

          {/*  <div className="mt-6 grid grid-cols-2 gap-3">*/}
          {/*    <div>*/}
          {/*      <div*/}
          {/*        onClick={() => handleOauth("facebook")}*/}
          {/*        className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"*/}
          {/*      >*/}
          {/*        <Facebook />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <div*/}
          {/*        onClick={() => handleOauth("google")}*/}
          {/*        className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"*/}
          {/*      >*/}
          {/*        <Google />*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
