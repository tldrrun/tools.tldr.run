import React, { useEffect, useState } from "react";
import useSWR from "swr";
import classNames from "classnames";
import { allTools, getTool } from "../../lib/tools";
import Head from "next/head";
import { useRouter } from "next/router";

const tabs = ["README", "Playground"];

export default function ToolDetails({ tool }) {
  const { name, description, url, github_url = "" } = tool || {};

  const router = useRouter();

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    setTabIndex(router.query.playground !== undefined ? 1 : 0);
  }, [router.query.playground]);

  const { data } = useSWR(
    github_url.replace("https://github.com/", "https://api.github.com/repos/")
  );
  const { data: readme } = useSWR(
    github_url.replace(
      "https://github.com/",
      "https://raw.githubusercontent.com/"
    ) + "/HEAD/README.md"
  );

  function changeTab(index) {
    setTabIndex(index);
    switch (index) {
      case 0:
        delete router.query.playground;
        break;
      case 1:
        router.query.playground = "";
    }
    router.push(router);
  }

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <Head>
        <script src="//katacoda.com/embed.js"></script>
      </Head>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2.5 lg:gap-5 mb-5">
        <div className="lg:col-span-2">
          <h2 className="text-2xl lg:text-4xl font-bold mb-2">{name}</h2>
          <p className="text-slate-600 mb-8">{description}</p>
        </div>
        <div className="flex flex-col">
          <p className="flex gap-5 mb-4">
            <a href={url} target="_blank" rel="noopener">
              Official Website ↗
            </a>
            <a href={github_url} target="_blank" rel="noopener">
              GitHub ↗
            </a>
          </p>
          {data && (
            <ul className="list-disc ml-5 text-slate-600">
              <li>{data.stargazers_count} Stars</li>
              <li>{data.forks} Forks</li>
              <li>{data.watchers} Watchers</li>
              <li>{data.open_issues} Open issues</li>
            </ul>
          )}
        </div>
      </div>

      <div className="border border-slate-400">
        {/* Tabs */}
        <div className="flex">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              className={classNames(
                "py-2 px-6 hover:bg-slate-100 border-b mb-4",
                {
                  "border-slate-800": tabIndex === idx,
                  "text-slate-600 border-transparent": tabIndex !== idx,
                }
              )}
              onClick={() => changeTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          <div
            className={classNames({
              hidden: tabIndex !== 0,
            })}
          >
            {readme}
            {!readme && (
              <div>
                Error fetching readme. View in{" "}
                <a href={github_url} target="_blank" rel="noopener">
                  GitHub ↗
                </a>
              </div>
            )}
          </div>
          <div
            className={classNames("h-[620px]", {
              hidden: tabIndex !== 1,
            })}
          >
            <div
              style={{ height: "600px", paddingTop: "20px" }}
              data-katacoda-id="tldrrun/git-leaks"
              id="katacoda-scenario-1"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;

  return {
    props: {
      tool: getTool(`${id}.json`),
    },
  };
}

export async function getStaticPaths() {
  const tools = allTools();
  return {
    paths: tools.map((tool) => ({ params: { id: tool.replace(".json", "") } })),
    fallback: true, // false or 'blocking'
  };
}
