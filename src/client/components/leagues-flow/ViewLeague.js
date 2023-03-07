import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  classNames,
  ErrorAlert,
  LoadingWrapper,
  normalTransition,
  SuccessAlert,
  ValidatedInput,
  WarnModal,
} from "../shared.js";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClipboardDocumentIcon,
  Cog6ToothIcon,
  HashtagIcon,
  KeyIcon,
  LinkIcon,
  LockClosedIcon,
  LockOpenIcon,
  PlusCircleIcon,
  QueueListIcon,
  RectangleStackIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ManageLeague } from "./ManageLeague";
import { addLeague } from "../../store/userSlice";
import ReactGA from "react-ga4";

export const ViewLeague = () => {
  /* Page state */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [queryParams, _] = useSearchParams();
  const urlCode = queryParams.get("code");
  const { id: leagueId } = useParams();
  const { logos } = useSelector((state) => state.lambda);
  const { user } = useSelector((state) => state.user);
  const [manageLeague, setManageLeague] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brackets, setBrackets] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [codeModal, setCodeModal] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [leagueOpen, setLeagueOpen] = useState(true);

  /* League information */
  const [leagueName, setLeagueName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [entries, setEntries] = useState([]);
  const [manager, setManager] = useState("");
  const [creationDate, setCreationDate] = useState("");

  /* League settings */
  const [code, setCode] = useState("");
  const [maxPerUser, setMaxPerUser] = useState(0);
  const [closeDate, setCloseDate] = useState(new Date().toISOString());
  const [shareModal, setShareModal] = useState(false);
  const [enterModal, setEnterModal] = useState(false);

  useEffect(() => {
    if (!user.username) {
      navigate(`/join/${leagueId}`);
    }
    getLeague();
  }, [leagueId, user]);

  useEffect(() => {
    if (isPrivate && urlCode) {
      validateCode(urlCode);
    }
  }, [isPrivate, urlCode]);

  useEffect(() => {
    if (
      isPrivate &&
      manager !== user.username &&
      (!user.leagues || !user.leagues.includes(leagueId))
    ) {
      setCodeModal(true);
    }
  }, [isPrivate, manager, user]);

  useEffect(() => {
    document.title = "League - ByteBracket";
  }, []);

  const getLeague = async () => {
    const response = await fetch(`/v1/league/${leagueId}`);
    const data = await response.json();
    setLeagueName(data.name);
    setIsPrivate(data.isPrivate);
    setEntries(rankTeamsWithTies(data.entries));
    setManager(data.managerId);
    setCreationDate(data.created.substring(0, 10));
    setCode(data.code);
    setMaxPerUser(data.entriesPerUser);
    setCloseDate(data.lockDate);
    setLeagueOpen(new Date(data.lockDate) > new Date());
    setCodeModal(false);
    setLoading(false);
  };

  const validateCode = async (codeInput) => {
    if (codeInput === code) {
      dispatch(addLeague(leagueId));
      const response = await fetch(`/v1/user/${user.username}/league`, {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ leagueId }),
      });
      if (!response.ok) {
        setCodeError("Error joining league.");
      }
      setCodeModal(false);
    } else {
      setCodeError("Invalid code.");
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
    if (entries.some((entry) => entry.id === id)) {
      setError("You have already entered this bracket.");
      return;
    }
    if (new Date(closeDate) < new Date()) {
      setError("This league's close date has passed.");
      return;
    }

    const userEntries = entries.filter((e) => e.username === user.username);
    if (userEntries.length >= maxPerUser) {
      setError(
        "You have reached the maximum number of entries for this league."
      );
      return;
    }

    const response = await fetch(`/v1/league/${leagueId}`, {
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
    const result = await fetch(`/v1/league/${leagueId}/${bracketId}`, {
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
   * Displays the league entries.
   */
  const LeagueEntries = () =>
    entries.length > 0 ? (
      <main className="pt-8 pb-16">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-2xl font-bold text-gray-900">Entries</h2>
          </div>
          <ul
            role="list"
            className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0"
          >
            {entries.map((entry) => (
              <EntryListItem
                key={entry.id}
                entry={entry}
                leagueId={leagueId}
                isOpen={leagueOpen}
                logos={logos}
                username={user.username}
                navigate={navigate}
                removeBracket={removeBracket}
              />
            ))}
          </ul>
        </div>
      </main>
    ) : (
      <NoEntriesCard
        setEnterModal={setEnterModal}
        setShareModal={setShareModal}
        getBrackets={getBrackets}
      />
    );

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="min-h-full">
        <ShareModal
          isOpen={shareModal}
          setOpen={setShareModal}
          id={leagueId}
          isPrivate={isPrivate}
          code={code}
        />
        <EnterModal
          isOpen={enterModal}
          setOpen={setEnterModal}
          logos={logos}
          brackets={brackets}
          onSubmit={enterBracket}
        />
        <CodeModal
          isOpen={codeModal}
          attemptEntry={validateCode}
          codeError={codeError}
          navigate={navigate}
        />
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
                        This League
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="my-2 text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
                {leagueName}
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-8 lg:hidden">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  {isPrivate ? (
                    <>
                      <LockClosedIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Private
                    </>
                  ) : (
                    <>
                      <LockOpenIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      Public
                    </>
                  )}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <RectangleStackIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {entries.length} entries
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <KeyIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  {manager}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <CalendarIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  Created {creationDate}
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:mt-0 lg:ml-4">
              <span className="ml-3">
                <button
                  type="button"
                  onClick={() => setShareModal(true)}
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  <LinkIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Share
                </button>
              </span>
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
                id={leagueId}
                name={leagueName}
                maxPerUser={maxPerUser}
                isPrivate={isPrivate}
                joinCode={code}
                lockDate={closeDate}
                onClose={() => setManageLeague(false)}
                onSave={() => getLeague()}
              />
            ) : (
              <LeagueEntries />
            )}
          </div>
          <LeagueInformation
            isPrivate={isPrivate}
            entries={entries}
            manager={manager}
            creationDate={creationDate}
            entriesPerUser={maxPerUser}
            closeDate={closeDate}
          />
        </div>
      </div>
    </LoadingWrapper>
  );
};

