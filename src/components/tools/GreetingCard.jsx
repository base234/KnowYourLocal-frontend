import React from "react";
import { X } from "lucide-react";

const GreetingCard = () => {
  return (
    <div className="max-w-md bg-yellow-100 border-2 border-black shadow-[10px_10px_0_#000] ease-in-out duration-300 hover:-translate-y-2">
      <div className="px-2 py-1 bg-white text-black border-b-2 border-black flex items-center justify-between">
        <span className=" text-sm font-extrabold ">hello_world.exe</span>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-4 py-4 text-xs space-y-4">
        <div>
          <p className="font-mono text-2xl text-center">Hello World!</p>
          <p className="mt-2 font-medium text-center">
            A universally recognized message
          </p>
        </div>
        <p className="font-medium">
          It was first used in 1972 by Brian Kernighan while documenting the
          BCPL language at Bell Labs.
        </p>
        <p className="font-medium">
          Now, many people start learning coding with this to test if the
          computer is ready to write and run programs.
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
