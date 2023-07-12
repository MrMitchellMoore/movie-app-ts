import { Main } from "@/components/Main";
import { Row } from "@/components/Row";

import { requests } from "@/lib/Requests";

// Code Commerce Netflix
// TODO import Row Component

export default function Home() {
  return (
    <>
      <Main />
      <Row title="Up Coming" fetchURL={requests.requestUpcoming} />
      <Row title="Popular" fetchURL={requests.requestPopular} />
      <Row title="Trending" fetchURL={requests.requestTrending} />
      <Row title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row title="Horror" fetchURL={requests.requestHorror} />
    </>
  );
}
