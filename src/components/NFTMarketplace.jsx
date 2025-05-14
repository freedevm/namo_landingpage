import { useState } from "react";

const NFTMarketplace = () => {
  const [nfts] = useState([
    { id: 1, name: "Desh Bhakti #1", image: "/assets/nft1.png", price: "1000" },
    { id: 2, name: "Veer Tribute #2", image: "/assets/nft2.png", price: "1500" },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {nfts.map((nft) => (
        <div key={nft.id} className="bg-white rounded-xl p-4 shadow">
          <img src={nft.image} alt={nft.name} className="rounded" />
          <h3 className="text-lg font-bold mt-2">{nft.name}</h3>
          <p>Price: {nft.price} $NAMO</p>
          <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Buy</button>
        </div>
      ))}
    </div>
  );
};

export default NFTMarketplace;
