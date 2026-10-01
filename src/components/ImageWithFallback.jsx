import { useState } from 'react';
import { Leaf } from 'lucide-react';
import styles from './ImageWithFallback.module.css';

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  aspectRatio = '4/3',
  fallbackText = 'Pieza Botánica',
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{ aspectRatio }}
    >
      {isLoading && !hasError && <div className={styles.skeleton} />}

      {hasError ? (
        <div className={styles.fallback}>
          <Leaf size={28} className={styles.fallbackIcon} />
          <span className={styles.fallbackText}>{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoading ? styles.imageLoading : ''}`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
    </div>
  );
}
