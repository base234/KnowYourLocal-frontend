import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import Api from '../api/api.jsx';

const PhotoCarousel = ({ fsqPlaceId, className = "" }) => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBullets, setShowBullets] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [visibleImages, setVisibleImages] = useState(new Set());
  const containerRef = useRef(null);
  const imageRefs = useRef({});



  // Fetch photos when fsqPlaceId changes
  useEffect(() => {
    if (!fsqPlaceId) return;

    const fetchPhotos = async () => {
      console.log('Fetching photos for place:', fsqPlaceId);
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await Api.get(`/photos/place?fsq_place_id=${fsqPlaceId}`);
        const data = response.data;
        console.log('Photos API response:', data);
        
        if (data.success && data.data.photos) {
          setPhotos(data.data.photos);
          setCurrentIndex(0);
          setLoadedImages(new Set());
          setVisibleImages(new Set());
          console.log('Photos loaded successfully:', data.data.photos.length);
        } else {
          setPhotos([]);
          console.log('No photos in response');
        }
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos');
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [fsqPlaceId]);

  // Handle image load
  const handleImageLoad = useCallback((photoId) => {
    setLoadedImages(prev => new Set([...prev, photoId]));
  }, []);

  // Handle image error
  const handleImageError = useCallback((photoId) => {
    console.warn(`Failed to load image for photo: ${photoId}`);
    // You could set a fallback image here if needed
  }, []);

  // Preload adjacent images for smooth navigation
  const preloadAdjacentImages = useCallback((currentIdx) => {
    if (photos.length <= 1) return;
    
    const indices = [
      (currentIdx - 1 + photos.length) % photos.length,
      (currentIdx + 1) % photos.length
    ];
    
    indices.forEach(index => {
      const photo = photos[index];
      if (photo) {
        setVisibleImages(prev => {
          if (!prev.has(photo.fsq_photo_id)) {
            return new Set([...prev, photo.fsq_photo_id]);
          }
          return prev;
        });
      }
    });
  }, [photos]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (photos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const photoId = entry.target.dataset.photoId;
          if (entry.isIntersecting) {
            setVisibleImages(prev => new Set([...prev, photoId]));
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: '50px', // Start loading 50px before image comes into view
        threshold: 0.1
      }
    );

    // Observe all image containers
    Object.values(imageRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [photos.length]);

  // Preload first image and adjacent images when photos are loaded
  useEffect(() => {
    if (photos.length > 0) {
      const firstPhotoId = photos[0]?.fsq_photo_id;
      if (firstPhotoId) {
        setVisibleImages(prev => {
          if (!prev.has(firstPhotoId)) {
            return new Set([...prev, firstPhotoId]);
          }
          return prev;
        });
        // Preload adjacent images after a short delay
        setTimeout(() => {
          preloadAdjacentImages(0);
        }, 100);
      }
    }
  }, [photos, preloadAdjacentImages]);

  // Auto-slide disabled - removed auto-slide logic

  // Show/hide navigation on hover
  const handleMouseEnter = () => {
    setShowBullets(true);
  };

  const handleMouseLeave = () => {
    setShowBullets(false);
  };

  // Manual navigation with preloading
  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    preloadAdjacentImages(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    preloadAdjacentImages(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    preloadAdjacentImages(index);
  };

  // Build image URL from prefix and suffix
  const buildImageUrl = (photo) => {
    if (!photo.prefix || !photo.suffix) return '';
    return `${photo.prefix}original${photo.suffix}`;
  };

  if (isLoading) {
    return (
      <div className={`w-full h-full bg-gray-100 rounded-lg overflow-hidden ${className}`}>
        {/* Skeleton loader with shimmer effect */}
        <div className="w-full h-full bg-gray-200 animate-pulse relative overflow-hidden">
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent" 
            style={{
              animation: 'shimmer 2s infinite',
              animationTimingFunction: 'ease-in-out'
            }}
          ></div>
          
          {/* Photo-like skeleton structure */}
          <div className="w-full h-full flex flex-col justify-between p-4">
            {/* Top section - photo counter placeholder */}
            <div className="flex justify-end">
              <div className="w-12 h-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            {/* Center section - main content placeholder */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-3">
                {/* Image icon skeleton */}
                <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
                {/* Text skeleton */}
                <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            
            {/* Bottom section - carousel bullets placeholder */}
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full h-full bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className={`w-full h-full bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-gray-400 flex flex-col items-center">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-xs text-gray-500">No photos available</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full bg-gray-100 rounded-lg overflow-hidden group ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Image with Lazy Loading */}
      <div 
        ref={(el) => {
          imageRefs.current[photos[currentIndex]?.fsq_photo_id] = el;
        }}
        data-photo-id={photos[currentIndex]?.fsq_photo_id}
        className="w-full h-full relative"
      >
        {/* Show skeleton while loading */}
        {!loadedImages.has(photos[currentIndex]?.fsq_photo_id) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}
        
        {/* Actual image */}
        {visibleImages.has(photos[currentIndex]?.fsq_photo_id) && (
          <img
            src={buildImageUrl(photos[currentIndex])}
            alt={`Photo ${currentIndex + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              loadedImages.has(photos[currentIndex]?.fsq_photo_id) ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad(photos[currentIndex]?.fsq_photo_id)}
            onError={() => handleImageError(photos[currentIndex]?.fsq_photo_id)}
          />
        )}
      </div>

      {/* Navigation Arrows - Only show on hover and if multiple photos */}
      {photos.length > 1 && showBullets && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Carousel Bullets - Only show on hover and if multiple photos */}
      {photos.length > 1 && showBullets && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Photo Counter - Only show if multiple photos */}
      {photos.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {photos.length}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;
