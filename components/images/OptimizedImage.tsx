import Image from "next/image";

// Image size presets for optimization
export const IMAGE_SIZES = {
  banner: {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1920,
    xl2: 2560,
  },
  profile: {
    sm: 64,
    md: 128,
    lg: 256,
    xl: 512,
  },
  quest: {
    sm: 200,
    md: 400,
    lg: 600,
  },
};

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes,
  fill,
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      fill={fill}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      quality={85}
    />
  );
}

// Banner image component with responsive sizes
export function OptimizedBanner({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={480}
      priority
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1920px) 25vw"
      className="w-full h-auto object-cover"
      loading="eager"
      placeholder="blur"
      quality={90}
    />
  );
}

// Profile avatar with responsive sizes
export function OptimizedAvatar({ src, alt, username }: { src: string; alt: string; username: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={512}
      height={512}
      sizes="256px"
      priority
      className="rounded-full border-2 border-white/20"
      placeholder="blur"
      quality={95}
    />
  );
}

// Quest card image
export function OptimizedQuestImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={600}
      height={400}
      loading="lazy"
      sizes="(max-width: 600px) 100vw, 50vw"
      className="w-full h-auto rounded-lg"
      placeholder="blur"
      quality={85}
    />
  );
}

// Achievement icon
export function OptimizedAchievementIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={96}
      height={96}
      sizes="64px"
      loading="lazy"
      className="w-16 h-16 md:w-24 md:h-24"
      placeholder="blur"
      quality={95}
    />
  );
}
