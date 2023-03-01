import styled from "styled-components";

export const Round = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: 992px) {
    min-width: 0;
  }
`;

export const SeedsList = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-flow: row wrap;
  justify-content: center;
  height: 100%;
  list-style: none;
`;

export const Seed = styled.div`
  padding: 1em 1.5em;
  min-width: ${(props) => (props.isMobile ? 250 : 300)}px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (min-width: 200px) {
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
      border-bottom-right-radius: 5px;
    }
    &:nth-child(odd):not(:last-child)::after {
      border-top: 2px solid #707070;
      top: calc(50% - 0.5px);
      border-right: 2px solid #707070;
      border-top-right-radius: 5px;
    }
  }
`;

export const ReadOnlySeed = styled.div`
  padding: .75em 1em;
  min-width: 100px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  font-size: 10px;
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (min-width: 200px) {
    &::after {
      content: "";
      position: absolute;
      height: 50%;
      width: 1em;
      ${(props) => props.align}: 0;
    }
    &:nth-child(even)::before {
      content: "";
      border-top: 1px solid #374151;
      position: absolute;
      top: -0.5px;
      width: 1em;
      ${(props) => (props.align === "left" ? "left" : "right")}: -1em;
    }
    &:nth-child(even)::after {
      border-bottom: 1px solid #374151;
      top: -0.5px;
      ${(props) => props.align}: 0;
      border-${(props) =>
        props.align === "left" ? "left" : "right"}: 1px solid #374151;
      border-bottom-${(props) =>
        props.align === "left" ? "left" : "right"}-radius: 5px;
    }
    &:nth-child(odd):not(:last-child)::after {
      border-top: 1px solid #374151;
      top: 50%;
      border-${(props) =>
        props.align === "left" ? "left" : "right"}: 1px solid #374151;
      outline-offset: 3px;
      border-top-${(props) =>
        props.align === "left" ? "left" : "right"}-radius: 5px;
    }
  }
`;

export const ChampionshipSeed = styled.div`
  padding: 1em 1.5em;
  min-width: 165px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex: auto;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
`;
