import React, { useEffect } from "react";
export const SnapbackLanding = () => {
  useEffect(() => {
    document.title = "Snapback x ByteBracket";
  }, []);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="mx-auto flex items-center justify-center">
        <div className="z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-yellow-300 sm:h-64 sm:w-64">
          <img
            src="https://bytebracket-webassets.s3.amazonaws.com/SnapbackSports-Logos-02.png"
            alt="Snapback Sports Logo"
            className="mx-auto h-32 sm:h-52"
          />
        </div>
        <div className="-ml-6 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-indigo-700 sm:-ml-8 sm:h-64 sm:w-64">
          <h1
            className="mt-6 text-9xl text-white sm:mt-8 sm:text-[200px]"
            style={{ fontFamily: "loveloBold" }}
          >
            B
          </h1>
        </div>
      </div>
      <div className="mx-auto max-w-2xl pt-6 sm:pt-10 lg:pt-14">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Join Snapback's Bracket Challenge
          </h1>
          <p className="mt-2 text-2xl font-medium leading-8 text-gray-700">
            for a chance to win{" "}
            <span className="font-bold text-indigo-700">
              $2,500 worth of prizes.
            </span>
          </p>
          <p className="mt-6 text-base leading-8 text-gray-600">
            To join, you must be a member of the Snapback Discord group.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="https://discord.gg/HFsjVKkCMR"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Join Snapback Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
