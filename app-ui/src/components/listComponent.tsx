import React, { useEffect, useState } from "react";
import { CryptoCard } from './bitCoinCard'
import Loader from "./loader";

const formatCoinName = (key?: any) => {
    return key
        .split("-")
        .map((part?: any) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

const ListComponent = () => {

    const [listData, setListData] = useState([])
    const [error, setError] = useState<string | undefined | unknown>()
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [])
    async function getData() {
        setLoading(true)
        setListData([])
        const url = '/load_data';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setListData(result);
            setLoading(true)
            console.log('result', result);
        } catch (error) {
            setError(error)
            setLoading(false)
            console.error(error);
        }
    }
    console.log('listData------->', listData)
    return <>
        <div id="root" className="container mt-5 gap-y-[20px] flex flex-col items-center justify-center">
            <h1 className="mb-4 text-2xl">Crypto Dashboard</h1>
            <button id="loadData" className="bg-sky-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[auto]" onClick={getData}>Load Crypto Data</button>
            <div id="cryptoData" className="row w-full">
                <div className="overflow-x-auto">
        <table className="w-full border divide-y divide-gray-200 shadow-md rounded-xl">
          <thead className="bg-sky-800 text-white">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price (USD)</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {
                loading && <Loader/>
            }
              {Object.entries(listData)?.map(([key, price]) => ( 
                    <CryptoCard key={key} name={formatCoinName(key)} price={price} symbol={key?.split("-")[0]}/>
                ))}
                
         
          </tbody>
        </table>
      </div>
                
            </div>
        </div>
    </>

}

export default ListComponent;