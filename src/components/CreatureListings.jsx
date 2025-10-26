"use client";

// This components handles the creature listings page
// It receives data from src/app/page.jsx, such as the initial creatures and search params from the URL

import Link from "next/link";
import { React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import renderStars from "@/src/components/Stars.jsx";
import { getCreaturesSnapshot } from "@/src/lib/firebase/firestore.js";
import Filters from "@/src/components/Filters.jsx";

const CreatureItem = ({ creature }) => (
  <li key={creature.id}>
    <Link href={`/creature/${creature.id}`}>
      <ActiveCreature creature={creature} />
    </Link>
  </li>
);

const ActiveCreature = ({ creature }) => (
  <div>
    <ImageCover photo={creature.photo} name={creature.name} />
    <CreatureDetails creature={creature} />
  </div>
);

const ImageCover = ({ photo, name }) => (
  <div className="image-cover">
    <img src={photo} alt={name} />
  </div>
);

const CreatureDetails = ({ creature }) => (
  <div className="creature__details">
    <h2>{creature.name}</h2>
    <CreatureRating creature={creature} />
    <CreatureMetadata creature={creature} />
  </div>
);

const CreatureRating = ({ creature }) => (
  <div className="creature__rating">
    <ul>{renderStars(creature.avgRating)}</ul>
    <span>({creature.numRatings})</span>
  </div>
);

const CreatureMetadata = ({ creature }) => (
  <div className="creature__meta">
    <p>
      {creature.creatureType} | {creature.mythologyOrigin} | {creature.habitat}
    </p>
    <p>{"$".repeat(creature.rarity)}</p>
  </div>
);

export default function CreatureListings({
  initialCreatures,
  searchParams,
}) {
  const router = useRouter();

  // The initial filters are the search params from the URL, useful for when the user refreshes the page
  const initialFilters = {
    habitat: searchParams.habitat || "",
    creatureType: searchParams.creatureType || "",
    mythologyOrigin: searchParams.mythologyOrigin || "",
    rarity: searchParams.rarity || "",
    sort: searchParams.sort || "",
  };

  const [creatures, setCreatures] = useState(initialCreatures);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    routerWithFilters(router, filters);
  }, [router, filters]);

  useEffect(() => {
    return getCreaturesSnapshot((data) => {
      setCreatures(data);
    }, filters);
  }, [filters]);

  return (
    <article>
      <Filters filters={filters} setFilters={setFilters} />
      <ul className="creatures">
        {creatures.map((creature) => (
          <CreatureItem key={creature.id} creature={creature} />
        ))}
      </ul>
    </article>
  );
}

function routerWithFilters(router, filters) {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== "") {
      queryParams.append(key, value);
    }
  }

  const queryString = queryParams.toString();
  router.push(`?${queryString}`);
}
