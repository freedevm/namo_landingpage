import React from 'react';
// import Community from './Community';
// import HowToBuy from './HowToBuy';
import IncomeSolution from './IncomeSolution';
import OurMission from './OurMission';
import Roadmap from './Roadmap';
// import TeamMember from './TeamMember';
import Tokenomics from './Tokenomics';
import OurPartner from './OurPartner';

const HomePage = () => {
  return (
   <div className="relative">
  {/* Background image */}
  <div
    className="absolute inset-0 bg-cover bg-no-repeat bg-center z-0"
    style={{ backgroundImage: "url('./assets/bg.jpg')" }}
  />
  {/* Overlay */}
  {/* <div className="absolute inset-0 bg-black opacity-50 z-0" /> */}
  
  {/* Content */}
  <div className="relative z-10 flex flex-col min-h-screen">
    <IncomeSolution />
    <OurPartner />
    <OurMission />
    <Tokenomics />
    <Roadmap />
    <footer className="w-full text-center text-sm text-zinc-300 p-4 border-t mt-3 border-zinc-800 bg-black bg-opacity-70">
      <p className="mt-1">Copyright © 2025 NamoToken</p>
    </footer>
  </div>
</div>

  );
};

export default HomePage;