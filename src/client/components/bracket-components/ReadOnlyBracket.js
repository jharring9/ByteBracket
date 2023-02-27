import React from "react";
import { ChampionshipSeed, ReadOnlySeed, Round, SeedsList } from "./Styles";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWindowSize } from "./useWindowSize";

export const ReadOnlyBracket = ({ regions, champion }) => {
  const isResponsive = useWindowSize(1300);
  const rounds = createRounds(regions, isResponsive);
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
}) => {
  const { logos, field } = useSelector((state) => state.lambda);

  const style = (position) => {
    let str = "m-0 flex whitespace-nowrap p-0 pl-2";
    if (roundIdx === 5 && seed[position] === champion) {
      str += " font-bold";
    } else if (
      roundIdx < 5 &&
      seed[position] ===
        rounds[roundIdx + 1].seeds[Math.floor(seedIdx / 2)][seedIdx % 2]
    ) {
      str += " font-bold";
    } else if (
      roundIdx > 5 &&
      seed[position] ===
        rounds[roundIdx - 1].seeds[Math.floor(seedIdx / 2)][seedIdx % 2]
    ) {
      str += " font-bold";
    } else if (
      roundIdx === 6 &&
      seed[position] === rounds[roundIdx - 1].seeds[0][1]
    ) {
      str += " font-bold";
    }
    return str;
  };

  if (!mobile && roundIdx === 5) {
    return (
      <>
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
              <div className={style(0)}>
                {field[seed[0]]?.seed + ". "}
                {field[seed[0]]?.name}
              </div>
              <div className={style(1)}>
                {field[seed[1]]?.seed + ". "}
                {field[seed[1]]?.name}
              </div>
            </div>
          </div>
        </ChampionshipSeed>
      </>
    );
  } else {
    return (
      <ReadOnlySeed align={!mobile && roundIdx >= 5 ? "left" : "right"}>
        <div className="relative w-full rounded border border-black bg-white p-0 text-center text-gray-700 shadow-md shadow-gray-200">
          <div>
            <div className={style(0)}>
              {field[seed[0]]?.seed + ". "}
              {field[seed[0]]?.name}
            </div>
            <div className={style(1)}>
              {field[seed[1]]?.seed + ". "}
              {field[seed[1]]?.name}
            </div>
          </div>
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
