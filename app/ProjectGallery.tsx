"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { galleries } from "./gallery-data";

type Group = keyof typeof galleries;
const projects: { key: Group; title: string; cover: string; description?: string }[] = [
  { key: "basement", title: "Basement Finishing", cover: "/images/basement-55.webp", description: "Explore this basement project from work in progress to the finished living spaces, oak stairs, bathroom and indoor soccer room." },
  { key: "bathroom", title: "Bathroom Remodeling", cover: "/images/bathroom-17.webp" },
  { key: "atticCloset", title: "Attic-to-Closet Conversion", cover: "/images/attic-closet-06.webp" },
  { key: "roomConversion", title: "Foyer-to-Room Conversion", cover: "/images/room-conversion-09.webp", description: "An open foyer was transformed into a usable room beside an upstairs bedroom, with framing, drywall, electrical, paint, LVP flooring, baseboards and trim molding." },
  { key: "porch", title: "Covered Porches", cover: "/images/porch-21.webp" },
  { key: "deck", title: "Deck Repairs & Replacement", cover: "/images/deck-feature.webp" },
  { key: "kitchen", title: "Kitchens & Countertops", cover: "/images/kitchen-03.webp" },
];

export default function ProjectGallery() {
  const [group, setGroup] = useState<Group | null>(null);
  const [index, setIndex] = useState(0);
  const photos = group ? galleries[group] : [];
  const selectedProject = projects.find((project) => project.key === group);
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
        <Image src={project.cover} alt={`Completed ${project.title.toLowerCase()} project`} fill sizes="(max-width: 640px) calc(100vw - 28px), (max-width: 950px) calc(50vw - 32px), 581px" quality={75} />
        <span>{project.title}<small>View {galleries[project.key].length} photos →</small></span>
      </button>
    )}</div>
    {group && <div className="galleryBackdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setGroup(null); }}>
      <div className="galleryDialog" role="dialog" aria-modal="true" aria-label={`${selectedProject?.title} photos`}>
        <div className="galleryTop"><strong>{selectedProject?.title}</strong><button aria-label="Close gallery" onClick={() => setGroup(null)}>×</button></div>
        {selectedProject?.description ? <p style={{ margin: "0 22px 8px", color: "#dce3e6", fontSize: 14, lineHeight: 1.5 }}>{selectedProject.description}</p> : null}
        <div className="galleryStage"><button aria-label="Previous photo" onClick={() => move(-1)}>‹</button><Image src={photos[index].src} alt={photos[index].caption} width={1600} height={1200} sizes="(max-width: 640px) 90vw, 960px" quality={75} /><button aria-label="Next photo" onClick={() => move(1)}>›</button></div>
        <p>{photos[index].caption} <span>{index + 1} / {photos.length}</span></p>
        <div className="galleryThumbs">{photos.map((photo, i) => <button key={photo.src} className={i === index ? "active" : ""} aria-label={`Show ${photo.caption}`} onClick={() => setIndex(i)}><Image src={photo.src} alt="" width={120} height={90} sizes="72px" quality={60} loading="lazy" /></button>)}</div>
      </div>
    </div>}
  </>;
}
