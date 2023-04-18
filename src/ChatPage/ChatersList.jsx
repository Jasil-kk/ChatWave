import React from "react";
import { FiPlus } from "react-icons/fi";

const ChatersList = () => {
  return (
    <div className="w-[450px] p-4 border border-slate-400 bg-slate-100 rounded-xl drop-shadow-lg">
      <button className="ml-auto mb-5 w-auto h-10 px-5 bg-green-600 hover:bg-green-700 text-slate-50 rounded-lg flex items-center">
        New Chat{" "}
        <span className="text-slate-50 text-xl ml-2">
          <FiPlus />
        </span>
      </button>
      <ul className="max-w-md divide-y divide-gray-300 dark:divide-gray-700">
        <li className="pb-3 sm:pb-4 cursor-pointer rounded-lg hover:bg-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Neil Sims
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4 cursor-pointer rounded-lg hover:bg-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Bonnie Green
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4 cursor-pointer rounded-lg hover:bg-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-2.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Michael Gough
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
          </div>
        </li>
        <li className="py-3 sm:py-4 cursor-pointer rounded-lg hover:bg-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-5.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Thomas Lean
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
          </div>
        </li>
        <li className="pt-3 pb-0 sm:pt-4 cursor-pointer rounded-lg hover:bg-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-4.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                Lana Byrd
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChatersList;
