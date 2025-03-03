"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchCoins() {
    // Fetch data from server-side
    const res = await fetch("/api/prices");
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const data = await res.json();
     // Get first 5 coins
    return data.coins.slice(0, 5);
}

export const Home = () => {
    // For storing query
    const [query, setQuery] = useState("");

    // Fetch data using React Query
    const { data, error, isLoading, refetch, isFetching } = useQuery({
        queryKey: ["coins"],
        queryFn: fetchCoins,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Handle search input change
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    // Filtered data based on query
    const filteredCoins = data?.filter((coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase())
    );

    // Format currency
    let dollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold p-2 font-mono">Crypto Prices</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search for a cryptocurrency"
                        className="w-80 h-10 p-3 bg-white border-gray-300 rounded-md focus:outline-none shadow-md"
                        onChange={handleChange}
                        value={query}
                    />
                    <button 
                        className="bg-white text-white px-4 py-2 rounded-md shadow-md hover:opacity-50 duration-300 cursor-pointer" 
                        onClick={() => refetch()}
                    >
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Refresh_icon.png" 
                            alt="refresh" 
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
            {(isLoading || isFetching) ? 
                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                    <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                    </path>
                    </svg>
                </div>
            : null}
            {error && <p className="text-red-500">Error: {error.message}</p>}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-700 dark:bg-gray-100 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Coin
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Market Cap
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Volume
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    24H Change
                                </th>
                            </tr>
                        </thead>
                    <tbody>
                        {filteredCoins?.length > 0 ? (
                            filteredCoins.map((coin) => (
                                <tr key={coin.id} className="odd:bg-white even:bg-gray-50 dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full inline-block" />
                                        {' '}
                                        <span className="font-bold">{coin.name}</span>{' '}
                                        <span className="text-gray-500 dark:text-gray-400">{coin.symbol.toUpperCase()}</span>
                                    </th>
                                    <td className="px-6 py-4">{dollars.format(coin.current_price)}</td>
                                    <td className="px-6 py-4">{dollars.format(coin.market_cap)}</td>
                                    <td className="px-6 py-4">{Intl.NumberFormat().format(coin.total_volume)}</td>
                                    <td className="px-6 py-4" style={{color: coin.price_change_percentage_24h > 0 ? 'green' : 'red'}}>{coin.price_change_percentage_24h}%</td>
                                </tr>
                            ))
                        ) : (
                            !isLoading && <tr><td colSpan="5">No results found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};