/**
 * Dropdown for adding an entry to the league.
 */
const CreateEntryDropdown = ({ existingBracketAction, newEntryAction }) => {
  const items = [
    { name: "Enter Existing Bracket", action: existingBracketAction },
    { name: "Create New Bracket", action: newEntryAction },
  ];

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <Menu as="div" className="relative block">
        <Menu.Button className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-700 px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
          <PlusCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-white"
            aria-hidden="true"
          />
          <span className="sm:hidden">Enter</span>
          <span className="hidden sm:inline">Add Entry</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {items.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <div
                      onClick={item.action}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block cursor-pointer px-4 py-2 text-sm"
                      )}
                    >
                      {item.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

/**
 * Displays when there are no entries in the league.
 */
const NoEntriesCard = ({ setEnterModal, setShareModal, getBrackets }) => {
  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          There are no entries in this league
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
          or{" "}
          <span
            onClick={() => {
              setShareModal(true);
            }}
            className="cursor-pointer font-medium text-indigo-600 hover:underline"
          >
            share your league
          </span>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
};

const EntryListItem = ({
  entry,
  leagueId,
  isOpen,
  logos,
  username,
  navigate,
  removeBracket,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <li>
      <WarnModal
        open={showModal}
        setOpen={setShowModal}
        header="Remove bracket"
        content="Are you sure you want to remove this bracket from the league? The bracket will not be deleted from your account."
        cta="Remove"
        onComplete={() => removeBracket(entry.id)}
      />
      <div
        className={classNames(
          isOpen ? "cursor-auto" : "cursor-pointer",
          "group block"
        )}
      >
        <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
          <div
            onClick={() =>
              navigate(
                isOpen
                  ? `/leagues/${leagueId}`
                  : `/bracket/${entry.username}/${entry.id}`
              )
            }
            className="flex min-w-0 flex-1 items-center"
          >
            {!isOpen && (
              <>
                <div className="w-4 md:w-10">
                  <h1 className="text-xl font-bold group-hover:text-gray-500">
                    {entry.rank}
                  </h1>
                </div>
                <div className="w-16">
                  <div className="flex items-center">
                    <img
                      className="mr-3 h-12 group-hover:opacity-75"
                      src={logos[entry.winnerName]}
                      alt="winner logo"
                    />
                  </div>
                </div>
              </>
            )}
            <div className="grid min-w-0 flex-1 grid-cols-2 px-4 md:gap-4">
              <div>
                <p className="md:text-md truncate text-sm font-medium text-purple-600 lg:text-lg">
                  {entry.name}
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <UserIcon
                    className="mr-1.5 hidden h-5 w-5 flex-shrink-0 text-gray-400 sm:block"
                    aria-hidden="true"
                  />
                  <span className="truncate">{entry.username}</span>
                </p>
              </div>
              <div>
                <div>
                  <h2 className="flex justify-center text-xl font-bold text-gray-900">
                    {entry.points}
                  </h2>
                  <h6 className="flex items-center justify-center text-sm text-gray-900">
                    points
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div>
            {isOpen ? (
              <div className="mr-5 w-4 sm:mr-0 md:w-10">
                {entry.username === username && (
                  <button
                    title="Remove this bracket from the league"
                    onClick={() => setShowModal(true)}
                    className="mr-2 inline-flex items-center rounded-lg border border-red-700 p-0.5 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
            ) : (
              <ChevronRightIcon
                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

/**
 * Displays the league information in a side panel.
 */
const LeagueInformation = ({
  isPrivate,
  entries,
  manager,
  creationDate,
  entriesPerUser,
  closeDate,
}) => {
  return (
    <div className="flex-0 hidden w-1/3 lg:block">
      <div className="m-6 overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-center text-xl font-bold">League Information</h2>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:p-6">
          <div className="flex flex-col">
            <div className="mt-2 flex items-center text-sm text-gray-700">
              {isPrivate ? (
                <>
                  <LockClosedIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                    aria-hidden="true"
                  />
                  Private league (invite only)
                </>
              ) : (
                <>
                  <LockOpenIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                    aria-hidden="true"
                  />
                  Public league (joinable)
                </>
              )}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-700">
              <RectangleStackIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                aria-hidden="true"
              />
              {entries.length} brackets entered
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-700">
              <KeyIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                aria-hidden="true"
              />
              League manager: {manager}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-700">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                aria-hidden="true"
              />
              Created {creationDate}
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
              Entries Per User: {entriesPerUser}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-700">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-600"
                aria-hidden="true"
              />
              Closes: {closeDate.substring(0, 10)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Modal to enter the code for private leagues.
 */
const CodeModal = ({ isOpen, attemptEntry, codeError, navigate }) => {
  const inputRef = useRef(null);
  const [codeInput, setCodeInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptEntry(codeInput);
  };

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
                    Enter join code
                  </Dialog.Title>
                  <form>
                    <div className="mt-2">
                      <ValidatedInput
                        inputName="This league is private. Please enter the join code."
                        value={codeInput}
                        setValue={setCodeInput}
                        errorMsg={codeError}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="focus:shadow-outline mt-4 h-10 w-full rounded-lg bg-indigo-700 px-5 text-indigo-100 transition-colors duration-150 hover:bg-indigo-800 lg:w-auto"
                      >
                        <div className="flex justify-center">
                          <ChevronRightIcon className="h-8 w-8" />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

/**
 * Modal for sharing a league join link.
 */
const ShareModal = ({ id, isPrivate, code, isOpen, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const link = `https://bytebracket.io/join/${id}${
    isPrivate ? `/${code}` : ""
  }`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 sm:mx-0 sm:h-10 sm:w-10">
                    <LinkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Share League
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please share this link with your friends to invite them
                        to the league.
                      </p>
                    </div>
                    <div className="mt-2 flex rounded-md shadow-sm">
                      <div className="relative flex flex-grow items-stretch focus-within:z-10">
                        <input
                          type="text"
                          name="link"
                          id="link"
                          className="block w-full rounded-none rounded-l-md border-gray-300 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={link}
                          disabled
                        />
                      </div>
                      <button
                        type="button"
                        onClick={copyLink}
                        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <ClipboardDocumentIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Copy</span>
                      </button>
                    </div>
                    {copied && (
                      <p
                        className="mt-2 text-sm text-indigo-600"
                        id="link-copied"
                      >
                        Copied to clipboard
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Close
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

/**
 * Modal for entering a league.
 */
const EnterModal = ({ isOpen, setOpen, logos, brackets, onSubmit }) => {
  const cancelButtonRef = useRef(null);
  const [selected, setSelected] = useState(-1);

  const handleEnter = () => {
    onSubmit(brackets[selected].id);
    setOpen(false);
    setSelected(-1);
  };

  const handleCancel = () => {
    setOpen(false);
    setSelected(-1);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500 sm:mx-0 sm:h-10 sm:w-10">
                    <LinkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Select your bracket
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please click the bracket you would like to submit for
                        entry.
                      </p>
                    </div>

                    <div className="mt-2 flex flex-col">
                      <ul
                        role="list"
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        {brackets.map((bracket, index) => (
                          <BracketSelectGridItem
                            bracket={bracket}
                            logos={logos}
                            onSelect={() => {
                              setSelected(index);
                            }}
                            selected={selected === index}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleEnter}
                  >
                    Enter
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={handleCancel}
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

/**
 * Grid item for selecting a bracket to enter the league.
 */
const BracketSelectGridItem = ({ bracket, logos, onSelect, selected }) => {
  return (
    <li
      key={bracket.id}
      className={classNames(
        selected ? "bg-green-200" : "bg-white",
        "col-span-1 w-full cursor-pointer divide-y divide-gray-200 rounded-lg shadow"
      )}
      onClick={onSelect}
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex justify-between">
          <div>
            <h3 className="truncate text-sm font-medium text-gray-900">
              {bracket.name}
            </h3>
            <p className="mt-1 truncate text-sm text-gray-500">
              {bracket.winnerName}
            </p>
          </div>
        </div>
        <img src={logos[bracket.winnerName]} alt="team logo" className="h-16" />
      </div>
    </li>
  );
};

/**
 * Sorts teams by points (ties allowed).
 */
const rankTeamsWithTies = (teams) => {
  if (!teams) return [];
  teams.sort(function (a, b) {
    return b.points - a.points;
  });
  let rank = 1;
  for (let i = 0; i < teams.length; i++) {
    if (i > 0 && teams[i].points < teams[i - 1].points) {
      rank++;
    }
    teams[i].rank = rank;
  }
  return teams;
};
