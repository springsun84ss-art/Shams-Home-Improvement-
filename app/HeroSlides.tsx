"use client";

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
  return <div className="heroSlides" aria-label="Featured project photos">
    {slides.map((slide, i) => <img key={slide.src} src={slide.src} alt={i === active ? slide.label : ""} aria-hidden={i !== active} className={i === active ? "active" : ""} />)}
    <div className="slideDots" aria-label="Choose featured photo">{slides.map((slide, i) => <button key={slide.src} type="button" className={i === active ? "active" : ""} aria-label={`Show ${slide.label}`} onClick={() => setActive(i)} />)}</div>
  </div>;
}
