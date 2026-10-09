"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/bathroom-17.webp", label: "Bathroom remodeling" },
  { src: "/images/porch-21.webp", label: "Covered porches" },
  { src: "/images/deck-feature.webp", label: "Deck repairs" },
  { src: "/images/kitchen-03.webp", label: "Kitchen improvements" },
];

export default function HeroSlides() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 4000);
    return () => window.clearInterval(timer);
  }, []);
  const slide = slides[active];
  return <div className="heroSlides" aria-label="Featured project photos">
    <Image key={slide.src} src={slide.src} alt={slide.label} fill sizes="100vw" quality={75} priority={active === 0} className="active" />
    <div className="slideDots" aria-label="Choose featured photo">{slides.map((item, i) =>
      <button key={item.src} type="button" className={i === active ? "active" : ""} aria-label={`Show ${item.label}`} aria-pressed={i === active} onClick={() => setActive(i)} />
    )}</div>
  </div>;
}
