import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const id = process.env.GOOGLE_PLACE_ID;
  const headers = { "Cache-Control": "no-store" };
  if (!key || !id) return NextResponse.json({ reviews: [], unavailable: true }, { headers });
  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=en`, {
      headers: { "X-Goog-Api-Key": key, "X-Goog-FieldMask": "reviews,rating,userRatingCount,googleMapsUri" },
      cache: "no-store", signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) {
      console.error("Google reviews request failed", response.status);
      return NextResponse.json({ reviews: [], unavailable: true }, { headers });
    }
    const data = await response.json();
    return NextResponse.json({ reviews: data.reviews || [], rating: data.rating, count: data.userRatingCount, url: data.googleMapsUri }, { headers });
  } catch {
    return NextResponse.json({ reviews: [], unavailable: true }, { headers });
  }
}
