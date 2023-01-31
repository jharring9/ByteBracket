import { createSlice } from "@reduxjs/toolkit";

export const lambdaSlice = createSlice({
  name: "bracket",
  initialState: {
    bracket: [],
    finalFour: [],
    champion: -1,
    region: 0,
  },
  reducers: {
    resetBracket: (state) => {
      state.bracket = generateBracket();
      state.finalFour = [
        [
          [-1, -1],
          [-1, -1],
        ],
        [[-1, -1]],
      ];
      state.region = 0;
      state.champion = -1;
    },
    setBracket: (state, action) => {
      state.bracket = action.payload;
    },
    setWinner: (state, action) => {
      const { round, matchup, position, seed } = action.payload;
      const finalFourCopy = JSON.parse(JSON.stringify(state.finalFour));

      // Team is advancing to final four
      if (action.payload.round === 3) {
        finalFourCopy[0][Math.floor(state.region / 2)][state.region % 2] = seed;
        finalFourCopy[1][0][Math.floor(state.region / 2)] = -1;
        state.finalFour = finalFourCopy;
        return;
      }

      // Team is advancing within region
      const bracketCopy = JSON.parse(JSON.stringify(state.bracket));
      bracketCopy[state.region].rounds[round + 1].seeds[
        Math.floor(matchup / 2)
      ][position % 2] = seed;

      // If we are changing winner, set all future seeds on path to -1
      const prevSeed =
        state.bracket[state.region].rounds[round + 1]?.seeds[
          Math.floor(matchup / 2)
        ][matchup % 2];
      const { rounds } = bracketCopy[state.region];
      if (
        prevSeed !== -1 &&
        round + 2 < rounds.length &&
        rounds[round + 2].seeds[Math.floor(matchup / 2 ** (round + 2))][
          Math.floor(matchup / 2 ** (round + 1)) % 2
        ] === prevSeed
      ) {
        for (let i = round + 2; i < rounds.length; i++) {
          rounds[i].seeds[Math.floor(matchup / 2 ** i)][
            Math.floor(matchup / 2 ** (i - 1)) % 2
          ] = -1;
        }
        finalFourCopy[0][Math.floor(state.region / 2)][state.region % 2] = -1;
        finalFourCopy[1][0][Math.floor(state.region / 2)] = -1;
      }

      state.bracket = bracketCopy;
      state.finalFour = finalFourCopy;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setFinalFour: (state, action) => {
      const finalFourCopy = JSON.parse(JSON.stringify(state.finalFour));
      const { round, matchup, position, seed } = action.payload;
      finalFourCopy[round][matchup][position] = seed;
      state.finalFour = action.payload;
    },
    setChampion: (state, action) => {
      state.champion = action.payload;
    },
  },
});

const generateBracket = () => {
  const regions = [
    { name: "East", rounds: [] },
    { name: "West", rounds: [] },
    { name: "South", rounds: [] },
    { name: "Midwest", rounds: [] },
  ];

  regions.forEach((region, i) => {
    const roundOf64 = { id: 64, seeds: [] };
    const m = 16 * i;
    roundOf64.seeds.push(
      [m, 15 + m],
      [7 + m, 8 + m],
      [4 + m, 11 + m],
      [3 + m, 12 + m],
      [5 + m, 10 + m],
      [2 + m, 13 + m],
      [6 + m, 9 + m],
      [1 + m, 14 + m]
    );
    region.rounds.push(roundOf64);

    for (let i = 1; i < 4; i++) {
      const round = { id: 64 / Math.pow(2, i) };
      round.seeds = [...new Array(8 / Math.pow(2, i))].map(() => [-1, -1]);
      region.rounds.push(round);
    }
  });
  return regions;
};

export const {
  resetBracket,
  setBracket,
  setWinner,
  setRegion,
  setFinalFour,
  setChampion,
} = lambdaSlice.actions;
export default lambdaSlice.reducer;
