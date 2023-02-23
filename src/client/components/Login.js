import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ErrorAlert,
  Facebook,
  Google,
  oauth,
  ValidatedInput,
  validateInput,
} from "./shared";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import ReactGA from "react-ga4";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [queryParams, _] = useSearchParams();
  const returnUrl = queryParams.get("return");
  const { user } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  useEffect(() => {
    if (user.username) {
      navigate(returnUrl ? `/${returnUrl}` : "/account");
    }
  }, [user, returnUrl]);

  useEffect(() => {
    document.title = "Login - ByteBracket";
  }, []);

  const onLogin = async (ev) => {
    ev.preventDefault();
    if (
      !validateInput({
        username,
        setUsernameError,
        password,
        setPasswordError,
      })
    )
      return;

    const res = await fetch("/v1/session", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      ReactGA.event("login", { method: "native" });
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            create an account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            {error && (
              <ErrorAlert
                className="mb-6"
                header="Error logging in"
                message={error}
              />
            )}
            <div>
              <ValidatedInput
                inputName="Username"
                value={username}
                setValue={setUsername}
                errorMsg={usernameError}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={onLogin}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <div
                  onClick={() => oauth("facebook", dispatch)}
                  className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <Facebook />
                </div>
              </div>
              <div>
                <div
                  onClick={() => oauth("google", dispatch)}
                  className="inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                >
                  <Google />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
