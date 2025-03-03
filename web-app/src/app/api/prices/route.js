import { NextResponse } from "next/server";

// Create an API route for getting data from CoinGecko
export async function GET() {
    // Pass in headers
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
    }};

    // Make call to CoinGecko API
    try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd', options);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        return NextResponse.json({ coins: data });

    // Handle errors
    } catch (err) {
        console.error(err);
        return NextResponse.error({ message: 'Failed to fetch data' });
    }
}