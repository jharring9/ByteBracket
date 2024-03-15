import React from "react";
import { ChampionshipSeed, ReadOnlySeed, Round, SeedsList } from "./Styles";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWindowSize } from "./useWindowSize";
import { ShareButton } from "../shared";

export const ReadOnlyBracket = ({
  regions,
  champion,
  master,
  masterChampion,
  bracketName,
  bracketCreator,
  onShare,
}) => {
  const isResponsive = useWindowSize(1300);
  const rounds = createRounds(regions, isResponsive);
  if (master) {
    master = createRounds(master, isResponsive);
  }

  if (isResponsive) {
    return (
      <div className="flex justify-center">
        <Swiper
          breakpoints={{
            375: {
              width: 340,
              slidesPerView: 2,
            },
            390: {
              width: 365,
              slidesPerView: 2,
            },
            410: {
              width: 380,
              slidesPerView: 2,
            },
            750: {
              width: 700,
              slidesPerView: 3,
            },
            810: {
              width: 770,
              slidesPerView: 4,
            },
            992: {
              width: 980,
              slidesPerView: 5,
            },
          }}
        >
          {rounds.map((round, roundIdx) => (
            <Round key={roundIdx}>
              <SwiperSlide>
                <SeedsList>
                  {round.seeds.map((seed, idx) => (
                    <RenderSeedComponent
                      roundIdx={roundIdx}
                      seedIdx={idx}
                      rounds={rounds}
                      key={roundIdx + "" + idx}
                      seed={seed}
                      mobile={true}
                    />
                  ))}
                </SeedsList>
              </SwiperSlide>
            </Round>
          ))}
        </Swiper>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center">
        {rounds.map((round, roundIdx) => (
          <Round key={roundIdx}>
            <SeedsList>
              {round.seeds.map((seed, idx) => (
                <RenderSeedComponent
                  roundIdx={roundIdx}
                  seedIdx={idx}
                  rounds={rounds}
                  key={roundIdx + "" + idx}
                  seed={seed}
                  mobile={false}
                  champion={champion}
                  masterRounds={master}
                  masterChampion={masterChampion}
                  bracketName={bracketName}
                  bracketCreator={bracketCreator}
                  onShare={onShare}
                />
              ))}
            </SeedsList>
          </Round>
        ))}
      </div>
    );
  }
};

