import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Frontend se city ka naam receive karna (agar frontend kuch na bheje to default "delhi")
    const body = await req.json().catch(() => ({}));
    const city: string = body.city || "delhi";

    const apiKey = process.env.WEATHER_API_KEY;

    // External API ko call lagana
    const res = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

    // Response ko JSON format me convert karna zaroori hai
    const weatherData = await res.json();

    if (!res.ok) {
        return NextResponse.json({ message: "Failed to fetch weather" }, { status: res.status });
    }

    return NextResponse.json(
      {
        data: weatherData,
        message: "Fetched data successfully"
      },
      { status: 200 } // Status hamesha second argument me pass hota hai
    );

  } catch (err: any) {
    // Error block ko sahi kiya
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 } // Server errors ke liye 500 use karte hain
    );
  }
}