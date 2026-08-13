"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { PageHero, CtaBand } from "@/components/ui";
import { usePublicGallery } from "@/lib/cms/public-provider";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
}

const FALLBACK_CATEGORIES = [
  "Seminars",
  "Site Visits",
  "Community",
  "Identity & Media",
];

export default function GalleryPage() {
  const galleryImages = usePublicGallery() as GalleryImage[];
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>(FALLBACK_CATEGORIES);
    for (const img of galleryImages) {
      const c = String(img.category || "").trim();
      if (c) set.add(c);
    }
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [galleryImages]);

  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => {
      const matchesCategory = activeCategory === "All" || img.category === activeCategory;
      const matchesSearch =
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [galleryImages, activeCategory, searchQuery]);

  const handleNext = () => {
    if (selectedImageIndex !== null && filteredImages.length) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && filteredImages.length) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <PageHero
        crumb="Home / Gallery"
        title="Media Hub"
        description="Seminars, site visits, community moments, and brand assets from across Eastern India."
        compact
      >
        <Link href="/creatives" className="btn-primary">
          Brand Creatives
        </Link>
        <Link href="/events" className="btn-secondary">
          Events & News
        </Link>
      </PageHero>

      <section className="border-b border-line bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedImageIndex(null);
                }}
                className={`cursor-pointer border px-3.5 py-2 text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? "border-navy bg-navy text-gold"
                    : "border-line bg-cream text-muted hover:border-navy/30 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute top-3.5 left-3 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search assets..."
              className="w-full border border-line bg-cream py-3 pr-4 pl-10 text-sm text-navy outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 pb-20">
        <div className="mb-6 flex items-center gap-3 text-sm text-muted">
          <span className="h-px w-6 bg-gold/70" aria-hidden />
          Showing{" "}
          <span className="font-bold text-navy">{filteredImages.length}</span> asset
          {filteredImages.length === 1 ? "" : "s"}
        </div>

        {filteredImages.length === 0 ? (
          <div className="space-y-3 border border-dashed border-line bg-white py-20 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gold" />
            <h3 className="font-display text-lg font-bold text-navy">No media assets found</h3>
            <p className="text-xs text-muted">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="group relative cursor-pointer overflow-hidden border border-line bg-white transition-colors hover:border-gold/40"
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative h-56 w-full overflow-hidden bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 border border-gold/35 bg-navy-deep/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm">
                    {img.category}
                  </div>
                </div>

                <div className="space-y-2 border-t border-line p-4">
                  <h4 className="truncate font-display text-sm font-bold text-navy">
                    {img.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] font-medium text-muted">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 shrink-0 text-emerald" /> {img.location}
                    </span>
                    <span className="flex shrink-0 items-center gap-1">
                      <Calendar className="h-3 w-3 text-gold" /> {img.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
            onClick={() => setSelectedImageIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-5xl overflow-hidden border border-white/15 bg-navy-deep text-white lg:grid-cols-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex h-[50vh] items-center justify-center bg-navy p-4 lg:col-span-8 lg:h-[70vh]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredImages[selectedImageIndex].src}
                  alt={filteredImages[selectedImageIndex].title}
                  className="max-h-full max-w-full object-contain"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer border border-white/15 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer border border-white/15 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col justify-between space-y-6 border-t border-white/10 p-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="border border-gold/35 bg-gold/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <button
                      onClick={() => setSelectedImageIndex(null)}
                      className="border border-white/15 bg-white/10 p-1.5 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                      aria-label="Close lightbox"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white">
                    {filteredImages[selectedImageIndex].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/70">
                    {filteredImages[selectedImageIndex].description}
                  </p>

                  <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/55">Location</span>
                      <span className="flex items-center gap-1 font-bold">
                        <MapPin className="h-3.5 w-3.5 text-emerald" />
                        {filteredImages[selectedImageIndex].location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/55">Captured</span>
                      <span className="flex items-center gap-1 font-bold">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        {filteredImages[selectedImageIndex].date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBand
        title="Capture the next chapter with us"
        description="Attend seminars, site visits, and conventions — then find the moments here."
        primary={{ label: "View Upcoming Events", href: "/events" }}
        secondary={{ label: "Join the Network", href: "/membership" }}
      />
    </div>
  );
}
