"use client";

import { useState } from "react";

const photos = [
  { src: "/images/hero-banner.jpg", title: "Eastern India Development Forum", meta: "The forum" },
  { src: "/images/eidf_01.jpg", title: "Eastern Skill Centre Corridor Groundwork", meta: "Cuttack, Odisha · May 2026" },
  { src: "/images/eidf_02.jpg", title: "Ranchi Vocational Lab Setup", meta: "Ranchi, Jharkhand · June 2026" },
  { src: "/images/eidf_03.jpg", title: "Inland Waterways Sagarmala Freight Hub", meta: "Muzaffarpur, Bihar · April 2026" },
  { src: "/images/eidf_04.jpg", title: "Brahmaputra Organic Agriculture Corridor", meta: "Guwahati, Assam · July 2026" },
  { src: "/images/eidf_05.jpg", title: "Global Diaspora Investors Roundtable", meta: "Kolkata, West Bengal · June 2026" },
  { src: "/images/eidf_06.jpg", title: "Dignitaries Lighting the Inaugural Lamp", meta: "Umanand Auditorium, Ranchi · June 2026" },
  { src: "/images/eidf_07.jpg", title: "Panel on Tribal Inclusion & Skill Development", meta: "Patna Trade Center, Bihar · May 2026" },
  { src: "/images/eidf_08.jpg", title: "EIDF State Chapter Officers Group", meta: "Bhubaneswar, Odisha · July 2026" },
  { src: "/images/eidf_09.jpg", title: "Floral Tribute & Founding Ceremony", meta: "Ranchi HQ, Jharkhand · August 2026" },
  { src: "/images/eidf_10.jpg", title: "Youth Skilling Orientation Drive", meta: "Muzaffarpur, Bihar · July 2026" },
  { src: "/images/eidf_11.jpg", title: "Heritage Conservation Inspection Team", meta: "Gaya, Bihar · March 2026" },
  { src: "/images/eidf_12.jpg", title: "Smart Water Management Briefing", meta: "Bhubaneswar, Odisha · June 2026" },
  { src: "/images/eidf_13.jpg", title: "Rural Electrification Assessment", meta: "Simdega, Jharkhand · May 2026" },
  { src: "/images/eidf_14.jpg", title: "Diaspora Cultural Integration Meet", meta: "Newtown, Kolkata · July 2026" },
  { src: "/images/eidf_15.jpeg", title: "EIDF Regional Outreach Moment", meta: "Eastern India · August 2026" },
  { src: "/images/eidf_poster.jpg", title: "EIDF poster", meta: "Eastern India Development Forum" },
];

export function JoinGallery() {
  const [index, setIndex] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const photo = photos[index];

  function show(next: number) {
    setIndex((next + photos.length) % photos.length);
  }

  return (
    <section className="border-t border-line bg-white" aria-labelledby="photos-heading">
      <div className="mx-auto max-w-lg px-4 py-8">
        <h2 id="photos-heading" className="font-display text-2xl font-extrabold tracking-tight text-navy">
          Gallery
        </h2>

        <div className="relative mt-5">
          <div
            className="aspect-[4/3] overflow-hidden rounded-2xl bg-navy"
            onTouchStart={(event) => setTouchX(event.changedTouches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchX == null) return;
              const delta = event.changedTouches[0].clientX - touchX;
              if (delta > 40) show(index - 1);
              else if (delta < -40) show(index + 1);
              setTouchX(null);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} alt={photo.title} className="h-full w-full object-cover" />
          </div>
          <button
            type="button"
            className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-deep/75 text-2xl leading-none text-white"
            aria-label="Previous photograph"
            onClick={() => show(index - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-deep/75 text-2xl leading-none text-white"
            aria-label="Next photograph"
            onClick={() => show(index + 1)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
