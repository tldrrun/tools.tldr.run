import Head from "next/head";
import { Hero } from "../components";
import { ToolCard } from "../components/ui";
import { getFeaturedTools, getTools } from "../lib/tools";

export default function Home({ tools, featuresTools }) {
  return (
    <div>
      <Head>
        <title>TLDR.run</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero />

        <section id="tools">
          <h3 className="text-center font-bold text-2xl mt-4">
            Featured tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 p-8">
            {featuresTools.map((tool) => (
              <ToolCard key={tool.id} featured {...tool} />
            ))}
          </div>
        </section>

        <section id="tools">
          <h3 className="text-center font-bold text-2xl mt-4">
            All Security tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 p-8">
            {tools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tools: getTools({}),
      featuresTools: getFeaturedTools(),
    },
  };
}
