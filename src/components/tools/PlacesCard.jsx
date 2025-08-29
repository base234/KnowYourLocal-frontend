import React, { Fragment, useState } from "react";
import SmartModal from "../SmartModal";
import { ArrowRight } from "lucide-react";

// CSS Styles for PlacesCard component
const styles = `
  .places-card-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Inter', sans-serif;
  }

  .places-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .places-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .places-subtitle {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
  }

  .places-carousel {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .place-card {
    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .place-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #3b82f6;
  }

  .place-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
    border-radius: 16px 16px 0 0;
  }

  .place-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .place-category {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .category-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  .category-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .place-distance {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .place-card-content {
    margin-bottom: 16px;
  }

  .place-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 12px 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .place-address {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0 0 12px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .place-contact {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 0.875rem;
    color: #4b5563;
  }

  .place-contact i {
    color: #3b82f6;
    width: 16px;
  }

  .website-link {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .website-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  .place-card-footer {
    border-top: 1px solid #f3f4f6;
    padding-top: 12px;
  }

  .place-dates {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .date-label {
    font-weight: 500;
  }

  .date-value {
    font-weight: 600;
  }

  .places-show-more {
    text-align: center;
    margin-top: 20px;
  }

  .show-more-btn {
    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .show-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, #1d4ed8, #1e40af);
  }

  .show-more-btn:active {
    transform: translateY(0);
  }

  .all-places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
    max-height: 70vh;
    overflow-y: auto;
    padding-right: 8px;
  }

  .all-places-grid::-webkit-scrollbar {
    width: 8px;
  }

  .all-places-grid::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }

  .all-places-grid::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  .all-places-grid::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  .places-card-error {
    text-align: center;
    padding: 40px 20px;
    color: #6b7280;
    font-size: 1.125rem;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .places-carousel {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .all-places-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .places-title {
      font-size: 1.5rem;
    }

    .place-card {
      padding: 16px;
    }

    .place-name {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .places-card-container {
      padding: 16px;
    }

    .place-card-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .show-more-btn {
      padding: 10px 20px;
      font-size: 0.875rem;
    }
  }
`;

// Inject styles into the document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const PlacesCard = ({ placesData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!placesData || !placesData.results || placesData.results.length === 0) {
    return (
      <div className="places-card-container">
        <div className="places-card-error">
          <p>No places data available</p>
        </div>
      </div>
    );
  }

  const { results } = placesData;
  const initialPlaces = results.slice(0, 3);
  const remainingPlaces = results.slice(3);
  const hasMorePlaces = remainingPlaces.length > 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatDistance = (distance) => {
    if (distance < 1000) {
      return `${distance}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const getCategoryIcon = (categories) => {
    if (categories && categories.length > 0 && categories[0].icon) {
      const { prefix, suffix } = categories[0].icon;
      return `${prefix}32${suffix}`;
    }
    return "https://ss3.4sqi.net/img/categories_v2/building/default_32.png";
  };

  const getCategoryName = (categories) => {
    if (categories && categories.length > 0) {
      return categories[0].short_name || categories[0].name;
    }
    return "Place";
  };

  const PlaceCard = ({ place }) => (
    <div className="place-card">
      <div className="place-card-header">
        <div className="place-category">
          <img
            src={getCategoryIcon(place.categories)}
            alt={getCategoryName(place.categories)}
            className="category-icon"
          />
          <span className="category-name">
            {getCategoryName(place.categories)}
          </span>
        </div>
        <div className="place-distance">{formatDistance(place.distance)}</div>
      </div>

      <div className="place-card-content">
        <h3 className="place-name">{place.name}</h3>

        {place.location && place.location.formatted_address && (
          <p className="place-address">{place.location.formatted_address}</p>
        )}

        {place.tel && (
          <div className="place-contact">
            <i className="fa-solid fa-phone"></i>
            <span>{place.tel}</span>
          </div>
        )}

        {place.website && (
          <div className="place-contact">
            <i className="fa-solid fa-globe"></i>
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Fragment>
      <hr className="my-4 border-t border-gray-300 border-dashed" />
      <h2 className="font-semibold">
        Nearby Places ({results.length} places found)
      </h2>

      <div className="mt-4 flex items-start gap-4">
        {initialPlaces.map((place) => (
          <PlaceCard key={place.fsq_place_id} place={place} />
        ))}
      </div>

      {hasMorePlaces && (
        <button
          onClick={openModal}
          className="mt-6 font-semibold text-lochmara-400 underline underline-offset-4 decoration-lochmara-200 hover:decoration-lochmara-500 rounded-md cursor-pointer flex items-center space-x-2 group"
        >
          <span>Show {remainingPlaces.length} more places</span>{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}

      <SmartModal
        open={isModalOpen}
        onClose={closeModal}
        header={`All Places (${results.length} total)`}
        size="4xl"
        animationType="scale"
        scrollable={true}
        centered={true}
      >
        <div className="all-places-grid">
          {results.map((place) => (
            <PlaceCard key={place.fsq_place_id} place={place} />
          ))}
        </div>
      </SmartModal>
    </Fragment>
  );
};

export default PlacesCard;
