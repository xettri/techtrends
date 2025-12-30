import Hero from "../components/home/Hero";
import NewsFeed from "../components/home/NewsFeed";

const Home = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <NewsFeed limit={6} enableInfiniteScroll={false} />
    </div>
  );
};

export default Home;
