import React, { useEffect, useState } from "react";
import { formatDate, LoadingWrapper } from "./shared";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export const Leagues = () => {
  const { user } = useSelector((state) => state.user);
  const [publicLeagues, setPublicLeagues] = useState([]);
  const [yourLeagues, setYourLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const sponsoredLeagues = [
    {
      id: "snapback",
      lockDate: "2023-03-16T05:00:00-0600",
      name: "SnapBack Sports Bracket Challenge",
      prizes: 2500,
    },
  ];

  useEffect(() => {
    const getLeagues = async () => {
      if (user.username) {
        await fetch("/v1/leagues/public")
          .then(async (res) => await res.json())
          .then((data) => setPublicLeagues(data))
          .catch((err) => console.log(err));
        await fetch("/v1/leagues/my")
          .then(async (res) => await res.json())
          .then((data) => setYourLeagues(data))
          .catch((err) => console.log(err));
      }
      setLoading(false);
    };
    getLeagues();
  }, [user]);

  useEffect(() => {
    document.title = "Leagues - ByteBracket";
  }, []);

  return user.username ? (
    <LoadingWrapper isLoading={loading}>
      <header className="bg-white py-8 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="my-2 text-3xl font-bold leading-7 text-gray-900 sm:truncate sm:text-4xl sm:tracking-tight">
              Leagues
            </h1>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <Link
              to="/newleague"
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-700 px-2 py-2 text-sm font-medium text-white hover:bg-indigo-600 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              Create a league
            </Link>
          </div>
        </div>
      </header>
      <SponsoredLeaguesList
        leagues={sponsoredLeagues}
        title="Sponsored Leagues"
      />
      <LeagueList leagues={yourLeagues} title="Your Leagues" paginate={false} />
      <LeagueList
        leagues={publicLeagues}
        title="Public Leagues"
        paginate={false}
      />
    </LoadingWrapper>
  ) : (
    <NotLoggedInCard />
  );
};

/**
 * Displays a list of leagues.
 */
export const LeagueList = ({ title, leagues, paginate }) => {
  return (
    <div className="mt-8">
      <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
        {title}
      </h2>

      {/* Smallest breakpoint only */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {leagues.map((league) => (
            <li key={league.id}>
              <Link
                to={`/leagues/${league.id}`}
                className="block bg-white px-4 py-4 hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <UsersIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="text-md truncate font-bold">
                        {league.name}
                      </span>
                      <span>{league.entryCount} entries</span>
                      <time dateTime={league.lockDate}>
                        Locks {formatDate(league.lockDate)}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
          {leagues.length === 0 && (
            <li key="no-entries">
              <div className="flex items-center space-x-4 bg-white px-4">
                <span className="flex flex-1 space-x-2 truncate">
                  <span className="flex flex-col truncate text-sm text-gray-500">
                    <span className="text-md truncate font-bold">
                      No leagues found.
                    </span>
                    <span>Create one by clicking the button above.</span>
                  </span>
                </span>
              </div>
            </li>
          )}
        </ul>
        {paginate && (
          <nav
            className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
            aria-label="Pagination"
          >
            <div className="flex flex-1 justify-between">
              <a
                href="#"
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Previous
              </a>
              <a
                href="#"
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Next
              </a>
            </div>
          </nav>
        )}
      </div>

      {/* Larger breakpoints */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      League Name
                    </th>
                    {leagues.length !== 0 && (
                      <>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Entries
                        </th>
                        <th
                          className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                          scope="col"
                        >
                          Manager
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Lock Date
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {leagues.map((league) => (
                    <tr key={league.id} className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <Link
                            to={`/leagues/${league.id}`}
                            className="group inline-flex space-x-2 truncate text-sm"
                          >
                            <UsersIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                              {league.name}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500">
                        {league.entryCount}
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500 md:block">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5">
                          {league.managerId}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time dateTime={league.lockDate}>
                          {formatDate(league.lockDate)}
                        </time>
                      </td>
                    </tr>
                  ))}
                  {leagues.length === 0 && (
                    <tr key="no-entries" className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-4 bg-white px-4">
                          <span className="flex flex-1 space-x-2 truncate">
                            <span className="flex flex-col truncate text-sm text-gray-500">
                              <span className="text-md truncate font-bold">
                                No leagues found.
                              </span>
                              <span>
                                Create one by clicking the button above.
                              </span>
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {paginate && (
                <nav
                  className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="hidden sm:block">
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to{" "}
                      <span className="font-medium">10</span> of{" "}
                      <span className="font-medium">20</span> results
                    </p>
                  </div>
                  <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Previous
                    </a>
                    <a
                      href="#"
                      className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Next
                    </a>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Displays a list of sponsored leagues
 */
export const SponsoredLeaguesList = ({ title, leagues }) => {
  return (
    <div className="mt-8">
      <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8">
        {title}
      </h2>

      {/* Smallest breakpoint only */}
      <div className="shadow sm:hidden">
        <ul
          role="list"
          className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
        >
          {leagues.map((league) => (
            <li key={league.id}>
              <Link
                to={`/leagues/${league.id}`}
                className="block bg-white px-4 py-4 hover:bg-gray-50"
              >
                <span className="flex items-center space-x-4">
                  <span className="flex flex-1 space-x-2 truncate">
                    <CurrencyDollarIcon
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col truncate text-sm text-gray-500">
                      <span className="text-md truncate font-bold">
                        {league.name}
                      </span>
                      <span>${league.prizes} total prizes</span>
                      <time dateTime={league.lockDate}>
                        Locks {formatDate(league.lockDate)}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
          {leagues.length === 0 && (
            <li key="no-entries">
              <div className="flex items-center space-x-4 bg-white px-4">
                <span className="flex flex-1 space-x-2 truncate">
                  <span className="flex flex-col truncate text-sm text-gray-500">
                    <span className="text-md truncate font-bold">
                      No sponsored leagues found.
                    </span>
                  </span>
                </span>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Larger breakpoints */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mt-2 flex flex-col">
            <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                      scope="col"
                    >
                      League Name
                    </th>
                    {leagues.length !== 0 && (
                      <>
                        <th
                          className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Prizes
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Lock Date
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {leagues.map((league) => (
                    <tr key={league.id} className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex">
                          <Link
                            to={`/leagues/${league.id}`}
                            className="group inline-flex space-x-2 truncate text-sm"
                          >
                            <CurrencyDollarIcon
                              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                              {league.name}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500 md:block">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5">
                          ${league.prizes}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <time dateTime={league.lockDate}>
                          {formatDate(league.lockDate)}
                        </time>
                      </td>
                    </tr>
                  ))}
                  {leagues.length === 0 && (
                    <tr key="no-entries" className="bg-white">
                      <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        <div className="flex items-center space-x-4 bg-white px-4">
                          <span className="flex flex-1 space-x-2 truncate">
                            <span className="flex flex-col truncate text-sm text-gray-500">
                              <span className="text-md truncate font-bold">
                                No leagues found.
                              </span>
                            </span>
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Displays when user is not logged in
 */
const NotLoggedInCard = () => {
  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
          Please sign in to view leagues.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          <Link
            to="/login?return=leagues"
            className="font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>{" "}
          or{" "}
          <Link
            to="/register?return=leagues"
            className="font-medium text-indigo-600 hover:underline"
          >
            create an account
          </Link>{" "}
          to get view, create, and join leagues.
        </p>
      </div>
    </div>
  );
};
