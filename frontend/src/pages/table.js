import React from 'react';
import check from './images/check.png';
import cross from './images/cross.png';
import doulingo from "./images/Duolingo-Symbol.png";
import anki from "./images/anki.png";
import books from "./images/book.png";
function MyTable() {
  return (
    <div class="flex flex-col justify-center items-center ">
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
   <div class="flex flex-col text-center w-full pt-10 "><p class="sm:text-5xl text-4xl font-extrabold leading-loose sm:leading-loose">Why? Because language learning tools are <span class="relative"><span class="relative z-20 p-2   text-white ">boring</span><span class="bg-[#397fd5] absolute inset-x-0 inset-y-1"></span><span class="absolute -top-6 md:-top-7 -left-6 text-base font-normal -rotate-3 md:-rotate-6 __className_18396d caveatS">all the same</span><span class="absolute -top-5 -right-6 text-base font-normal rotate-3  __className_18396d caveatS">generic</span><span class="absolute -bottom-5 -right-5 text-base font-normal -rotate-3 scale-110  __className_18396d caveatS">outdated</span><span class="absolute -bottom-6 -left-8 text-base font-normal scale-90 rotate-1  __className_18396d caveatS">theoratical</span></span><span class="pl-4">🥱</span></p></div>
    <div className="grid grid-cols-4 grid-rows-4 gap-0 w-[40vw]" style={{marginTop: "-8vh"}}>
      {/* Row 1 */}
      <div className="border-b border-gray-200 h-[20vh] flex justify-center items-center">
      </div>
      <div className="border-b border-gray-200  h-[20vh] pt-[10vh]  flex justify-center items-center">Fun</div>
      <div className="border-b border-gray-200  h-[20vh]  pt-[10vh] flex justify-center items-center">Easy</div>
      <div className="border-b border-gray-200  h-[20vh]  pt-[10vh]  flex justify-center items-center">Varied</div>
      
      {/* Row 2 */}
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={doulingo} className="h-[60%]" alt="duolingo" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={check} className="h-[30%]" alt="check" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={check} className="h-[30%]" alt="check" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={cross} className="h-[25%]" alt="cross" />
      </div>

      {/* Row 3 */}
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={anki} className="h-[60%]" alt="anki" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={cross} className="h-[25%]" alt="cross" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={cross} className="h-[25%]" alt="cross" />
      </div>
      <div className="border-b border-gray-200  h-[20vh] flex justify-center items-center">
        <img src={check} className="h-[30%]" alt="check" /> 
      </div>

      {/* Row 4 */}
      <div className=" h-[20vh] flex justify-center items-center">
        <img src={books} className="h-[60%]" alt="books" />
      </div>
      <div className="h-[20vh] flex justify-center items-center">
        <img src={cross} className="h-[25%]" alt="cross" />
      </div>
      <div className="h-[20vh] flex justify-center items-center">
        <img src={check} className="h-[30%]" alt="check" />
      </div>
      <div className=" h-[20vh] flex justify-center items-center">
        <img src={cross} className="h-[25%]" alt="cross" />
      </div>
    </div>
    </div>
  );
};

export default MyTable;
