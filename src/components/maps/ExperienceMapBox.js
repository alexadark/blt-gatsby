import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { IoCloseCircle } from "react-icons/io5";
import { Modal } from "..";
import ShowMarkerBox from "./ShowMarkerBox";
import useMapConfig from "./../../lib/hooks/useMapConfig";
import TickBox from "./TickBox";
import FilterMainData from "./FilterMainData";

const ExperienceMapBox = ({
  isMapOpen,
  closeModal,
  mainData,
  experiences,
  recommendations,
  whereToStay,
}) => {
  const { isLoaded, options, onUnmount, onLoad } = useMapConfig(mainData);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showExperiences, setShowExperienes] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showWhereToStay, setShowWhereToStay] = useState(false);

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
        className="inline-block z-[100] px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle w-full md:w-5/6 sm:p-6"
      >
        <div className="mb-3">
          <TickBox
            show={experiences}
            name="Experiences"
            checked={showExperiences}
            onChange={() => setShowExperienes(!showExperiences)}
          />
          <TickBox
            show={recommendations}
            name="Recommendations"
            checked={showRecommendations}
            onChange={() => setShowRecommendations(!showRecommendations)}
          />
          <TickBox
            show={whereToStay}
            name="Place To Stay"
            checked={showWhereToStay}
            onChange={() => setShowWhereToStay(!showWhereToStay)}
          />
        </div>
        <div className="w-full h-full pb-10">
          {isLoaded ? (
            <GoogleMap
              onLoad={onLoad}
              onUnmount={onUnmount}
              onClick={() => setActiveMarker(null)}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              zoom={14}
            >
              <MarkerClusterer options={options}>
                {(clusterer) => (
                  <>
                    {mainData.mainLocations.map((loc) => (
                      <Marker
                        key={loc.lat}
                        position={loc}
                        icon={{
                          url: "/images/icon-pastel.png",
                          labelOrigin: new window.google.maps.Point(24, -10),
                        }}
                        onClick={() => handleActiveMarker(loc.lat)}
                        label={{
                          text: mainData.title,
                          color: "#FFFFFF",
                          fontSize: "1rem",
                          fontWeight: "900",
                          className: "current-pin-label",
                        }}
                      >
                        {activeMarker === loc.lat ? (
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <a
                              href={mainData.uri}
                              target="_blank"
                              className="flex flex-col items-center"
                            >
                              <h3 className="mb-2 text-xl font-semibold text-primary">
                                {mainData.title}
                              </h3>
                              <img
                                className="w-auto h-32 rounded-md"
                                src={mainData.image}
                                alt={mainData.title}
                              />
                            </a>
                          </InfoWindow>
                        ) : null}
                      </Marker>
                    ))}
                    {experiences &&
                      showExperiences &&
                      FilterMainData(experiences, mainData).map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                              className="experience-pin-label"
                              color="#FFFFFF"
                              imageName="icon-darkblue.png"
                            />
                          )
                      )}
                    {recommendations &&
                      showRecommendations &&
                      FilterMainData(recommendations, mainData).map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                              className="itinerary-pin-label"
                              color="#676767"
                              imageName="icon-gray.png"
                            />
                          )
                      )}
                    {whereToStay &&
                      showWhereToStay &&
                      FilterMainData(whereToStay, mainData).map(
                        (item) =>
                          item?.customDataAttributes?.latitudeOfLocation1 && (
                            <ShowMarkerBox
                              key={item.id}
                              item={item}
                              handleActiveMarker={handleActiveMarker}
                              clusterer={clusterer}
                              activeMarker={activeMarker}
                              setActiveMarker={setActiveMarker}
                              color="#FFFFFF"
                              className="pts-pin-label"
                              imageName="icon-blue.png"
                            />
                          )
                      )}
                    )
                  </>
                )}
              </MarkerClusterer>
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

export default ExperienceMapBox;
