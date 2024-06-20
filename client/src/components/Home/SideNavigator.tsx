import React from "react";
import Weather from "./Weather";

const SideNavigator = () => {
  return (
    <div>
      <div
        id="drawer-navigation"
        className="fixed left-0 top-0 z-40 h-screen w-64 bg-white p-4 transition-transform dark:bg-gray-800"
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-2xl font-semibold uppercase text-gray-500 dark:text-gray-400"
        >
          CrowdCraft
        </h5>
        <div className="overflow-y-auto py-4">
          <ul className="space-y-6 font-medium">
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-lg text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-lg text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <svg
                  className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path d="M15 12a1 1 0 0 0 .993-.883l.007-.117V8h2a1 1 0 0 0 .117-1.993L18 6h-2V4a1 1 0 0 0-.883-.993L15 3a1 1 0 0 0-1 .883l-.007.117v2H8V4a1 1 0 0 0-.883-.993L7 3a1 1 0 0 0-1 .883L6 4v2H4a1 1 0 0 0-.993.883L3 7a1 1 0 0 0 .883.993L4 8h2v3a1 1 0 0 0 .883.993L7 12h8Zm-6-2v2H8V8h1v2Zm4 0V8h-1v2h1ZM9 0c4.522 0 8 3.478 8 8s-3.478 8-8 8S1 12.522 1 8 4.478 0 9 0Z" />
                </svg>
                <span className="ml-3">Inbox</span>
                <span className="ml-auto inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                  3
                </span>
              </button>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-lg text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3">Calendar</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="group flex items-center rounded-lg p-2 text-lg text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.5 13a.5.5 0 0 1 .5-.5H11V6H8v4.5A1.5 1.5 0 0 1 6.5 12h-4A1.5 1.5 0 0 1 1 10.5v-7A1.5 1.5 0 0 1 2.5 2h15A1.5 1.5 0 0 1 19 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5V6H9v6.5a.5.5 0 0 1-.5.5h-4Z" />
                  <path d="M11.5 14h-3A2.5 2.5 0 0 0 6 16.5v2A2.5 2.5 0 0 0 8.5 21h3a2.5 2.5 0 0 0 2.5-2.5v-2A2.5 2.5 0 0 0 11.5 14Z" />
                </svg>
                <span className="ml-3">Settings</span>
              </a>
            </li>
          </ul>
      <Weather />
        </div>

      </div>

    </div>
  );
};

export default SideNavigator;
