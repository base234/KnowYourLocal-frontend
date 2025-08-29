import React from 'react';
import PlacesCard from './PlacesCard';

const PlacesCardDemo = () => {
  // Sample data structure matching the API response
  const samplePlacesData = {
    "results": [
      {
        "fsq_place_id": "6818af765ef9120f872249c5",
        "latitude": 18.541531,
        "longitude": 73.791962,
        "categories": [
          {
            "fsq_category_id": "4eb1c1623b7b52c0e1adc2ec",
            "name": "Car Dealership",
            "short_name": "Car Dealer",
            "plural_name": "Car Dealerships",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/automotive_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2025-05-05",
        "date_refreshed": "2025-05-05",
        "distance": 257,
        "extended_location": {},
        "link": "/places/6818af765ef9120f872249c5",
        "location": {
          "address": "No 116/6/1, Pashan SUS Road,Pashan, Shikshak Colony",
          "locality": "Pune",
          "region": "Mahārāshtra",
          "postcode": "411021",
          "country": "IN",
          "formatted_address": "No 116/6/1, Pashan SUS Road,Pashan, Shikshak Colony (Jai Bhavani Nagar), Pune 411021, Mahārāshtra"
        },
        "name": "MyRaasta - Sanjivani Multicar - Car Service Center in Jai Bhavani Nagar, Pashan, Pune",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/6818af765ef9120f872249c5",
        "related_places": {},
        "social_media": {
          "twitter": ""
        },
        "tel": "096820 08200",
        "website": "https://workshop.myraasta.in/myraasta-sanjivani-multicar-car-service-center-in-jai-bhavani-nagar-pashan-pune-car-service-station-jai-bhavani-nagar-pune-321727/Home"
      },
      {
        "fsq_place_id": "66ff72aa92206c366a8f6841",
        "latitude": 18.54154587,
        "longitude": 73.79206085,
        "categories": [
          {
            "fsq_category_id": "52f2ab2ebcbc57f1066b8b44",
            "name": "Automotive Repair Shop",
            "short_name": "Auto Repair",
            "plural_name": "Automotive Repair Shops",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/automotive_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2024-10-04",
        "date_refreshed": "2024-10-04",
        "distance": 266,
        "extended_location": {},
        "link": "/places/66ff72aa92206c366a8f6841",
        "location": {
          "address": "Survey No 116/6/1,Sus Ln, Jai Bhavani Nagar",
          "locality": "Pune",
          "region": "Mahārāshtra",
          "postcode": "411021",
          "country": "IN",
          "formatted_address": "Survey No 116/6/1,Sus Ln, Jai Bhavani Nagar (Pashan), Pune 411021, Mahārāshtra"
        },
        "name": "3M Car Care Studio - Car Detailing, Ceramic Coating and PPF, Pashan",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/66ff72aa92206c366a8f6841",
        "related_places": {},
        "social_media": {
          "twitter": ""
        },
        "tel": "070452 35117",
        "website": "https://3mcarcare.3mindia.co.in/3m-car-care-studio-car-detailing-ceramic-coating-and-ppf-pashan-car-restoration-service-pashan-pune-285268/Home"
      },
      {
        "fsq_place_id": "66ff72a9e69ece6891a61237",
        "latitude": 18.54154587,
        "longitude": 73.79206085,
        "categories": [
          {
            "fsq_category_id": "52f2ab2ebcbc57f1066b8b44",
            "name": "Automotive Repair Shop",
            "short_name": "Auto Repair",
            "plural_name": "Automotive Repair Shops",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/automotive_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2024-10-04",
        "date_refreshed": "2024-10-04",
        "distance": 266,
        "extended_location": {},
        "link": "/places/66ff72a9e69ece6891a61237",
        "location": {
          "address": "Survey No 116/6/1,Sus Ln, Jai Bhavani Nagar",
          "locality": "Pune",
          "region": "Mahārāshtra",
          "postcode": "411021",
          "country": "IN",
          "formatted_address": "Survey No 116/6/1,Sus Ln, Jai Bhavani Nagar (Pashan), Pune 411021, Mahārāshtra"
        },
        "name": "3M Car Care Studio - Car Detailing, Ceramic Coating and PPF, Pashan",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/66ff72a9e69ece6891a61237",
        "related_places": {},
        "social_media": {
          "twitter": ""
        },
        "tel": "070452 35117",
        "website": "https://3mcarcare.3mindia.co.in/3m-car-care-studio-car-detailing-ceramic-coating-and-ppf-pashan-car-restoration-service-pashan-pune-285268/Home"
      },
      {
        "fsq_place_id": "4b5d4958f964a520bf5829e3",
        "latitude": 18.543337278550922,
        "longitude": 73.78718376159668,
        "categories": [
          {
            "fsq_category_id": "4bf58dd8d48988d1f9931735",
            "name": "Road",
            "short_name": "Road",
            "plural_name": "Roads",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/travel/highway_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2010-01-25",
        "date_refreshed": "2020-04-30",
        "distance": 285,
        "extended_location": {},
        "link": "/places/4b5d4958f964a520bf5829e3",
        "location": {
          "address": "Pashan Sus Road",
          "locality": "Pune",
          "region": "Mahārāshtra",
          "postcode": "411021",
          "country": "IN",
          "formatted_address": "Pashan Sus Road (Pashan), Pune 411021, Mahārāshtra"
        },
        "name": "Pashan Sus Road",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/4b5d4958f964a520bf5829e3",
        "related_places": {},
        "social_media": {
          "twitter": ""
        }
      },
      {
        "fsq_place_id": "4fc9f4a4e4b024b076e2e5bb",
        "latitude": 18.54405947682394,
        "longitude": 73.79206252108092,
        "categories": [
          {
            "fsq_category_id": "4f2a25ac4b909258e854f55f",
            "name": "Neighborhood",
            "short_name": "Neighborhood",
            "plural_name": "Neighborhoods",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/neighborhood_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2012-06-02",
        "date_refreshed": "2018-09-21",
        "distance": 299,
        "extended_location": {},
        "link": "/places/4fc9f4a4e4b024b076e2e5bb",
        "location": {
          "locality": "Pune",
          "region": "Mahārāshtra",
          "postcode": "",
          "country": "IN",
          "formatted_address": "Pune, Mahārāshtra"
        },
        "name": "Pashan",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/4fc9f4a4e4b024b076e2e5bb",
        "related_places": {},
        "social_media": {
          "twitter": ""
        }
      },
      {
        "fsq_place_id": "4ff59db6e4b0a0306b8ab7d3",
        "latitude": 18.53943500043967,
        "longitude": 73.79244167427886,
        "categories": [
          {
            "fsq_category_id": "4bf58dd8d48988d13a941735",
            "name": "Temple",
            "short_name": "Temple",
            "plural_name": "Temples",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/building/religious_temple_",
              "suffix": ".png"
            }
          },
          {
            "fsq_category_id": "4bf58dd8d48988d130941735",
            "name": "Structure",
            "short_name": "Structure",
            "plural_name": "Structures",
            "icon": {
              "prefix": "https://ss3.4sqi.net/img/categories_v2/building/default_",
              "suffix": ".png"
            }
          }
        ],
        "date_created": "2012-07-05",
        "date_refreshed": "2018-06-11",
        "distance": 443,
        "extended_location": {},
        "link": "/places/4ff59db6e4b0a0306b8ab7d3",
        "location": {
          "address": "Pashan",
          "postcode": "",
          "country": "IN",
          "formatted_address": "Pashan"
        },
        "name": "Shree Datta Mandir Pashan",
        "placemaker_url": "https://foursquare.com/placemakers/review-place/4ff59db6e4b0a0306b8ab7d3",
        "related_places": {},
        "social_media": {
          "twitter": ""
        }
      }
    ],
    "context": {
      "geo_bounds": {
        "circle": {
          "center": {
            "latitude": 18.542502,
            "longitude": 73.789745
          },
          "radius": 1000
        }
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
      <PlacesCard placesData={samplePlacesData} />
    </div>
  );
};

export default PlacesCardDemo;
