import React from "react";
import Marquee from "react-fast-marquee";
// import { Typography } from "@src/components/Typography";
import { listPartner } from "../../constants/home";

const OurPartner = () => {
  return (
    <div
      className="border-t-2 border-b-[6px] border-gray-600 relative overflow-hidden h-[140px] flex items-center"
    >
      <div
        className="text-blue-50 opacity-[0.05000000074505806] font-bold text-center text-[100px] flex justify-center mx-auto whitespace-nowrap items-center absolute left-0 lg:left-[10%] xl:left-[20%]"
      >
        OUR PARTNERS
      </div>

      <Marquee
        speed={30}
        gradient={false}
        direction="left"
        delay={0}
        autoFill={true}
      >
        {listPartner.map((e, idx) => (
          <div
            key={`item-partner-${idx}-${e.title}`}
            className="w-[180px] flex items-center"
          >
            <div
              className="w-full mx-auto flex items-center gap-2 px-3 justify-center"
            >
              <div className="bg-white rounded-full">
                <img
                  alt={e.title}
                  src={e?.imageUrl}
                  className="w-[30px] h-[30px] rounded-full"
                />
              </div>
              <span className="text-white" type="headline6">
                {e?.title}
              </span>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OurPartner;