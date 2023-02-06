import React, { useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "./shared";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const userNavigation = [
  { name: "My Account", href: "/account" },
  { name: "Sign out", href: "/signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Header = ({ navigation, setNavigation }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const newNav = [...navigation].map((item) => {
      item.current = item.href === location.pathname;
      return item;
    });
    setNavigation(newNav);
  }, [location]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Link className="cursor-pointer " to="/home">
                    <Logo />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="hidden items-center md:flex">
                <div className="flex-shrink-0">
                  {user.username ? (
                    <>
                      <Link
                        to="/account"
                        type="button"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        My Account
                      </Link>
                      <Link
                        to="/signout"
                        className="ml-3 inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                      >
                        Sign Out
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Link to={item.href} key={item.name}>
                  <Disclosure.Button
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
            {user.username ? (
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-2">
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.first + " " + user.last}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2 sm:px-3">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-700 pb-3">
                <div className="mt-3 space-y-1 px-2 sm:px-3">
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Log in
                  </Disclosure.Button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
