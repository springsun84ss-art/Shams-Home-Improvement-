"use client";
import { useEffect, useRef, useState } from "react";
type Review = { name: string; rating: number; text?: { text: string }; originalText?: { text: string }; relativePublishTimeDescription?: string; googleMapsUri?: string; authorAttribution: { displayName: string; uri?: string; photoUri?: string } };
type Data = { reviews: Review[]; rating?: number; count?: number; url?: string };

// Recent reviews shared by the owner. Keep these available if Google's live feed
// is temporarily unavailable, and combine them with any other Google reviews.
const featuredReviews: Review[] = [
  {
    name: "featured-ramzi-kanso",
    rating: 5,
    originalText: { text: "Absolutely amazing quality of work and attention to detail. This was my third project using Shams Home Improvement, and once again, they exceeded expectations. Not only do they deliver outstanding craftsmanship, but their team is also honest, respectful, and leaves the workspace spotless. On top of their fair pricing, what sets them apart is their transparency—there were zero surprises on my bill. Everything was completed right on time and exactly for the price we agreed upon. I can’t recommend them highly enough!" },
    authorAttribution: { displayName: "Ramzi Kanso" }
  },
  {
    name: "featured-daniella-abdulaziz",
    rating: 5,
    originalText: { text: "Excellent service from start to finish! Rabee is always on time, does the job right, and charges a fair price. Reliable, professional, and someone I would definitely recommend to others." },
    authorAttribution: { displayName: "Daniella Abdulaziz" }
  },
  {
    name: "featured-norrie-horak",
    rating: 5,
    originalText: { text: "Robbie and his company are detail-oriented, quick, professional and friendly. Highly recommend!" },
    authorAttribution: { displayName: "Norrie Horak" }
  },
  {
    name: "featured-google-customer",
    rating: 5,
    originalText: { text: "We had an excellent experience working with Shams Home Improvement and are extremely happy with the results. They completed several major projects in our home, including converting a large walk-in closet into a beautiful new bathroom, transforming our high open foyer into a functional additional room on the second floor, converting the attic space above the garage into a spacious closet, and painting the interior of our home. From start to finish, the team was professional, reliable, respectful, and attentive to detail. They communicated clearly throughout the entire process, listened carefully to our ideas and needs, and made sure each project was completed properly and to a high standard. We are very pleased with the improvements they made to our home and would highly recommend Shams Home Improvement to anyone looking for a skilled, dependable, and professional home improvement company." },
    authorAttribution: { displayName: "Google customer" }
  }
];
export default function GoogleReviews() {
  const root = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Data>({ reviews: featuredReviews });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(motion.matches);
    update(); motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const controller = new AbortController(); let started = false;
    const observer = new IntersectionObserver(entries => {
      const onScreen = entries.some(entry => entry.isIntersecting); setVisible(onScreen);
      if (onScreen && !started) {
        started = true;
        fetch("/api/reviews", { cache: "no-store", signal: controller.signal })
          .then(r => r.ok ? r.json() : null)
          .then(result => {
            if (result && Array.isArray(result.reviews)) {
              const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();
              const featuredKeys = new Set(featuredReviews.map(review => {
                const body = review.originalText?.text || review.text?.text || "";
                return `${normalize(review.authorAttribution.displayName)}|${normalize(body)}`;
              }));
              const liveReviews = result.reviews.filter((review: Review) => {
                const body = review.originalText?.text || review.text?.text || "";
                return !featuredKeys.has(`${normalize(review.authorAttribution.displayName)}|${normalize(body)}`);
              });
              setData({ ...result, reviews: [...featuredReviews, ...liveReviews] });
            }
          })
          .catch(() => {});
      }
    });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); controller.abort(); };
  }, []);
  useEffect(() => {
    if (data.reviews.length < 2 || paused || hover || focused || !visible || reduced) return;
    const timer = setInterval(() => { if (!document.hidden) setIndex(i => (i + 1) % data.reviews.length); }, 8000);
    return () => clearInterval(timer);
  }, [data.reviews.length, paused, hover, focused, visible, reduced]);
  const review = data.reviews[index];
  const move = (direction: number) => setIndex(i => (i + direction + data.reviews.length) % data.reviews.length);
  return <div ref={root}>
    {review && <div className="googleReviewPanel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setFocused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}>
      <div className="googleReviewHeading"><span className="mapsAttribution" translate="no">Google Maps</span><span>{data.rating != null && `${data.rating.toFixed(1)} / 5`}{data.count != null && ` · ${data.count} reviews`}</span></div>
      <article key={review.name} className="googleReviewSlide" aria-label={`Review ${index + 1} of ${data.reviews.length}`}>
        <div className="googleReviewAuthor">{review.authorAttribution.photoUri && <img src={review.authorAttribution.photoUri} alt="" width={44} height={44} referrerPolicy="no-referrer" />}<div>{review.authorAttribution.uri ? <a href={review.authorAttribution.uri} target="_blank" rel="noopener noreferrer">{review.authorAttribution.displayName}</a> : <strong>{review.authorAttribution.displayName}</strong>}<small>{review.relativePublishTimeDescription}</small></div></div>
        <div className="googleReviewStars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.round(review.rating))}{"☆".repeat(5 - Math.round(review.rating))}</div>
        {(review.originalText?.text || review.text?.text) && <blockquote>{review.originalText?.text || review.text?.text}</blockquote>}
        {review.googleMapsUri && <a className="textLink" href={review.googleMapsUri} target="_blank" rel="noopener noreferrer">View this review on Google Maps ↗</a>}
      </article>
      {data.reviews.length > 1 && <div className="googleReviewControls"><button type="button" onClick={() => move(-1)} aria-label="Previous review">←</button><span>{index + 1} / {data.reviews.length}</span><button type="button" onClick={() => move(1)} aria-label="Next review">→</button>{!reduced && <button type="button" onClick={() => setPaused(p => !p)}>{paused ? "Play" : "Pause"}</button>}</div>}
      <p className="googleReviewNotice">Reviews supplied by Google. Google checks for fake content; reviews are not individually verified.</p>
      {data.url && <a className="textLink" href={data.url} target="_blank" rel="noopener noreferrer">Read all reviews on Google Maps ↗</a>}
    </div>}
    <p className="googleReviewNotice"><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a></p>
  </div>;
}
