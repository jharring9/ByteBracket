import React, { useEffect, useState } from "react";
import { Round, Seed, SeedsList } from "./Styles";
import { useDispatch, useSelector } from "react-redux";
import { setWinner } from "../../store/bracketSlice";
import { classNames } from "../icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useWindowSize } from "./useWindowSize";

export const SingleSided = ({ rounds }) => {
  const isResponsive = useWindowSize(1300);
  const [swiperRef, setSwiperRef] = useState(null);
  const { region } = useSelector((state) => state.bracket);

  useEffect(() => {
    if (isResponsive) {
      swiperRef?.slideTo(0);
    }
  }, [region, swiperRef]);

  if (isResponsive) {
    return (
      <div className="flex justify-center">
        <Swiper
          onSwiper={setSwiperRef}
          breakpoints={{
            375: {
              width: 250,
              slidesPerView: 1,
            },
            390: {
              width: 265,
              slidesPerView: 1,
            },
            410: {
              width: 290,
              slidesPerView: 1,
            },
            750: {
              width: 612,
              slidesPerView: 2,
            },
            810: {
              width: 660,
              slidesPerView: 2,
            },
            992: {
              width: 940,
              slidesPerView: 3,
            },
          }}
        >
          {rounds.map((round, roundIdx) => (
            <Round key={roundIdx}>
              <SwiperSlide>
                <SeedsList>
                  {round.seeds.map((seed, idx) => (
                    <RenderSeedComponent
                      key={roundIdx + "" + idx}
                      seed={seed}
                      roundIndex={roundIdx}
                      seedIndex={idx}
                      rounds={rounds}
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
        {rounds.map((round, roundIdx) => (
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

export const RenderSeedComponent = ({
  seed,
  roundIndex,
  seedIndex,
  isResponsive,
}) => {
  const { logos } = useSelector((state) => state.lambda);
  const dispatch = useDispatch();
  const field = useSelector((state) => state.lambda.field);
  const { region, bracket, champion } = useSelector((state) => state.bracket);
  const chance = winPercent(
    field[seed[0]]?.percentile,
    field[seed[1]]?.percentile
  );

  const style = (pos) => {
    let str = "flex pt-1.5 pl-2";
    if (seed[pos] !== -1) {
      str += " cursor-pointer text-black hover:bg-green-100";
      let nextPos;
      if (roundIndex === 3)
        nextPos =
          bracket[4]?.rounds[0]?.seeds[Math.floor(region / 2)][region % 2];
      else if (region === 4 && roundIndex === 1) nextPos = champion;
      else
        nextPos =
          bracket[region]?.rounds[roundIndex + 1]?.seeds[
            Math.floor(seedIndex / 2)
          ][seedIndex % 2];
      if (seed[pos] === nextPos) str += " bg-green-200 font-bold";
      else if (nextPos !== -1) str += " font-normal text-gray-400";
    } else str += " text-gray-500";
    return str;
  };

  return (
    <Seed isMobile={isResponsive}>
      <div className="relative w-full rounded border-2 border-black bg-white p-0 text-center shadow-md shadow-gray-200">
        <div>
          <div
            className={style(0)}
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
            {logos[field[seed[0]]?.name] && (
              <img
                src={logos[field[seed[0]]?.name]}
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
                {seed[1] !== -1 && (
                  <div
                    className={classNames(
                      chance >= 50
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "absolute right-1 items-baseline rounded-full py-0.5 px-1 text-xs"
                    )}
                  >
                    {chance}%
                  </div>
                )}
              </div>
            ) : (
              "-----------"
            )}
          </div>
          <div
            className={style(1) + " border-t-2 border-gray-200"}
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
            {logos[field[seed[1]]?.name] && (
              <img
                src={logos[field[seed[1]]?.name]}
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
                {seed[0] !== -1 && (
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
                )}
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

export const winPercent = (p1, p2) => {
  return p1 && p2
    ? (100 * (1 / (50 ** -(p1 - p2) + 1)).toFixed(2)).toFixed(0)
    : 100;
};
