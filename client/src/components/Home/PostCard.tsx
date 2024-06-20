
const PostCard = () => {
  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <div className="rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <a href="#">
          <img
            className="rounded-t-lg"
            src="https://wallpapers.com/images/high/beautiful-nature-photography-pond-grass-n178l1t68kpbgmy2.webp"
            alt="Post"
          />
        </a>
        <div className="p-6">
          <a href="#">
            <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Craft It 
            <svg
              className="ms-2 h-4 w-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
