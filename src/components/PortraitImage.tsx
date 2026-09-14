import React, { useState, useEffect, useRef } from 'react';

interface PortraitImageProps {
  className?: string;
  alt?: string;
  showCaption?: boolean;
}

const CANDIDATE_SOURCES = [
  '/images/IMG_0776.JPG',
  '/IMG_0776.JPG',
  '/images/IMG_0776.jpg',
  '/images/portrait.jpg',
  '/images/portrait.webp',
];

export const PortraitImage: React.FC<PortraitImageProps> = ({
  className = 'w-full h-full object-cover object-center',
  alt = 'Portrait of Olivia Onyekaba',
  showCaption = true,
}) => {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('olivia_custom_photo');
      if (saved) {
        setCustomPhoto(saved);
      }
    } catch {
      // storage unavailable or restricted
    }
  }, []);

  const handleImageError = () => {
    if (customPhoto) {
      // If custom photo failed, revert to candidate sources
      setCustomPhoto(null);
      setSourceIndex(0);
      return;
    }

    if (sourceIndex < CANDIDATE_SOURCES.length - 1) {
      setSourceIndex((prev) => prev + 1);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomPhoto(result);
        try {
          localStorage.setItem('olivia_custom_photo', result);
        } catch {
          // localStorage quota exceeded or unavailable
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const currentSrc = customPhoto || CANDIDATE_SOURCES[sourceIndex];

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[var(--ink-raised)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={handleImageError}
      />

      {/* Hidden file input for uploading exact image directly */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        aria-label="Upload exact portrait image"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Interactive upload prompt on hover / focus */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className={`absolute top-3 right-3 z-30 px-3 py-1.5 bg-[var(--ink)]/95 border border-[var(--ochre)] text-[var(--cream)] font-mono-custom text-[10px] uppercase tracking-wider transition-opacity duration-200 shadow-md ${
          isHovered ? 'opacity-100' : 'opacity-0 focus:opacity-100'
        }`}
        title="Upload your exact image file (e.g. IMG_0776.JPG)"
      >
        Upload exact image ↗
      </button>

      {/* Subtle caption pill in corner */}
      {showCaption && (
        <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 bg-[var(--ink)]/90 border border-[var(--rule-ink)] font-mono-custom text-[11px] text-[var(--text-on-ink)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" aria-hidden="true" />
          <span>OLIVIA ONYEKABA · LAGOS</span>
        </div>
      )}
    </div>
  );
};
