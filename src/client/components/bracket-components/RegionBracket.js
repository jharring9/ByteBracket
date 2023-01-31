import React from "react";
import { Bracket } from "react-brackets";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "../icons";
import { setWinner } from "../../store/bracketSlice";

export const RegionBracket = ({ rounds }) => {
  return (
    <Bracket
      rounds={rounds}
      renderSeedComponent={renderSeed}
      bracketClassName="flex justify-center"
      mobileBreakpoint={500}
    />
  );
};

const winPercent = (p1, p2) => {
  return p1 && p2
    ? (100 * (1 / (10 ** -(p1 - p2) + 1)).toFixed(2)).toFixed(0)
    : 100;
};
const renderSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  const dispatch = useDispatch();
  const field = useSelector((state) => state.lambda.field);
  const region = useSelector((state) => state.bracket.region);
  const chance = winPercent(
    field[seed[0]]?.percentile,
    field[seed[1]]?.percentile
  );

  return (
    <Seed mobileBreakpoint={breakpoint}>
      <div className="relative w-full rounded border-2 border-indigo-700 bg-white p-0 text-center shadow-md shadow-gray-200">
        <div>
          <div
            className={classNames(
              seed[0] !== -1
                ? "cursor-pointer font-bold text-black hover:bg-indigo-200"
                : "text-gray-500",
              "flex rounded-sm pt-1.5 pl-2"
            )}
            onClick={() =>
              dispatch(
                setWinner({
                  region: region,
                  round: roundIndex,
                  matchup: seedIndex,
                  position: seedIndex,
                  seed: seed[0],
                })
              )
            }
          >
            {field[seed[0]]?.logo && (
              <img
                src={field[seed[0]].logo}
                alt="team logo"
                className="mr-2 mb-1 h-6 w-6"
              />
            )}
            {seed[0] !== -1 ? (
              <div className="flex flex-row">
                <span>
                  {field[seed[0]]?.seed + ". "}
                  {field[seed[0]]?.name}
                </span>
                <div
                  className={classNames(
                    chance >= 50
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "absolute right-1 items-baseline rounded-full py-0.5 px-0.5 text-xs"
                  )}
                >
                  {chance}%
                </div>
              </div>
            ) : (
              "-----------"
            )}
          </div>
          <div
            className={classNames(
              seed[1] !== -1
                ? "cursor-pointer font-bold text-black hover:bg-indigo-200"
                : "text-gray-500",
              "flex rounded-sm pt-1.5 pl-2"
            )}
            onClick={() =>
              dispatch(
                setWinner({
                  region: region,
                  round: roundIndex,
                  matchup: seedIndex,
                  position: seedIndex,
                  seed: seed[1],
                })
              )
            }
          >
            {field[seed[1]]?.logo && (
              <img
                src={field[seed[1]].logo}
                alt="team logo"
                className="mr-2 mb-1 h-6 w-6"
              />
            )}
            {seed[1] !== -1 ? (
              <>
                <span>
                  {field[seed[1]]?.seed + ". "}
                  {field[seed[1]]?.name}
                </span>
                <div
                  className={classNames(
                    chance < 50
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800",
                    "absolute right-1 items-baseline rounded-full py-0.5 px-1 text-xs"
                  )}
                >
                  {100 - chance}%
                </div>
              </>
            ) : (
              "-----------"
            )}
          </div>
        </div>
      </div>
    </Seed>
  );
};

export const Seed = styled.div`
  padding: 1em 1.5em;
  min-width: 300px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  @media (max-width: 500px) {
    width: 100%;
  }
  @media (min-width: 500px) {
    &::after {
      content: "";
      position: absolute;
      height: 50%;
      width: 1.5em;
      right: 0;
    }
    &:nth-child(even)::before {
      content: "";
      border-top: 2px solid #707070;
      position: absolute;
      top: -0.5px;
      width: 1.5em;
      right: -1.5em;
    }
    &:nth-child(even)::after {
      border-bottom: 2px solid #707070;
      top: -0.5px;
      border-right: 2px solid #707070;
    }
    &:nth-child(odd):not(:last-child)::after {
      border-top: 2px solid #707070;
      top: calc(50% - 0.5px);
      border-right: 2px solid #707070;
    }
  }
`;
