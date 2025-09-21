import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { CryptoCard } from './bitCoinCard'
import Loader from "./loader";

// Define proper TypeScript interfaces
interface CryptoData {
    [key: string]: number;
}

interface ListComponentProps {}

// Memoized function to avoid recreation on every render
const formatCoinName = (key: string): string => {
    return key
        .split("-")
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const ListComponent: React.FC<ListComponentProps> = () => {
    const [listData, setListData] = useState<CryptoData>({});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const tableRef = useRef<HTMLTableElement>(null);

    // Memoized data fetching function
    const getData = useCallback(async () => {
        setLoading(true);
        setError(null);
        setListData({});
        
        const url = '/load_data';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: CryptoData = await response.json();
            if (result && typeof result === 'object') {
                setListData(result);
            } else {
                setListData({});
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Memoized crypto entries to avoid recalculation on every render
    const cryptoEntries = useMemo(() => {
        return Object.entries(listData);
    }, [listData]);

    // Focus management: Focus first row when data loads
    useEffect(() => {
        if (cryptoEntries.length > 0 && !loading) {
            const firstRow = tableRef.current?.querySelector('tr[tabindex="0"]') as HTMLTableRowElement;
            if (firstRow) {
                // Small delay to ensure DOM is updated
                setTimeout(() => {
                    firstRow.focus();
                }, 100);
            }
        }
    }, [cryptoEntries.length, loading]);
    return (
        <div className="container mx-auto mt-5 gap-y-[20px] flex flex-col items-center justify-center max-w-6xl px-4">
            <h1 className="mb-4 text-3xl font-bold text-gray-800">Crypto Dashboard</h1>
            
            <button 
                id="loadData" 
                className="bg-sky-800 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2" 
                onClick={getData}
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Load Crypto Data'}
            </button>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg w-full max-w-md text-center">
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div className="w-full">
                <div className="overflow-x-auto shadow-lg rounded-xl">
                    <table 
                        ref={tableRef}
                        className="w-full border divide-y divide-gray-200"
                        role="table"
                        aria-label="Cryptocurrency prices table"
                        aria-describedby="table-description"
                    >
                        <caption id="table-description" className="sr-only">
                            A table displaying cryptocurrency names and their current prices in USD
                        </caption>
                        <thead className="bg-sky-800 text-white">
                            <tr role="row">
                                <th 
                                    className="text-left px-4 py-3 font-semibold"
                                    role="columnheader"
                                    scope="col"
                                    aria-sort="none"
                                >
                                    Name
                                </th>
                                <th 
                                    className="text-left px-4 py-3 font-semibold"
                                    role="columnheader"
                                    scope="col"
                                    aria-sort="none"
                                >
                                    Price (USD)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {loading ? (
                                <tr role="row">
                                    <td colSpan={2} className="px-4 py-8 text-center" role="cell">
                                        <div role="status" aria-live="polite" aria-label="Loading cryptocurrency data">
                                            <Loader />
                                        </div>
                                    </td>
                                </tr>
                            ) : cryptoEntries.length === 0 ? (
                                <tr role="row">
                                    <td colSpan={2} className="px-4 py-8 text-center text-gray-500" role="cell">
                                        <div role="status" aria-live="polite">
                                            No data available. Click "Load Crypto Data" to fetch information.
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                cryptoEntries.map(([key, price], index) => (
                                    <CryptoCard 
                                        key={key} 
                                        name={formatCoinName(key)} 
                                        price={price} 
                                        symbol={key.split("-")[0]}
                                        rowIndex={index}
                                        totalRows={cryptoEntries.length}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Keyboard Navigation Note */}
            <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg max-w-4xl">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-gray-700">Keyboard Navigation:</span>
                    <span>Use <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">↑</kbd> <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">↓</kbd> arrows to navigate rows, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Home</kbd>/<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">End</kbd> for first/last row, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Enter</kbd>/<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-xs font-mono">Space</kbd> to announce details</span>
                </div>
            </div>
        </div>
    );
};

export default ListComponent;