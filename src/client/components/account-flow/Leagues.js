import React, { useEffect, useState } from "react";
import { LoadingWrapper } from "../shared";
import { LeagueList } from "../Leagues";

export const Leagues = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getLeagues = async () => {
      await fetch("/v1/leagues/my")
        .then(async (res) => await res.json())
        .then((data) => setLeagues(data));
      setLoading(false);
    };
    getLeagues();
  }, []);

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg font-medium leading-6 text-gray-900">
            Leagues
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            See the leagues associated with your account.
          </p>
        </div>
        <LoadingWrapper isLoading={loading}>
          <LeagueList leagues={leagues} />
        </LoadingWrapper>
      </div>
    </div>
  );
};
