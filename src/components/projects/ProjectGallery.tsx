'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import type { ProjectDetailImage } from '@/data/project-details';

export interface ProjectGalleryLabels {
  title: string;
  open: string;
  close: string;
  previous: string;
  next: string;
  imagePosition: string;
  zoomControls: string;
  zoomIn: string;
  zoomOut: string;
  zoomReset: string;
}

interface ProjectGalleryProps {
  images: readonly ProjectDetailImage[];
  labels: ProjectGalleryLabels;
  showTitle?: boolean;
  headingId?: string;
}

export function ProjectGallery({ images, labels, showTitle = true, headingId = 'project-gallery-title' }: ProjectGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || openIndex === null || dialog.open) return;
    dialog.showModal();
  }, [openIndex]);

  if (images.length === 0) return null;

  const selectedImage = openIndex === null ? undefined : images[openIndex];
  const move = (direction: -1 | 1) => {
    setOpenIndex((current) => {
      if (current === null || images.length < 2) return current;
      return (current + direction + images.length) % images.length;
    });
  };

  const changeImage = (index: number) => {
    setZoomLevel(1);
    setOpenIndex(index);
  };

  return (
    <section
      className="space-y-5"
      aria-labelledby={headingId}
      data-project-gallery
    >
      <h2 id={headingId} className={showTitle ? 'font-heading text-2xl font-bold text-slate-900' : 'sr-only'}>
        {labels.title}
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {images.map((image, index) => (
          <figure
            key={image.src}
            className={index === 0 || image.zoomable ? 'md:col-span-2' : undefined}
          >
            <button
              type="button"
              onClick={() => changeImage(index)}
              aria-label={`${labels.open}: ${image.title}`}
              className="motion-control group block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card-hover active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <span className="relative block aspect-[16/10] w-full overflow-hidden bg-slate-50">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes={index === 0
                    ? '(max-width: 768px) 100vw, 80vw'
                    : '(max-width: 768px) 100vw, 40vw'}
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:group-hover:scale-100"
                />
              </span>
              <span className="block border-t border-slate-100 px-4 py-3">
                <span className="block font-heading text-base font-bold text-slate-900">
                  {image.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {image.caption}
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {selectedImage && openIndex !== null && (
        <dialog
          ref={dialogRef}
          aria-label={selectedImage.title}
          className="m-auto w-[min(94vw,1200px)] max-w-none rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/80"
          onClose={() => setOpenIndex(null)}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              move(-1);
            }
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              move(1);
            }
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
            <div aria-live="polite">
              <h2 className="font-heading text-lg font-bold">{selectedImage.title}</h2>
              <p className="text-sm text-slate-600">
                {openIndex + 1} {labels.imagePosition} {images.length}
              </p>
            </div>
            {selectedImage.zoomable && (
              <div className="flex items-center gap-1" role="group" aria-label={labels.zoomControls}>
                <button
                  type="button"
                  onClick={() => setZoomLevel((current) => Math.max(1, current - 0.5))}
                  aria-label={labels.zoomOut}
                  disabled={zoomLevel <= 1}
                  className="motion-control inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  <ZoomOut className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="min-w-12 text-center text-sm font-semibold" aria-live="polite">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((current) => Math.min(3, current + 0.5))}
                  aria-label={labels.zoomIn}
                  disabled={zoomLevel >= 3}
                  className="motion-control inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  aria-label={labels.zoomReset}
                  disabled={zoomLevel === 1}
                  className="motion-control inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label={labels.close}
              className="motion-control inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className={`relative h-[min(68vh,800px)] w-full bg-slate-950 p-3 sm:p-5 ${selectedImage.zoomable ? 'overflow-auto' : 'overflow-hidden touch-pan-y'}`}
            data-gallery-image-viewport
            onTouchStart={(event) => {
              if (selectedImage.zoomable && zoomLevel > 1) {
                touchStartX.current = null;
                return;
              }
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const startX = touchStartX.current;
              const endX = event.changedTouches[0]?.clientX;
              touchStartX.current = null;
              if (selectedImage.zoomable && zoomLevel > 1) return;
              if (startX === null || endX === undefined || Math.abs(endX - startX) < 48) return;
              move(endX < startX ? 1 : -1);
            }}
          >
            <div
              className="relative h-full"
              style={{ width: selectedImage.zoomable ? `${zoomLevel * 100}%` : '100%' }}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes={selectedImage.zoomable ? '282vw' : '94vw'}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-700">
              {selectedImage.caption}
            </p>
            {images.length > 1 && (
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={labels.previous}
                  className="motion-control inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline">{labels.previous}</span>
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={labels.next}
                  className="motion-control inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-semibold hover:border-primary-300 hover:bg-primary-50 hover:text-primary-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
                >
                  <span className="hidden sm:inline">{labels.next}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <nav className="gallery-thumbnail-strip flex gap-2 overflow-x-auto border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6" aria-label={labels.title}>
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => changeImage(index)}
                  aria-label={`${labels.open}: ${image.title}`}
                  aria-pressed={openIndex === index}
                  className={`motion-control relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-[border-color,opacity,transform] ${openIndex === index ? 'border-primary-600 shadow-md' : 'border-transparent opacity-65 hover:border-slate-300 hover:opacity-100'}`}
                >
                  <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </nav>
          )}
        </dialog>
      )}
    </section>
  );
}
