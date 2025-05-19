
import React from "react";
import dayjs from "dayjs";

const Roadmap = () => {
  const roadmap = [
    {
      name: "q1",
      precious: "Q2, 2025",
      quarter: 4,
      year: 2025,
      endTime: "2025-05",
      contentOne: "Launch Presale on PinkSale/DxSale",
      contentTwo:
        "PancakeSwap TGE & lock LP (12+ months).",
      contentThree:
        "Finalize NAMO dashboard (burn, reflection, holders)",
      contentFourth:
        "Submit to CoinMarketCap & CoinGecko",
    },
    {
      name: "q2",
      precious: "Q3, 2025",
      quarter: 3,
      year: 2025,
      endTime: "2023-12-31",
      contentOne:
        "Publish Certik/SolidProof audit• Launch 90-day staking program",
      contentTwo:
        " Start 3% fee-funded Voter Awareness Campaign (5 districts)",
      contentThree:
        "First 10% scheduled burn event"
    },
    {
      name: "q3",
      precious: "Q4, 2025",
      quarter: 4,
      year: 2025,
      endTime: "2024-03-31",
      contentOne:
        "Secure Tier-2 CEX listings (e.g., MEXC, Gate.io)",
      contentTwo:
        "Open Gram Panchayat funding portal.",
      contentThree:
        "Host AMAs, meme contests, and YouTube influencer push.",
      contentFourth:
        "Host AMAs, meme contests, and YouTube influencer push.",
    },
    {
      name: "q4",
      precious: "Q1, 2026",
      quarter: 2,
      year: 2024,
      endTime: "2024-06-30",
      contentOne:
        "Secure Tier-2 CEX listings (e.g., MEXC, Gate.io).",
      contentTwo:
        "Enable community voting on village projects.",
      contentThree:
        "Expand Voter Awareness Campaign to 15+ districts.",
      contentFourth:
        "Launch MODI DAO Info Hub.",
    },
    {
      name: "q5",
      precious: "Q2, 2026",
      quarter: 4,
      year: 2024,
      endTime: "2024-06-30",
      contentOne:
        "Begin DAO voting on burn %, treasury use, and fee changes.",
      contentTwo:
        "Launch open-source governance tracker.",
      contentThree:
        "MODI branded merchandise pilo.",
      contentFourth:
        "Release Dashboard v2 with Telegram Bot.",
    },
    {
      name: "q6",
      precious: "Q3, 2026",
      quarter: 2,
      year: 2024,
      endTime: "2024-06-30",
      contentOne:
        "Secure Tier-1 CEX listing (KuCoin/OKX).",
      contentTwo:
        "Collaborate with Bollywood & YouTube personalities.",
      contentThree:
        "Fund 10+ rural Gram Panchayat projects.",
      contentFourth:
        "Launch MODI Impact Report Portal.",
    },
    {
      name: "q7",
      precious: "Q4, 2026",
      quarter: 2,
      year: 2024,
      endTime: "2024-06-30",
      contentOne:
        "Launch MODI Prepaid Card Pilot.",
      contentTwo:
        "Release Gram Panchayat Leaderboard.",
      contentThree:
        "Publish audited treasury & social impact report.",
      contentFourth:
        "Pre-announce MODI Chain (2027 Vision).",
    },
  ];

  const currentDate = dayjs();
  const currentQuarter = Math.floor((currentDate.month() + 3) / 3);
  const currentYear = currentDate.year();

  const firstDayOfNextQuarter = dayjs()
    .year(currentYear)
    .month(currentQuarter * 3 - 1)
    .startOf("month");

  const lastDayOfCurrentQuarter = firstDayOfNextQuarter
    .add(1, "month")
    .subtract(1, "day");
  const lastQuarter = lastDayOfCurrentQuarter.format("YYYY-MM-DD");

  return (
    <div
      id="roadmap"
      className="max-w-6xl w-full pt-28 mx-auto px-4 lg:px-6 2xl:px-0"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between mb-10">
        <div className="w-full lg:w-5/12">
          <span className="text-blue-500 text-sm uppercase tracking-widest font-normal mb-2 block">
            [ROADMAP]
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-200 mb-6">
            Innovation Unleashed. Future Driven.
          </h2>
          <p className="text-gray-200 text-base leading-relaxed">
            Embark on an exciting roadmap with Namo Token: Innovations and
            milestones shaping our future.
          </p>
        </div>
        <div className="w-full lg:w-5/12 mt-6 lg:mt-0 flex justify-start lg:justify-end">
          <img
            src="./assets/ImageRoadmap.svg"
            alt="Roadmap"
            className="w-[475px] h-[316px] object-contain"
            // onError={(e) => (e.target.src = "https://via.placeholder.com/475x316")}
          />
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 text-gray-50">
        {roadmap.map((item, index) => {
          const isActiveQuarter = item.quarter === currentQuarter;
          const isActiveYear = item.year === currentYear;
          const isActive =
            (currentQuarter > item.quarter && isActiveYear) ||
            currentYear > item.year ||
            (isActiveQuarter && isActiveYear);

          return (
            <div
              key={index}
              className="w-full min-w-[25%] border border-gray-600 rounded-lg p-[1px] bg-gradient-to-br from-gray-800 to-transparent"
            >
              <div className="bg-gray-900 w-full rounded-lg p-6">
                <h3
                  className="text-xl font-semibold mb-8"
                  style={{
                    color: isActiveQuarter && isActiveYear ? "#1ED760" : "#C4D3D9",
                  }}
                >
                  {item.precious}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <img
                      src={
                        isActive
                          ? "./assets/roadmap-icon-active.svg"
                          : "./assets/roadmap-icon.svg"
                      }
                      alt="icon"
                      className="w-5 h-5 mr-4"
                    //   onError={(e) =>
                    //     (e.target.src = "https://via.placeholder.com/20")
                    //   }
                    />
                    <p className="text-gray-300 text-base">{item.contentOne}</p>
                  </div>
                  {item.contentTwo && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentTwo}</p>
                    </div>
                  )}
                  {item.contentThree && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentThree}</p>
                    </div>
                  )}
                  {item.contentFourth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentFourth}</p>
                    </div>
                  )}
                  {item.contentFifth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentFifth}</p>
                    </div>
                  )}
                  {item.contentSixth && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentSixth}</p>
                    </div>
                  )}
                  {item.contentSeventh && (
                    <div className="flex items-start">
                      <img
                        src={
                          isActive && lastQuarter > item.endTime
                            ? "./assets/roadmap-icon-active.svg"
                            : "./assets/roadmap-icon.svg"
                        }
                        alt="icon"
                        className="w-5 h-5 mr-4"
                      />
                      <p className="text-gray-300 text-base">{item.contentSeventh}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
