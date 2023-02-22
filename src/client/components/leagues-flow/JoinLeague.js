import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

export const JoinLeague = () => {
  const navigate = useNavigate();
  const [queryParams, _] = useSearchParams();
  const code = queryParams.get("code");
  const { user } = useSelector((state) => state.user);
  const { id: leagueId } = useParams();

  useEffect(() => {
    if (user.username) {
      navigate(`/leagues/${leagueId}${code ? `?code=${code}` : ""}`);
    }
  }, [user]);

  return (
    <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
      <div className="text-center">
        <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Sign in to join this league.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
          Please{" "}
          <Link
            to={`/login?return=leagues%2F${leagueId}${code ? `?code=${code}` : ""}`}
            className="font-medium text-indigo-600 hover:underline"
          >
            log in
          </Link>{" "}
          or{" "}
          <Link
            to={`/register?return=leagues%2F${leagueId}${code ? `?code=${code}` : ""}`}
            className="font-medium text-indigo-600 hover:underline"
          >
            create a free account
          </Link>{" "}
          to join this league. We can't wait to see what brackets you'll create.
        </p>
      </div>
    </div>
  );
};
