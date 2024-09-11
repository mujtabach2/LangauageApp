import React from 'react';
import check from './images/check.png';
import cross from './images/cross.png';
import doulingo from "./images/Duolingo-Symbol.png";
import anki from "./images/anki.png";
import books from "./images/book.png";
function MyTable() {
  return (
    <div className="flex flex-col justify-center items-center w-full px-4">
      <style>
        {`
        .caveatS {
          font-family: "Caveat", cursive;
          font-optical-sizing: auto;
          font-weight: 400;
          font-style: normal;
        }
        `}
      </style>
      <div className="flex flex-col text-center w-full pt-10">
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight sm:leading-loose">
          Why? Because language learning tools are <span className="relative">
            <span className="relative z-20 p-1 sm:p-2 text-white">boring</span>
            <span className="bg-[#397fd5] absolute inset-x-0 inset-y-1"></span>
            <span className="absolute -top-4 sm:-top-6 md:-top-7 -left-4 sm:-left-6 text-xs sm:text-sm md:text-base font-normal -rotate-3 md:-rotate-6 caveatS">all the same</span>
            <span className="absolute -top-3 sm:-top-5 -right-4 sm:-right-6 text-xs sm:text-sm md:text-base font-normal rotate-3 caveatS">generic</span>
            <span className="absolute -bottom-3 sm:-bottom-5 -right-3 sm:-right-5 text-xs sm:text-sm md:text-base font-normal -rotate-3 scale-110 caveatS">outdated</span>
            <span className="absolute -bottom-4 sm:-bottom-6 -left-6 sm:-left-8 text-xs sm:text-sm md:text-base font-normal scale-90 rotate-1 caveatS">theoretical</span>
          </span><span className="pl-2 sm:pl-4">🥱</span>
        </p>
      </div>
      <div className="grid grid-cols-4 grid-rows-4 gap-0 w-full max-w-3xl mt-8 sm:mt-12">
        {/* Row 1 */}
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center"></div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center text-sm sm:text-base">Fun</div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center text-sm sm:text-base">Easy</div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center text-sm sm:text-base">Varied</div>
        
        {/* Row 2 */}
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={doulingo} className="h-8 sm:h-12" alt="duolingo" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={check} className="h-4 sm:h-6" alt="check" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={check} className="h-4 sm:h-6" alt="check" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={cross} className="h-3 sm:h-5" alt="cross" />
        </div>

        {/* Row 3 */}
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={anki} className="h-8 sm:h-12" alt="anki" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={cross} className="h-3 sm:h-5" alt="cross" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={cross} className="h-3 sm:h-5" alt="cross" />
        </div>
        <div className="border-b border-gray-200 h-16 sm:h-20 flex justify-center items-center">
          <img src={check} className="h-4 sm:h-6" alt="check" /> 
        </div>

        {/* Row 4 */}
        <div className="h-16 sm:h-20 flex justify-center items-center">
          <img src={books} className="h-8 sm:h-12" alt="books" />
        </div>
        <div className="h-16 sm:h-20 flex justify-center items-center">
          <img src={cross} className="h-3 sm:h-5" alt="cross" />
        </div>
        <div className="h-16 sm:h-20 flex justify-center items-center">
          <img src={check} className="h-4 sm:h-6" alt="check" />
        </div>
        <div className="h-16 sm:h-20 flex justify-center items-center">
          <img src={cross} className="h-3 sm:h-5" alt="cross" />
        </div>
      </div>
    </div>
  );
};

export default MyTable;
