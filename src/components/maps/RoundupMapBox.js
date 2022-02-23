import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { IoCloseCircle } from "react-icons/io5";
import { Modal } from "..";
import FormatRoundUpMapsData from "./FormatRoundUpMapsData";

const RoundupMapBox = ({ isMapOpen, closeModal, roundupData }) => {
  const allMapPoints = FormatRoundUpMapsData(roundupData);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCJkZohj9sqn6H_LrfHMNG5cY794SWFJgA",
  });

  const [map, setMap] = useState(null);
  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      if (allMapPoints.length == 1) {
        let pt = new window.google.maps.LatLng(allMapPoints[0].position);
        map.setCenter(pt);
        map.setZoom(14);
      } else {
        // if not, we set bounds to different locations
        allMapPoints.map((loc) => bounds.extend(loc.position));
        map.fitBounds(bounds);
      }
      setMap(map);
    },
    [allMapPoints]
  );

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Modal isOpen={isMapOpen} closeModal={closeModal}>
      <div
        style={{ height: "90vh" }}
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle md:w-5/6 sm:p-6"
      >
        <div className="w-full h-full ">
          {isLoaded ? (
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={14}
            >
              {allMapPoints.map((loc) => (
                <Marker
                  key={loc.id}
                  position={loc.position}
                  icon={{
                    url: "/images/icon-pastel.png",
                    labelOrigin: new window.google.maps.Point(24, -10),
                  }}
                  onClick={() => handleActiveMarker(loc.position.lat)}
                  label={{
                    text: loc.title,
                    color: "#ffffff",
                    fontSize: "1rem",
                    fontWeight: "900",
                    className: "green-marker",
                  }}
                >
                  {activeMarker === loc.position.lat ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                      <a
                        href={loc.uri}
                        target="_blank"
                        className="flex flex-col items-center"
                      >
                        <h3 className="mb-2 text-xl font-semibold text-primary">
                          {loc.title}
                        </h3>
                        <img
                          className="w-auto h-32 rounded-md"
                          src={loc.image}
                          alt={loc.title}
                        />
                      </a>
                    </InfoWindow>
                  ) : null}
                </Marker>
              ))}
            </GoogleMap>
          ) : null}
        </div>

        <button
          className="absolute text-4xl cursor-pointer top-4 right-4 hover:text-gray-700"
          onClick={closeModal}
        >
          <IoCloseCircle />
        </button>
      </div>
    </Modal>
  );
};

export default RoundupMapBox;
