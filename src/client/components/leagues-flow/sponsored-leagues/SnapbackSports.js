import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ErrorAlert,
  formatDate,
  LoadingWrapper,
  normalTransition,
  smoothScrollTop,
  SuccessAlert,
  ValidatedInput,
} from "../../shared.js";
import {
  CalendarIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HashtagIcon,
  LockClosedIcon,
  QueueListIcon,
  RectangleStackIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ManageLeague } from "../ManageLeague";
import { addLeague } from "../../../store/userSlice";
import ReactGA from "react-ga4";
import {
  CreateEntryDropdown,
  EnterModal,
  EntryListItem,
  MyEntryListItem,
  rankTeamsWithTies,
} from "../ViewLeague";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

export const SnapBackLeague = () => {
  /* Page state */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { urlcode } = useParams();
  const { logos } = useSelector((state) => state.lambda);
  const { user, fetched } = useSelector((state) => state.user);
  const [manageLeague, setManageLeague] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brackets, setBrackets] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [codeModal, setCodeModal] = useState(false);
  const [leagueOpen, setLeagueOpen] = useState(true);

  /* League information */
  const [leagueName, setLeagueName] = useState("");
  const [manager, setManager] = useState("");
  const [entries, setEntries] = useState([]);
  const [myEntries, setMyEntries] = useState([]);
  const [code, setCode] = useState("");
  const [maxPerUser, setMaxPerUser] = useState(0);
  const [closeDate, setCloseDate] = useState(new Date().toISOString());
  const [enterModal, setEnterModal] = useState(false);

  useEffect(() => {
    if (urlcode) {
      validateCode(urlcode);
    }
  }, [urlcode, code]);

  useEffect(() => {
    if (
      fetched &&
      (!user.username ||
        (manager !== user.username &&
          (!user.leagues || !user.leagues.includes("snapback"))))
    ) {
      navigate("/snapback");
    } else {
      getLeague();
    }
  }, [manager, user, fetched]);

  useEffect(() => {
    document.title = "SnapBack Sports - Bracket Challenge";
  }, []);

  const getLeague = async () => {
    const response = await fetch("/v1/league/snapback");
    const data = await response.json();
    setLeagueName(data.name);
    setManager(data.managerId);
    setEntries(rankTeamsWithTies(data.entries));
    setCode(data.code);
    setMaxPerUser(data.entriesPerUser);
    setCloseDate(data.lockDate);
    setLeagueOpen(new Date(data.lockDate) > new Date());
    setCodeModal(false);
    await getTopEntries();
    await getMyEntries();
    setLoading(false);
  };

  const getTopEntries = async () => {
    const response = await fetch(`/v1/league/snapback/top`);
    const data = await response.json();
    setEntries(data);
  };

  const getMyEntries = async () => {
    const response = await fetch(`/v1/league/snapback/my`);
    const data = await response.json();
    setMyEntries(data);
  };

  const validateCode = async (codeInput) => {
    if (codeInput === code) {
      dispatch(addLeague("snapback"));
      const response = await fetch(`/v1/user/${user.username}/league`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ leagueId: "snapback" }),
      });
      if (!response.ok) {
        return;
      }
      setCodeModal(false);
    }
  };

  const getBrackets = async () => {
    await fetch(`/v1/${user.username}/brackets`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (data) => await data.json())
      .then((data) => setBrackets(data));
  };

  /**
   * Enters a bracket into the league.
   */
  const enterBracket = async (id) => {
    if (myEntries && myEntries.some((entry) => entry.id === id)) {
      setError("You have already entered this bracket.");
      return;
    }
    if (new Date(closeDate) < new Date()) {
      setError(
        "The close date has passed for the SnapBack Sports bracket challenge."
      );
      return;
    }

    if (myEntries && myEntries.length >= maxPerUser) {
      setError(
        "You have reached the maximum number of entries for the SnapBack league."
      );
      return;
    }

    const response = await fetch("/v1/league/snapback", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        bracketId: id,
        username: user.username,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (response.ok) {
      ReactGA.event({ action: "enterleague", category: "league" });
      await getLeague();
      setSuccess("Your bracket has been entered.");
      setError(null);
    } else {
      const data = await response.json();
      setSuccess(null);
      setError(data.error);
    }
  };

  /**
   * Removes a bracket from the league.
   */
  const removeBracket = async (bracketId) => {
    const result = await fetch(`/v1/league/snapback/${bracketId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (result.ok) {
      await getLeague();
      setSuccess("Bracket removed from league");
      setError(null);
    } else {
      const data = await result.json();
      setSuccess(null);
      setError(data.error);
    }
  };

  /**
   * Grants entries to a particular user.
   */
  const grantEntries = async (username, amountChange) => {
    const result = await fetch(`/v1/league/snapback/grant/${username}`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({ amountChange, currentLeagueEntries: maxPerUser }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (result.ok) {
      const { newEntries } = await result.json();
      setSuccess(`Success. ${username} now has ${newEntries} entries.`);
      setError(null);
    } else {
      const data = await result.json();
      setSuccess(null);
      setError(data.error);
    }
    smoothScrollTop();
  };

  /**
   * Displays the top entries.
   */
  const TopEntries = () =>
    entries.length > 0 && (
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">
              Top Performing Entries
            </h2>
          </div>
          <ul
            role="list"
            className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
          >
            {leagueOpen ? (
              <p className="mt-2 px-4 sm:mt-0 sm:px-0">
                Other users' bracket entries will appear once this league has
                locked.
              </p>
            ) : (
              entries.map((entry) => (
                <EntryListItem
                  key={entry.id}
                  entry={entry}
                  leagueId="snapback"
                  isOpen={leagueOpen}
                  logos={logos}
                  navigate={navigate}
                />
              ))
            )}
          </ul>
        </div>
      </main>
    );

  /**
   * Displays current user's entries.
   */
  const MyEntries = () =>
    entries.length > 0 && (
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">Your Entries</h2>
          </div>
          <ul
            role="list"
            className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
          >
            {myEntries.map((entry) => (
              <MyEntryListItem
                key={entry.id}
                entry={entry}
                isOpen={leagueOpen}
                logos={logos}
                navigate={navigate}
                removeBracket={removeBracket}
              />
            ))}
          </ul>
        </div>
      </main>
    );

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="min-h-full">
        <EnterModal
          isOpen={enterModal}
          setOpen={setEnterModal}
          logos={logos}
          brackets={brackets}
          onSubmit={enterBracket}
        />
        <DiscordModal isOpen={codeModal} navigate={navigate} />
        <header className="bg-white py-8 shadow">
          <div className="mx-auto max-w-7xl">
            <Transition as="div" show={!!success} {...normalTransition}>
              <SuccessAlert setOpen={setSuccess} message={success} />
            </Transition>
            <Transition as="div" show={!!error} {...normalTransition}>
              <ErrorAlert header="Error entering bracket" message={error} />
            </Transition>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8">
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div>
                      <Link
                        to="/leagues"
                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                      >
                        Leagues
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-4 text-sm font-medium text-gray-500">
                        SnapBack Sports
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <div className="mt-4 flex">
                <img
                  src="https://bytebracket-webassets.s3.us-east-1.amazonaws.com/SnapbackSports-Logos-04.jpg"
                  className="mr-4 h-16 w-16 rounded-2xl border border-black shadow-xl"
                  alt="SnapBack Sports Logo"
                />
                <h1 className="my-2 text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
                  {leagueName}
                </h1>
              </div>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8 lg:hidden">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <StarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Sponsored League
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <LockClosedIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Invite-only
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <RectangleStackIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {entries.length} entries
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Closes {formatDate(closeDate)}
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              {manager === user.username && (
                <span className="ml-3">
                  <button
                    type="button"
                    onClick={() => setManageLeague(!manageLeague)}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    {manageLeague ? (
                      <>
                        <QueueListIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Entries
                      </>
                    ) : (
                      <>
                        <Cog6ToothIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Manage
                      </>
                    )}
                  </button>
                </span>
              )}
              {leagueOpen && (
                <span className="ml-3">
                  <CreateEntryDropdown
                    existingBracketAction={() => {
                      getBrackets();
                      setEnterModal(true);
                    }}
                    newEntryAction={() => navigate("/create")}
                  />
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl">
          <div className="flex-1">
            {manageLeague ? (
              <ManageLeague
                id="snapback"
                name={leagueName}
                isPrivate={true}
                joinCode={code}
                lockDate={closeDate}
                onClose={() => setManageLeague(false)}
                onSave={() => getLeague()}
              />
            ) : (
              <>
                <MyEntries />
                {myEntries.length === 0 && leagueOpen && (
                  <NoEntriesCard
                    setEnterModal={setEnterModal}
                    getBrackets={getBrackets}
                  />
                )}
                <TopEntries />
              </>
            )}
          </div>
          <div className="flex-0 hidden w-1/3 lg:block">
            <LeagueInformation
              entries={entries}
              entriesPerUser={maxPerUser}
              closeDate={closeDate}
            />
            {manager === user.username && (
              <GrantEntries onGrant={grantEntries} />
            )}
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};

/**
 * Displays when there are no entries in the league.
 */
const NoEntriesCard = ({ setEnterModal, getBrackets }) => {
  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          You have no entries in this league.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          <span
            onClick={() => {
              getBrackets();
              setEnterModal(true);
            }}
            className="cursor-pointer font-medium text-indigo-600 hover:underline"
          >
            Add a bracket
          </span>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
};

/**
 * Displays the league information in a side panel.
 */
const LeagueInformation = ({ entries, entriesPerUser, closeDate }) => {
  return (
    <div className="m-6 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <img
          src="https://bytebracket-webassets.s3.us-east-1.amazonaws.com/SnapbackSports-Logos-03.png"
          className="mx-auto h-24"
          alt="SnapBack Sports Text Logo"
        />
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">
        <div className="flex flex-col">
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <StarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            Sponsored league
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <LockClosedIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            Invite-only
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <RectangleStackIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            {entries.length} brackets entered
          </div>
        </div>
        <div className="relative mt-6">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-2 text-sm font-bold text-gray-700">
              League Settings
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <HashtagIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            Your Max Entries: {entriesPerUser}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-700">
            <CalendarIcon
              className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
              aria-hidden="true"
            />
            Closes: {formatDate(closeDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Allows manager to grant users more entries.
 */
const GrantEntries = ({ onGrant }) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (username.trim() === "") {
      setUsernameError("Please enter a username.");
      return;
    }
    setUsernameError(null);
    onGrant(username, amount);
  };

  return (
    <div className="m-6 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-center text-xl font-bold">Grant Entries</h2>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6">
        <ValidatedInput
          inputName="Username"
          popoverInfo="Enter the username of the user you want to grant entries to."
          value={username}
          setValue={setUsername}
          errorMsg={usernameError}
        />
        <div className="flex justify-center gap-2">
          <button onClick={() => setAmount(amount - 1)}>
            <MinusCircleIcon className="m-2 h-10 w-10 text-red-500" />
          </button>
          <button onClick={() => setAmount(amount + 1)}>
            <PlusCircleIcon className="m-2 h-10 w-10 text-emerald-500" />
          </button>
        </div>
        {amount !== 0 && (
          <div>
            <button
              className="m-2 mx-auto h-auto w-full rounded-lg border border-black bg-emerald-400 px-5 py-2 font-medium text-black text-white shadow-xl transition-colors duration-300 hover:bg-black hover:text-white"
              onClick={onSubmit}
            >
              Grant {amount} Entries to {username}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Modal to enter the code for private leagues.
 */
export const DiscordModal = ({ isOpen, navigate }) => {
  const inputRef = useRef(null);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={inputRef}
        onClose={() => navigate("/leagues")}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 py-3 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:px-6 sm:py-3 sm:align-middle">
              <div>
                <div className="my-3 text-center sm:my-5">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-medium leading-6 text-gray-900"
                  >
                    Join SnapBack Sports League
                  </Dialog.Title>
                  <p className="mt-2">
                    This league is restricted to users in the SnapBack Sports
                    Discord. For access to this league, please{" "}
                    <a
                      href="https://discord.gg/HFsjVKkCMR"
                      className="cursor-pointer font-medium text-indigo-600 hover:underline focus:outline-none"
                    >
                      join the Discord group
                    </a>{" "}
                    to retrieve access to the join link.
                  </p>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
