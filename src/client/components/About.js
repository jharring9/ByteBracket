import React, { useEffect } from "react";
import { LoadingWrapper } from "./shared";

const people = [
  {
    name: "Lucas Goldman",
    role: "Founder",
    imageUrl:
      "https://bytebracket-webassets.s3.us-east-1.amazonaws.com/lucas.jpg",
    linkedinUrl: "https://www.linkedin.com/in/lucas-goldman/",
  },
  {
    name: "Jack Harrington",
    role: "Founder",
    imageUrl:
      "https://bytebracket-webassets.s3.us-east-1.amazonaws.com/jack.jpg",
    linkedinUrl: "https://www.linkedin.com/in/jharrington22/",
  },
  {
    name: "Joel Dahan",
    role: "Founder",
    imageUrl:
      "https://bytebracket-webassets.s3.us-east-1.amazonaws.com/joel.jpg",
    linkedinUrl: "https://www.linkedin.com/in/joel-dahan-9989851ba/",
  },
  {
    name: "Cason Stone",
    role: "Founder",
    imageUrl:
      "https://bytebracket-webassets.s3.us-east-1.amazonaws.com/cason.jpg",
    linkedinUrl: "https://www.linkedin.com/in/cason-stone-3761421b0/",
  },
];

export const About = () => {
  useEffect(() => {
    document.title = "About - ByteBracket";
  }, []);

  return (
    <LoadingWrapper>
      <div className="relative overflow-hidden bg-white py-16">
        <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          <div
            className="relative mx-auto h-full max-w-prose text-lg"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full translate-x-32 transform"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-lg">
            <h1>
              <div className="block text-center text-lg font-bold text-indigo-600">
                Introducing
              </div>
              <div className="mt-2 block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                ByteBracket
              </div>
            </h1>
            <p className="mt-8 text-justify text-lg leading-8 text-gray-500">
              We wanted to create a tool that allows fans to combine their
              intuitive understanding of sports with cutting-edge analytical
              approaches to prediction. With that, ByteBracket was born with the
              aim of providing everyone with a custom data-driven sports
              prediction experience for free.
            </p>
            <p className="mt-8 text-justify text-lg leading-8 text-gray-500">
              With ByteBracket's formulaic approach to prediction, your
              basketball knowledge, and a little bit of luck, the world's
              first-ever perfect March Madness bracket is finally within reach.
              Our algorithm empowers you to put your understanding of the game
              to the test, arming you with the firepower to achieve the
              impossible.
            </p>
          </div>
          <div className="prose prose-lg prose-indigo mx-auto mt-8 max-w-3xl text-gray-500">
            <h2 className="text-center">How it Works</h2>
            <div className="divide-y-4">
              <div>
                <h3 className="text-xl font-bold">
                  Step 1: Weighing the Statistics
                </h3>
                <p className="text-justify">
                  The user adjusts the slider according to the degree of
                  importance they give each statistic from 0 to 10. These
                  weights are relative to the weight of the other statistics, so
                  giving every statistic a 10 is equivalent to giving each
                  statistic a 1. The pie chart reflects the percentage strength
                  that each statistic has in the algorithm.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Step 2: Creating the Algorithm
                </h3>
                <p className="text-justify">
                  After the user gives their weights for each statistic, we
                  calculate the relative performance of all teams in each
                  statistical category. The weights are then applied to these
                  relative performances and combined to give each team their
                  cumulative score. This cumulative score is used to rank each
                  team and compare them head to head.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">Step 3: Ranking the Field</h3>
                <p className="text-justify">
                  The rankings are done by simply sorting each team by their
                  cumulative score. Comparing each team head to head is slightly
                  more involved, and uses a custom formula that we created based
                  on the differences between the two teams in cumulative score.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  Step 4: Simulating March Madness
                </h3>
                <p className="text-justify">
                  If you choose to simulate your bracket, each game will be
                  simulated based on the displayed winning percentages that each
                  team has, which are generated based on your bracket. The
                  simulation accounts for upsets by including randomness in the
                  calculation.
                </p>
              </div>
            </div>
            <h2 className="text-center">The Team</h2>
            <p className="text-justify">
              The four of us are computer science students in our final few
              months studying at Vanderbilt. We all are sports analytics
              fanatics and hope to improve everyone’s bracket creation process.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl">
            <ul
              role="list"
              className="mx-auto mt-4 grid w-fit grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:gap-x-8 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <img
                    className="w-full rounded-2xl object-cover"
                    src={person.imageUrl}
                    alt=""
                  />
                  <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-base leading-7 text-gray-600">
                    {person.role}
                  </p>
                  <ul role="list" className="mt-6 flex gap-x-6">
                    <li>
                      <a
                        href={person.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
};
