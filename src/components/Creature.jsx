"use client";

// This components shows one individual creature
// It receives data from src/app/creature/[id]/page.jsx

import { React, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { getCreatureSnapshotById } from "@/src/lib/firebase/firestore.js";
import { useUser } from "@/src/lib/getUser";
import CreatureDetails from "@/src/components/CreatureDetails.jsx";
import { updateCreatureImage } from "@/src/lib/firebase/storage.js";

const ReviewDialog = dynamic(() => import("@/src/components/ReviewDialog.jsx"));

export default function Creature({
  id,
  initialCreature,
  initialUserId,
  children,
}) {
  const [creatureDetails, setCreatureDetails] = useState(initialCreature);
  const [isOpen, setIsOpen] = useState(false);

  // The only reason this component needs to know the user ID is to associate a review with the user, and to know whether to show the review dialog
  const userId = useUser()?.uid || initialUserId;
  const [review, setReview] = useState({
    rating: 0,
    text: "",
  });

  const onChange = (value, name) => {
    setReview({ ...review, [name]: value });
  };

  async function handleCreatureImage(target) {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }

    const imageURL = await updateCreatureImage(id, image);
    setCreatureDetails({ ...creatureDetails, photo: imageURL });
  }

  const handleClose = () => {
    setIsOpen(false);
    setReview({ rating: 0, text: "" });
  };

  useEffect(() => {
    return getCreatureSnapshotById(id, (data) => {
      setCreatureDetails(data);
    });
  }, [id]);

  return (
    <>
      <CreatureDetails
        creature={creatureDetails}
        userId={userId}
        handleCreatureImage={handleCreatureImage}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
        {children}
      </CreatureDetails>
      {userId && (
        <Suspense fallback={<p>Loading...</p>}>
          <ReviewDialog
            isOpen={isOpen}
            handleClose={handleClose}
            review={review}
            onChange={onChange}
            userId={userId}
            id={id}
          />
        </Suspense>
      )}
    </>
  );
}
