import React, { useState, Suspense } from "react";

// Fallback loader component
const Loader = ({ placeholder }) => (
  <div className="image-placeholder">{placeholder || "Loading..."}</div>
);

// Main Image component
const GImage = ({
  src,
  alt = "Image",
  placeholder = "Loading...",
  errorFallback = "Image failed to load",
  className = "",
  style = {},
  lazy = true,
  onLoad = () => {}, // Default empty function if no custom onLoad is passed
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if the image is loaded

  const handleLoad = (event) => {
    setIsLoaded(true); // Mark image as loaded
    onLoad(event); // Call the custom onLoad function
  };

  const handleError = (event) => {
    event.currentTarget.src = ""; // Optionally, set to a fallback image
    event.currentTarget.alt = errorFallback;
  };

  return (
    <div style={{ position: "relative", ...style }} className={className}>
      {/* Show loading placeholder until image is loaded */}
      {!isLoaded && <Loader placeholder={placeholder} />}
      <Suspense fallback={<Loader placeholder={placeholder} />}>
        <img
          src={src}
          alt={alt}
          className={className}
          style={{
            display: isLoaded ? "block" : "none", // Hide image until loaded
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      </Suspense>
    </div>
  );
};

export default GImage;
