import React, { Fragment } from "react";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { setLogos } from "../store/lambdaSlice";

export const TrendingUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#00FF00"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
    />
  </svg>
);

export const TrendingDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#FF0000"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181"
    />
  </svg>
);

export const BackButton = ({ onClick }) => (
  <button
    className="focus:shadow-outline m-2 h-10 w-full rounded-lg bg-indigo-100 px-5 text-indigo-700 transition-colors duration-150 hover:bg-indigo-800 lg:w-auto"
    onClick={onClick}
  >
    <div className="flex justify-center">
      Go Back
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
        />
      </svg>
    </div>
  </button>
);

export const ContinueButton = ({ onClick, loading }) => (
  <button
    className="focus:shadow-outline m-2 h-10 w-full rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800 lg:w-auto"
    onClick={onClick}
  >
    <div className="flex justify-center">
      {loading ? (
        <>
          <Spinner className="mr-2" />
          Loading...
        </>
      ) : (
        <>
          Continue
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </>
      )}
    </div>
  </button>
);

export const SaveButton = ({ onClick, loading }) => (
  <button
    className="focus:shadow-outline m-2 h-10 w-full rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800 lg:w-auto"
    onClick={onClick}
  >
    <div className="flex justify-center">
      {loading ? (
        <>
          <Spinner className="mr-2" />
          Loading...
        </>
      ) : (
        <>
          Save Bracket
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </>
      )}
    </div>
  </button>
);

export const Spinner = () => (
  <div className="text-center">
    <div role="status">
      <svg
        aria-hidden="true"
        className="mr-2 inline h-6 w-6 animate-spin fill-indigo-500 text-gray-200"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  </div>
);

export const Facebook = () => (
  <svg
    className="h-5 w-5"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
      clipRule="evenodd"
    />
  </svg>
);

export const Google = () => (
  <svg
    className="h-5 w-5"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 30 30"
  >
    <path d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"></path>
  </svg>
);