export const RenderSeedComponent = ({
  seed,
  rounds,
  roundIdx,
  seedIdx,
  mobile,
  champion,
  masterRounds,
  masterChampion,
  bracketName,
  bracketCreator,
  onShare,
}) => {
  const { logos, field } = useSelector((state) => state.lambda);

  /**
   * Generates the styling for a particular read-only bracket matchup.
   */
  const resultsStyle = (position) => {
    /* If the master bracket isn't passed, use basic style */
    if (!masterRounds || mobile) {
      return ["m-0 flex whitespace-nowrap p-0 px-2 ", null];
    }

    try {
      /*
       * styleStr is the string of classes that will be applied to the matchup.
       * teamStr is the team that actually exists in this matchup (if different from user's pick).
       */
      let styleStr = "m-0 flex whitespace-nowrap p-0 px-2 ";
      let teamStr = null;

      /*
       * currPos is the team in this position in the tournament.
       * masterPos is the winner of this matchup in the tournament.
       * userPos is the winner of this matchup in the user's bracket.
       */
      let currPos = masterRounds?.[roundIdx].seeds[seedIdx][position];
      let masterPos;
      let userPos;

      if (roundIdx <= 4) {
        /* Set next-round variables for left side of bracket */
        masterPos =
          masterRounds[roundIdx + 1].seeds[Math.floor(seedIdx / 2)][
            seedIdx % 2
          ];
        userPos =
          rounds[roundIdx + 1].seeds[Math.floor(seedIdx / 2)][seedIdx % 2];
      } else if (roundIdx === 5) {
        /* Set next-round variables for championship round */
        masterPos = masterChampion;
        userPos = champion;
      } else {
        /* Set next-round variables for right side of bracket */
        masterPos =
          masterRounds[roundIdx - 1].seeds[Math.floor(seedIdx / 2)][
            seedIdx % 2
          ];
        userPos =
          rounds[roundIdx - 1].seeds[Math.floor(seedIdx / 2)][seedIdx % 2];
      }

      if (
        seed[position] !== currPos &&
        currPos !== -1 &&
        roundIdx !== 0 &&
        roundIdx !== 10
      ) {
        /* Check if the current seed is wrong (from a previous incorrect pick) */
        styleStr += " line-through";
        teamStr = `${field[currPos]?.seed}. ${field[currPos]?.name}`;
      } else if (seed[position] === masterPos && seed[position] === userPos) {
        /* The current pick is correct */
        styleStr += " bg-green-200 font-bold rounded text-black";
      } else if (
        /* The current pick is incorrect */
        seed[position] !== masterPos &&
        seed[position] === userPos &&
        masterPos !== -1
      ) {
        styleStr += " bg-red-200 font-bold rounded text-black";
      }
      return [styleStr, teamStr];
    } catch (e) {
      /* If there was an error, use basic styling */
      return ["m-0 flex whitespace-nowrap p-0 px-2 ", null];
    }
  };
  const [styleStr1, teamStr1] = resultsStyle(0);
  const [styleStr2, teamStr2] = resultsStyle(1);

  if (!mobile && roundIdx === 5) {
    return (
      <>
        {bracketName && bracketCreator && (
          <div className="absolute top-10 flex items-center justify-center">
            <div className="mx-auto hidden max-w-xl space-y-4 xl:block">
              <h1 className="text-center text-center text-3xl font-bold text-gray-900">
                {bracketName}
              </h1>
              <p className="text-center text-gray-600">
                Created by {bracketCreator}
              </p>
            </div>
          </div>
        )}
        <div className="absolute top-36 flex items-center justify-center">
          {typeof champion === "number" && (
            <img
              src={logos[field[champion]?.name]}
              alt="team logo"
              className="h-48 w-auto max-w-[300px]"
            />
          )}
        </div>
        <ChampionshipSeed>
          <div className="relative w-full rounded border-2 border-black bg-white p-0 text-center text-gray-700 shadow-md shadow-gray-200">
            <div>
              <div className={styleStr1}>
                {field[seed[0]]?.seed + ". "}
                {field[seed[0]]?.name}
              </div>
              <div className={styleStr2}>
                {field[seed[1]]?.seed + ". "}
                {field[seed[1]]?.name}
              </div>
            </div>
          </div>
        </ChampionshipSeed>
        {/*<div className="absolute bottom-52 flex items-center justify-center">*/}
        {/*  <div className="z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-yellow-300">*/}
        {/*    <img*/}
        {/*      src="https://bytebracket-webassets.s3.amazonaws.com/SnapbackSports-Logos-02.png"*/}
        {/*      alt="Snapback Sports Logo"*/}
        {/*      className="mx-auto h-24"*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  <div className="-ml-6 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-indigo-700">*/}
        {/*    <h1*/}
        {/*      className="mt-6 text-8xl text-white"*/}
        {/*      style={{ fontFamily: "loveloBold" }}*/}
        {/*    >*/}
        {/*      B*/}
        {/*    </h1>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {onShare && (
          <div className="absolute bottom-20 flex items-center justify-center">
            <div className="mb-4 flex w-full justify-center">
              <div className="mt-4 flex justify-center lg:mt-2 lg:justify-start">
                <ShareButton onClick={onShare} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <ReadOnlySeed align={!mobile && roundIdx >= 5 ? "left" : "right"}>
        <div className="absolute left-5 m-0 flex -translate-y-6 whitespace-nowrap p-0 text-gray-400">
          {teamStr1}
        </div>
        <div className="relative w-full rounded border border-black bg-white p-0 text-center text-gray-700 shadow-md shadow-gray-200">
          <div>
            <div className={styleStr1}>
              {field[seed[0]]?.seed + ". "}
              {field[seed[0]]?.name}
            </div>
            <div className={styleStr2}>
              {field[seed[1]]?.seed + ". "}
              {field[seed[1]]?.name}
            </div>
          </div>
        </div>
        <div className="absolute left-5 m-0 flex translate-y-6 whitespace-nowrap p-0 text-gray-400">
          {teamStr2}
        </div>
      </ReadOnlySeed>
    );
  }
};

const createRounds = (regions, isResponsive) => {
  let newRounds = isResponsive
    ? [
        { name: "Round of 64", seeds: [] },
        { name: "Round of 32", seeds: [] },
        { name: "Sweet 16", seeds: [] },
        { name: "Elite 8", seeds: [] },
      ]
    : [
        { name: "Round of 64 - Left", seeds: [] },
        { name: "Round of 32 - Left", seeds: [] },
        { name: "Sweet 16 - Left", seeds: [] },
        { name: "Elite 8 - Left", seeds: [] },
        { name: "Final Four - Left", seeds: [] },
        { name: "Championship", seeds: [] },
        { name: "Final Four - Right", seeds: [] },
        { name: "Elite 8 - Right", seeds: [] },
        { name: "Sweet 16 - Right", seeds: [] },
        { name: "Round of 32 - Right", seeds: [] },
        { name: "Round of 64 - Right", seeds: [] },
      ];
  regions.forEach((region, regionIdx) => {
    if (regionIdx === 4) {
      if (isResponsive) {
        newRounds.push(JSON.parse(JSON.stringify(regions[4].rounds[0])));
        newRounds.push(JSON.parse(JSON.stringify(regions[4].rounds[1])));
      } else {
        newRounds[4].seeds.push(regions[4].rounds[0].seeds[0]);
        newRounds[5].seeds.push(regions[4].rounds[1].seeds[0]);
        newRounds[6].seeds.push(regions[4].rounds[0].seeds[1]);
      }
      return;
    }
    region.rounds.forEach((round, roundIdx) => {
      round.seeds.forEach((seed) => {
        if (isResponsive) {
          newRounds[roundIdx].seeds.push([...seed]);
        } else {
          newRounds[regionIdx < 2 ? roundIdx : 10 - roundIdx].seeds.push(seed);
        }
      });
    });
  });
  return newRounds;
};
