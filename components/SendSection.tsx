"use client"

export function SendSection() {
  return (
    <div className="flex gap-6 justify-center w-full items-center flex-wrap">
      <button
        type="button"
        className="flex flex-col justify-center items-center shadow-md gap-1 bg-blue-950 p-2 rounded-lg"
      >
        <div className="">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke="#ab9ff2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v18m-9-9h18"
            ></path>
          </svg>
        </div>
        <span className="text-slate-400">Receive</span>
      </button>
      <button
        type="button"
        className="flex flex-col justify-center items-center shadow-md gap-1 "
      >
        <div className="">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke="#ab9ff2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 3 10 14M21 3l-7 20-4-9M21 3 1 10l9 4"
            ></path>
          </svg>
        </div>
        <span className="text-slate-400">Send</span>
      </button>
      <button
        type="button"
        className="flex flex-col justify-center items-center shadow-md gap-1 "
      >
        <div className="">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke="#ab9ff2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 7h16m0 0-4 4m4-4-4-4m2 14H3m0 0 4 4m-4-4 4-4"
            ></path>
          </svg>
        </div>
        <span className="text-slate-400">Swap</span>
      </button>
      <button
        type="button"
        className="flex flex-col justify-center items-center shadow-md gap-1 "
      >
        <div className="">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path
              stroke="#ab9ff2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 1v22m5-18H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"
            ></path>
          </svg>
        </div>
        <span className="text-slate-400">Buy</span>
      </button>
    </div>
  );
}
