"use client";

import { useEffect, useState } from "react";
import { galleries } from "./gallery-data";

type Group = keyof typeof galleries;
const projects: { key: Group; title: string; cover: string }[] = [
  { key: "bathroom", title: "Bathroom Remodeling", cover: "/images/bathroom-17.webp" },
  { key: "porch", title: "Covered Porches", cover: "/images/porch-21.webp" },
  { key: "deck", title: "Deck Repairs & Replacement", cover: "/images/deck-feature.webp" },
  { key: "kitchen", title: "Kitchens & Countertops", cover: "/images/kitchen-03.webp" },
];

export default function ProjectGallery() {
  const [group, setGroup] = useState<Group | null>(null);
  const [index, setIndex] = useState(0);
  const photos = group ? galleries[group] : [];
  const move = (step: number) => setIndex((current) => (current + step + photos.length) % photos.length);

  useEffect(() => {
    if (!group) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGroup(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [group, photos.length]);

  return <>
    <div className="projectGrid">{projects.map((project) =>
      <button className="project" key={project.key} onClick={() => { setIndex(0); setGroup(project.key); }}>
        <img src={project.cover} alt={`Completed ${project.title.toLowerCase()} project`} loading="lazy" />
        <span>{project.title}<small>View {galleries[project.key].length} photos →</small></span>
      </button>
    )}</div>
    {group && <div className="galleryBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setGroup(null); }}>
      <div className="galleryDialog" role="dialog" aria-modal="true" aria-label={`${projects.find(p => p.key === group)?.title} photos`}>
        <div className="galleryTop"><strong>{projects.find(p => p.key === group)?.title}</strong><button aria-label="Close gallery" onClick={() => setGroup(null)}>×</button></div>
        <div className="galleryStage"><button aria-label="Previous photo" onClick={() => move(-1)}>‹</button><img src={photos[index].src} alt={photos[index].caption} /><button aria-label="Next photo" onClick={() => move(1)}>›</button></div>
        <p>{photos[index].caption} <span>{index + 1} / {photos.length}</span></p>
        <div className="galleryThumbs">{photos.map((photo, i) => <button key={photo.src} className={i === index ? "active" : ""} aria-label={`Show ${photo.caption}`} onClick={() => setIndex(i)}><img src={photo.src} alt="" loading="lazy" /></button>)}</div>
      </div>
    </div>}
  </>;
}
