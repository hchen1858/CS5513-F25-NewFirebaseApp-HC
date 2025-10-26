// This component shows creature metadata, and offers some actions to the user like uploading a new creature image, and adding a review.

import React from "react";
import renderStars from "@/src/components/Stars.jsx";

const CreatureDetails = ({
  creature,
  userId,
  handleCreatureImage,
  setIsOpen,
  isOpen,
  children,
}) => {
  return (
    <section className="img__section">
      <img src={creature.photo} alt={creature.name} />

      <div className="actions">
        {userId && (
          <img
            alt="review"
            className="review"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            src="/review.svg"
          />
        )}
        <label
          onChange={(event) => handleCreatureImage(event.target)}
          htmlFor="upload-image"
          className="add"
        >
          <input
            name=""
            type="file"
            id="upload-image"
            className="file-input hidden w-full h-full"
          />

          <img className="add-image" src="/add.svg" alt="Add image" />
        </label>
      </div>

      <div className="details__container">
        <div className="details">
          <h2>{creature.name}</h2>

          <div className="creature__rating">
            <ul>{renderStars(creature.avgRating)}</ul>

            <span>({creature.numRatings})</span>
          </div>

          <p>
            {creature.creatureType} | {creature.mythologyOrigin} | {creature.habitat}
          </p>
          <p>{"◆".repeat(creature.rarity)}</p>  // Diamonds          
          {children}
        </div>
      </div>
    </section>
  );
};

export default CreatureDetails;
