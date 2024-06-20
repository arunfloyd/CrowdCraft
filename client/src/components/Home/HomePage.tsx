import { useRef } from "react";
import PostCard from "./PostCard";
import SideNavigator from "./SideNavigator";
import FooterPage from "./FooterPage";

const HomePage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (scrollOffset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center dark:bg-gray-900">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          The Craft Never Done By A Community
        </h1>
        <p className="mb-6 text-xl font-normal text-gray-800 dark:text-gray-400 sm:px-16 lg:text-xl xl:px-48 ">
          Welcome to CrowdCraft!! Here we can craft our Community into the next
          level together.
        </p>
        <div
          ref={scrollRef}
          className="flex h-[70vh] w-full max-w-2xl flex-col items-center overflow-y-hidden"
          onWheel={(e) => handleScroll(e.deltaY)}
        >
          <SideNavigator />

          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
      <FooterPage />
    </>
  );
};

export default HomePage;