export const Github = () => (
  <svg
    className="h-5 w-5"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const Logo = () => (
  <span className="text-3xl text-white" style={{ fontFamily: "loveloBold" }}>
    Byte<span className="text-indigo-600">Bracket</span>
  </span>
);

export const ErrorAlert = ({ header, message }) => (
  <div className="mx-auto max-w-7xl rounded-md bg-red-100 p-4 px-4 px-6">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div className="ml-3">
        <h3 className="flex-wrap break-normal text-sm font-medium text-red-800">
          {header}
        </h3>
        <div className="mt-2 text-sm text-red-700">{message}</div>
      </div>
    </div>
  </div>
);

export const BracketArt = () => (
  <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
    <svg
      className="absolute top-0 left-1/2 origin-top -translate-x-1/2 -translate-y-8 scale-90 transform md:scale-100"
      width={640}
      height={480}
      fill="none"
      viewBox="0 0 640 784"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
          x={118}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className="text-gray-300"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        x={118}
        width={404}
        height={784}
        fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
      />
    </svg>
    <div className="relative mx-auto w-full lg:max-w-md">
      <div className="relative block w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        <img className="w-full" src="/assets/bracket.png" alt="" />
      </div>
    </div>
  </div>
);

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ProgressBar = () => {
  const { progressBar } = useSelector((state) => state.createStage);
  return (
    <div
      aria-label="Progress"
      className="mx-auto mt-4 flex w-full max-w-7xl justify-evenly space-x-2 p-3 px-4 px-6 "
    >
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {progressBar.map((step, stepIdx) => (
          <li key={step.name} className="relative md:flex md:flex-1">
            {step.status === "complete" ? (
              <div className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            ) : step.status === "current" ? (
              <div
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.name}
                </span>
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 group-hover:text-gray-900">
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                    {step.name}
                  </span>
                </span>
              </div>
            )}
            {stepIdx !== progressBar.length - 1 ? (
              <>
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
};

export const SpeedDial = ({ action }) => (
  <div className="group fixed bottom-2 right-2 md:bottom-6 md:right-6">
    <button
      type="button"
      onClick={action}
      className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-700 text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="h-12 w-12"
      >
        <path
          d="M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153zm.926 82.855a31.953 18.96 0 0 1 22.127 32.362 31.953 18.96 0 1 1-45.188-26.812 31.953 18.96 0 0 1 23.06-5.55zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zM89.297 195.77a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm221.52 64.664A18.008 31.236 31.906 0 1 322 275.637a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.183zM145.296 289.1a31.236 18.008 58.094 0 1 33.818 41.183 31.236 18.008 58.094 0 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203zm277.523 29.38A18.008 31.236 31.906 0 1 434 333.684a18.008 31.236 31.906 0 1-45 25.98 18.008 31.236 31.906 0 1 33.818-41.184zm-221.52 64.663a31.236 18.008 58.094 0 1 33.817 41.183 31.236 18.008 58.094 1 1-45-25.98 31.236 18.008 58.094 0 1 11.182-15.203z"
          fill="#fff"
        ></path>
      </svg>
    </button>
  </div>
);

export const DisableStat = ({
  value,
  disabledValue,
  setValue,
  setDisabledValue,
}) => (
  <button
    type="button"
    onClick={() => {
      setDisabledValue(value);
      return setValue(disabledValue);
    }}
    className="mr-2 inline-flex items-center rounded-lg border border-red-700 p-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
  >
    <svg
      aria-hidden="true"
      className="h-3 w-3"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 352 512"
    >
      <path
        fill="currentColor"
        d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
      />
    </svg>
  </button>
);

export const CreateCard = ({ children, onBack, onNext, loading }) => (
  <div className="relative mx-auto">
    <div className="mx-auto mt-2 max-w-screen-xl px-4 pb-6 sm:px-6 lg:mt-4 lg:px-8">
      <div className="rounded-md shadow sm:overflow-hidden md:rounded-lg">
        <div className="space-y-6 bg-gray-200 px-4 py-5 sm:p-6">{children}</div>
        <div className="bg-gray-50 py-3 text-right sm:px-8">
          <div className="justify-center lg:col-span-4 lg:flex ">
            <div className="mt-4 flex justify-center lg:mt-2">
              <BackButton onClick={onBack} />
            </div>
            <div className="flex justify-center lg:mt-2">
              <ContinueButton onClick={onNext} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const fetchImages = async (dispatch) => {
  const res = await fetch("/v1/logos", {
    method: "GET",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    dispatch(setLogos(data));
    for (const url in data) {
      new Image().src = data[url];
    }
  }
};

import { Dialog, Transition } from "@headlessui/react";
export const WarnModal = ({
  open,
  setOpen,
  header,
  content,
  cta,
  onComplete,
}) => {
  const handleComplete = () => {
    setOpen(false);
    onComplete();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {header}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{content}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleComplete}
                  >
                    {cta}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
export const SuccessAlert = ({ setOpen, message }) => {
  return (
    <div className="mb-6 rounded-md bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckCircleIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={() => setOpen(false)}
              className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const smoothScrollTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const validateInput = ({
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
  isNewPassword,
}) => {
  let valid = true;
  if (setUsernameError) {
    if (!username || username.trim().length === 0) {
      setUsernameError("Username is required");
      valid = false;
    } else setUsernameError(null);
  }
  if (setFirstError) {
    if (!first || first.trim().length === 0) {
      setFirstError("First name is required");
      valid = false;
    } else setFirstError(null);
  }
  if (setLastError) {
    if (!last || last.trim().length === 0) {
      setLastError("Last name is required");
      valid = false;
    } else setLastError(null);
  }
  if (setEmailError) {
    if (!email || email.trim().length === 0) {
      setEmailError("Email is required");
      valid = false;
    } else if (
      setEmailError &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setEmailError("Invalid email address");
      valid = false;
    } else setEmailError(null);
  }
  if (setPasswordError) {
    if (!password || password.trim().length === 0) {
      setPasswordError("Password is required");
      valid = false;
    } else if (
      isNewPassword &&
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password)
    ) {
      setPasswordError(
        "Password must be at least 8 characters, and contain 1 digit and one uppercase number."
      );
    } else setPasswordError(null);
  }
  return valid;
};

export const ValidatedInput = ({
  inputName,
  type,
  value,
  setValue,
  errorMsg,
}) => {
  return (
    <>
      <label
        htmlFor={inputName}
        className="block text-sm font-medium text-gray-700"
      >
        {inputName}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type ? type : "text"}
          name={inputName}
          id={inputName}
          className={classNames(
            errorMsg
              ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500",
            "block w-full rounded-md border sm:text-sm"
          )}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {errorMsg && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errorMsg && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMsg}
        </p>
      )}
    </>
  );
};