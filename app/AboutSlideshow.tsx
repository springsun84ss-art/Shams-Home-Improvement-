"use client";

import { useEffect, useState } from "react";
import { galleries } from "./gallery-data";

const labels: Record<keyof typeof galleries, string> = { plumbing: "Plumbing", electrical: "Electrical", bathroom: "Bathroom Remodeling", atticCloset: "Attic-to-Closet Conversion", roomConversion: "Foyer-to-Room Conversion", porch: "Covered Porches", deck: "Deck Repairs", kitchen: "Kitchens & Countertops" };
const allPhotos = (Object.keys(galleries) as (keyof typeof galleries)[]).flatMap(group =>
  galleries[group].map(photo => ({ ...photo, group: labels[group] }))
);
const featured = allPhotos.findIndex(photo => photo.src === "/images/bathroom-17.webp");
const photos = [allPhotos[featured], ...allPhotos.filter((_, index) => index !== featured)];

export default function AboutSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex(current => (current + 1) % photos.length), 4000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const photo = photos[index];
  return <div className="aboutCarousel" aria-label="Shams Home Improvement project photos">
    <img key={photo.src} src={photo.src} alt={photo.caption} />
    <div className="aboutCarouselInfo"><strong>{photo.group}</strong><span>{photo.caption}</span><small>{index + 1} of {photos.length}</small></div>
    <div className="aboutCarouselControls">
      <button type="button" aria-label="Previous project photo" onClick={() => setIndex(current => (current - 1 + photos.length) % photos.length)}>‹</button>
      <button type="button" aria-label={paused ? "Play project photos" : "Pause project photos"} onClick={() => setPaused(value => !value)}>{paused ? "Play" : "Pause"}</button>
      <button type="button" aria-label="Next project photo" onClick={() => setIndex(current => (current + 1) % photos.length)}>›</button>
    </div>
  </div>;
}
