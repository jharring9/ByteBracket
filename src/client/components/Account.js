import React, { useEffect, useState } from "react";
import {
  UserGroupIcon,
  QueueListIcon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Profile } from "./account-flow/Profile";
import { classNames } from "./shared";
import { Brackets } from "./account-flow/Brackets";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "./account-flow/ChangePassword";
import { Leagues } from "./account-flow/Leagues";

let sidebar = [];

export const Account = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    document.title = "Account - ByteBracket";
    if (!user.username) navigate("/login");
    sidebar = [
      { name: "My Brackets", href: 1, icon: QueueListIcon, current: true },
      { name: "My Leagues", href: 2, icon: UserGroupIcon, current: false },
      { name: "Profile", href: 3, icon: UserCircleIcon, current: false },
      { name: "Password", href: 4, icon: KeyIcon, current: false },
    ];
  }, []);

  const updateStage = (newStage) => {
    setStage(newStage);
    switch (newStage) {
      case 1:
        sidebar[0].current = true;
        sidebar[1].current = false;
        sidebar[2].current = false;
        sidebar[3].current = false;
        break;
      case 2:
        sidebar[0].current = false;
        sidebar[1].current = true;
        sidebar[2].current = false;
        sidebar[3].current = false;
        break;
      case 3:
        sidebar[0].current = false;
        sidebar[1].current = false;
        sidebar[2].current = true;
        sidebar[3].current = false;
        break;
      case 4:
        sidebar[0].current = false;
        sidebar[1].current = false;
        sidebar[2].current = false;
        sidebar[3].current = true;
        break;
    }
  };
  const [stage, setStage] = useState(1);
  return (
    <main className="relative mt-8 lg:mt-14">
      <div className="mx-auto max-w-prose text-lg">
        <h1>
          <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            My Account
          </span>
        </h1>
      </div>
      <div className="mx-auto mt-6 max-w-screen-xl px-4 pb-6 sm:px-6 lg:mt-8 lg:px-8 lg:pb-16">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <aside className="py-6 lg:col-span-3">
              <nav className="space-y-1">
                {sidebar.map((item) => (
                  <div
                    key={item.name}
                    onClick={() => updateStage(item.href)}
                    className={classNames(
                      item.current
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700"
                        : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                      "group flex cursor-pointer items-center border-l-4 px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-indigo-500 group-hover:text-indigo-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </nav>
            </aside>
            {stage === 1 && <Brackets user={user} />}
            {stage === 2 && <Leagues />}
            {stage === 3 && <Profile user={user} />}
            {stage === 4 && <ChangePassword user={user} />}
          </div>
        </div>
      </div>
    </main>
  );
};
