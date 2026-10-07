"use client";

import { useRef, useState } from "react";
import { galleries } from "./gallery-data";

type ServicePhoto = { caption: string; src: string };
const services: { title: string; text: string; cover: string; photos: ServicePhoto[] }[] = [
  { title: "Bathroom Remodeling", text: "Showers, vanities & complete updates", cover: "/images/bathroom-17.webp", photos: [...galleries.bathroom] },
  { title: "Tile & Flooring", text: "Floors, showers & backsplashes", cover: "/images/bathroom-13.webp", photos: [galleries.bathroom[8], galleries.bathroom[12], galleries.kitchen[3], galleries.porch[22]] },
  { title: "Plumbing", text: "Faucets, sinks & fixture upgrades", cover: "/images/bathroom-14.webp", photos: [galleries.bathroom[13], galleries.bathroom[15], galleries.kitchen[4], ...galleries.plumbing] },
  { title: "Electrical", text: "Lighting, fans & home improvements", cover: "/images/electrical-02.webp", photos: [...galleries.electrical] },
  { title: "Painting & Repairs", text: "Interior, exterior & finishing work", cover: "/images/porch-11.webp", photos: [galleries.porch[10], galleries.porch[18], galleries.deck[0], galleries.deck[2]] },
  { title: "Carpentry & Doors", text: "Framing, trim & door improvements", cover: "/images/porch-17.webp", photos: [galleries.porch[2], galleries.porch[7], galleries.porch[15], galleries.porch[16]] },
  { title: "Decks", text: "Repairs, rebuilding & replacement", cover: "/images/deck-feature.webp", photos: [...galleries.deck] },
  { title: "Covered Porches", text: "From framing to the finished porch", cover: "/images/porch-21.webp", photos: [...galleries.porch] },
  { title: "Countertops & Cabinets", text: "Kitchen surfaces & cabinet updates", cover: "/images/kitchen-03.webp", photos: [...galleries.kitchen] },
  { title: "Interior Remodeling", text: "Room conversions, framing & finish work", cover: "/images/room-conversion-09.webp", photos: [...galleries.roomConversion] },
];

export default function ServiceGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  const service = services[selected];
  return <>
    <div className="serviceGrid">{services.map((item, index) =>
      <button type="button" className="servicePhotoCard" key={item.title}
        aria-haspopup="dialog" onClick={() => { setSelected(index); dialog.current?.showModal(); }}>
        <img src={item.cover} alt="" loading="lazy" />
        <span className="serviceCardContent"><strong>{item.title}</strong><span>{item.text}</span><small>View photos →</small></span>
      </button>
    )}</div>
    <dialog className="serviceDialog" ref={dialog} aria-labelledby="serviceGalleryTitle"
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="serviceDialogHeader"><h3 id="serviceGalleryTitle">{service.title}</h3>
        <button type="button" aria-label="Close service gallery" onClick={() => dialog.current?.close()}>×</button>
      </div>
      <p className="serviceGalleryIntro">Explore details from our remodeling and repair projects.</p>
      <div className="serviceGalleryPhotos">{service.photos.map(photo =>
        <figure key={photo.src}><img src={photo.src} alt={photo.caption} loading="lazy" /><figcaption>{photo.caption}</figcaption></figure>
      )}</div>
      <a className="button" href="#estimate" onClick={() => dialog.current?.close()}>Request a Free Estimate</a>
    </dialog>
  </>;
}
