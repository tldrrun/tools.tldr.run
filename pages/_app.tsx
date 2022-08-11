import { SWRConfig } from "swr";
import { Footer, Nav } from "../components";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Nav />
      <div className="flex-1">
        <Component {...pageProps} />
      </div>
      <Footer />
    </SWRConfig>
  );
}

export default MyApp;
