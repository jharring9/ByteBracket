import React from "react";
import { useNavigate } from "react-router-dom";
import { BracketArt } from "./shared";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="mx-auto mt-16 max-w-7xl px-4 px-6 sm:mt-24 lg:mt-32">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
          <h1>
            <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
              Coming soon
            </span>
            <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              <span className="block text-gray-900">Where sports data</span>
              <span className="block">
                meets <span className="text-indigo-600">intuition.</span>
              </span>
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua ad ad non deserunt sunt.
          </p>
          <div className="mt-5 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
            <button
              type="submit"
              className="mt-3 w-full rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:inline-flex sm:w-auto sm:flex-shrink-0 sm:items-center"
              onClick={() => navigate("/create")}
            >
              Get Started
            </button>
          </div>
        </div>
        <BracketArt />
      </div>
    </main>
  );
};
