
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
const coinIcons = {
  bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  "ethereum-classic": "https://assets.coingecko.com/coins/images/1321/large/ethereum-classic-logo.png",
  cardano: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
  dogecoin: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
  litecoin: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  polkadot: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
  ripple: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
};
const getIconUrl = (key?:string) => {
  return coinIcons[key as keyof typeof coinIcons] || "https://cdn-icons-png.flaticon.com/512/197/197615.png"; // fallback
};

const formatCoinName = (key?: any) => {
  return key
    ?.split("-")
    ?.map((part?: any) => part.charAt(0).toUpperCase() + part.slice(1))
    ?.join(" ");
};
export const CryptoCard = (props?: any) => {
  console.log('props----->', props)
  return (

    <motion.tr
      key={props?.key}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-sky-100"
    >

      <td className="px-4 py-2 font-medium flex gap-[10px]"><img src={getIconUrl(props?.symbol)} alt={props?.symbol} className="w-6 h-6" />
        {props?.name}</td>
      <td className="px-4 py-2 text-start">${props?.price}</td>
    </motion.tr>
  );
};