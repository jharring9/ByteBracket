import React from "react";
import { ReadOnlySeed, Round, SeedsList } from "./Styles";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWindowSize } from "./useWindowSize";

export const ReadOnlyBracket = ({ regions }) => {
  const isResponsive = useWindowSize(1300);

  const newRounds = [
    {
      name: "Round of 64",
      seeds: [],
    },
    {
      name: "Round of 32",
      seeds: [],
    },
    {
      name: "Sweet 16",
      seeds: [],
    },
    {
      name: "Elite 8",
      seeds: [],
    },
  ];
  regions.forEach((region, regionIdx) => {
    if (regionIdx === 4) {
      newRounds.push(JSON.parse(JSON.stringify(regions[4].rounds[0])));
      newRounds.push(JSON.parse(JSON.stringify(regions[4].rounds[1])));
      return;
    }
    region.rounds.forEach((round, roundIdx) => {
      round.seeds.forEach((seed) => {
        newRounds[roundIdx].seeds.push([...seed]);
      });
    });
  });

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
          {newRounds.map((round, roundIdx) => (
            <Round key={roundIdx}>
              <SwiperSlide>
                <SeedsList>
                  {round.seeds.map((seed, idx) => (
                    <RenderSeedComponent
                      key={roundIdx + "" + idx}
                      seed={seed}
                      roundIndex={roundIdx}
                      seedIndex={idx}
                      isResponsive={isResponsive}
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
        {newRounds.map((round, roundIdx) => (
          <Round key={roundIdx}>
            <SeedsList>
              {round.seeds.map((seed, idx) => (
                <RenderSeedComponent
                  key={roundIdx + "" + idx}
                  seed={seed}
                  roundIndex={roundIdx}
                  seedIndex={idx}
                  isResponsive={isResponsive}
                />
              ))}
            </SeedsList>
          </Round>
        ))}
      </div>
    );
  }
};

export const RenderSeedComponent = ({ seed }) => {
  const field = useSelector((state) => state.lambda.field);

  return (
    <ReadOnlySeed>
      <div className="relative w-full rounded border-2 border-black bg-white p-0 text-center shadow-md shadow-gray-200">
        <div>
          <div className="m-0 flex whitespace-nowrap p-0 pl-2">
            {field[seed[0]]?.seed + ". "}
            {field[seed[0]]?.name}
          </div>
          <div className="m-0 flex whitespace-nowrap border-t-2 border-gray-700 p-0 pl-2">
            {field[seed[1]]?.seed + ". "}
            {field[seed[1]]?.name}
          </div>
        </div>
      </div>
    </ReadOnlySeed>
  );
};
