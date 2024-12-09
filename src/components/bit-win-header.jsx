"use client";
import React from "react";

function BitWinHeader() {
  const { data: user, loading } = useUser();

  return (
    <header className="bg-[#FCFCFC] border-b border-[#D1D1D3] flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
      <nav className="relative max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <a
            className="flex-none font-inter font-medium text-xl text-[#101012] focus:outline-none"
            aria-label="Brand"
          >
            🪙 Patrimônios
          </a>
          <div className="md:hidden">
            <button
              type="button"
              className="relative h-9 w-9 flex justify-center items-center text-sm font-inter font-medium rounded-lg border border-[#D1D1D3] text-[#101012] hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block shrink-0 hidden w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
        <div className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-[#FCFCFC] scrollbar-thumb-[#D1D1D3]">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
              <div className="relative flex items-center gap-x-1.5 md:pl-2 mt-1 md:mt-0 md:ml-1">
                {!loading && user && (
                  <span className="p-2 text-sm text-[#101012]">
                    {user.email}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function BitWinHeaderStory() {
  return (
    <div>
      <BitWinHeader />
    </div>
  );
}

export default BitWinHeader;