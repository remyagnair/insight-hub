
import React, { memo } from "react";
import { motion } from "framer-motion";

// Define proper TypeScript interfaces
interface CryptoCardProps {
  name: string;
  price: number;
  symbol: string;
  rowIndex: number;
  totalRows: number;
}

// Memoized coin icons object
const coinIcons: Record<string, string> = {
  bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  "ethereum-classic": "https://assets.coingecko.com/coins/images/1321/large/ethereum-classic-logo.png",
  cardano: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
  dogecoin: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
  litecoin: "https://assets.coingecko.com/coins/images/2/large/litecoin.png",
  polkadot: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
  ripple: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
};

// Memoized function to get icon URL
const getIconUrl = (symbol: string): string => {
  return coinIcons[symbol.toLowerCase()] || "https://cdn-icons-png.flaticon.com/512/197/197615.png";
};

// Format price with proper number formatting
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
};

// Memoized CryptoCard component to prevent unnecessary re-renders
export const CryptoCard = memo<CryptoCardProps>(({ name, price, symbol, rowIndex, totalRows }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    const currentRow = event.currentTarget;
    const rows = currentRow.parentElement?.querySelectorAll('tr[tabindex="0"]') as NodeListOf<HTMLTableRowElement>;
    
    if (!rows) return;

    let targetRow: HTMLTableRowElement | null = null;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        targetRow = rows[rowIndex + 1] || rows[0]; // Wrap to first row
        break;
      case 'ArrowUp':
        event.preventDefault();
        targetRow = rows[rowIndex - 1] || rows[rows.length - 1]; // Wrap to last row
        break;
      case 'Home':
        event.preventDefault();
        targetRow = rows[0];
        break;
      case 'End':
        event.preventDefault();
        targetRow = rows[rows.length - 1];
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Announce the row content to screen readers
        const announcement = `${name}, price ${formatPrice(price)}`;
        const announcementElement = document.createElement('div');
        announcementElement.setAttribute('aria-live', 'polite');
        announcementElement.setAttribute('aria-atomic', 'true');
        announcementElement.className = 'sr-only';
        announcementElement.textContent = announcement;
        document.body.appendChild(announcementElement);
        setTimeout(() => document.body.removeChild(announcementElement), 1000);
        break;
    }

    if (targetRow) {
      targetRow.focus();
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover:bg-sky-100 focus:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset transition-colors duration-200"
      role="row"
      tabIndex={0}
      aria-rowindex={rowIndex + 2} // +2 because header row is index 1
      aria-label={`${name}, price ${formatPrice(price)}`}
      onKeyDown={handleKeyDown}
    >
      <td 
        className="px-4 py-3 font-medium flex items-center gap-3"
        role="gridcell"
        aria-label={`Cryptocurrency name: ${name}`}
      >
        <img 
          src={getIconUrl(symbol)} 
          alt={`${symbol} icon`} 
          className="w-6 h-6 rounded-full"
          loading="lazy"
        />
        <span className="text-gray-800">{name}</span>
      </td>
      <td 
        className="px-4 py-3 text-start font-mono text-gray-700"
        role="gridcell"
        aria-label={`Price: ${formatPrice(price)}`}
      >
        {formatPrice(price)}
      </td>
    </motion.tr>
  );
});

CryptoCard.displayName = 'CryptoCard';