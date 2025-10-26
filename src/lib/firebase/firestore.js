import { generateFakeCreaturesAndReviews } from "@/src/lib/fakeCreatures.js";

import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase/clientApp";

export async function updateCreatureImageReference(
  creatureId,
  publicImageUrl
) {
  const creatureRef = doc(collection(db, "creatures"), creatureId);
  if (creatureRef) {
    await updateDoc(creatureRef, { photo: publicImageUrl });
  }
}

const updateWithRating = async (
  transaction,
  docRef,
  newRatingDocument,
  review
) => {
  const creature = await transaction.get(docRef);
  const data = creature.data();
  const newNumRatings = data?.numRatings ? data.numRatings + 1 : 1;
  const newSumRating = (data?.sumRating || 0) + Number(review.rating);
  const newAverage = newSumRating / newNumRatings;

  transaction.update(docRef, {
    numRatings: newNumRatings,
    sumRating: newSumRating,
    avgRating: newAverage,
    //Add new field for userId making review to use as security check per Ethan's security fix
    lastReviewUserId: review.userId,
  });

  transaction.set(newRatingDocument, {
    ...review,
    timestamp: Timestamp.fromDate(new Date()),
  });
};

export async function addReviewToCreature(db, creatureId, review) {
  if (!creatureId) {
          throw new Error("No creature ID has been provided.");
  }

  if (!review) {
          throw new Error("A valid review has not been provided.");
  }

  try {
          const docRef = doc(collection(db, "creatures"), creatureId);
          const newRatingDocument = doc(
                  collection(db, `creatures/${creatureId}/ratings`)
          );

          // corrected line
          await runTransaction(db, transaction =>
                  updateWithRating(transaction, docRef, newRatingDocument, review)
          );
  } catch (error) {
          console.error(
                  "There was an error adding the rating to the creature",
                  error
          );
          throw error;
  }
}


function applyQueryFilters(q, { creatureType, mythologyOrigin, habitat, rarity, sort }) {
  if (creatureType) {
    q = query(q, where("creatureType", "==", creatureType));
  }
  if (mythologyOrigin) {
    q = query(q, where("mythologyOrigin", "==", mythologyOrigin));
  }
  if (habitat) {
    q = query(q, where("habitat", "==", habitat));
  }
  if (rarity) {
    q = query(q, where("rarity", "==", rarity.length));
  }
  if (sort === "Rating" || !sort) {
    q = query(q, orderBy("avgRating", "desc"));
  } else if (sort === "Review") {
    q = query(q, orderBy("numRatings", "desc"));
  }
  return q;
}

export async function getCreatures(db = db, filters = {}) {
  let q = query(collection(db, "creatures"));

  q = applyQueryFilters(q, filters);
  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

export function getCreaturesSnapshot(cb, filters = {}) {
  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  let q = query(collection(db, "creatures"));
  q = applyQueryFilters(q, filters);

  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        timestamp: doc.data().timestamp.toDate(),
      };
    });

    cb(results);
  });
}

export async function getCreatureById(db, creatureId) {
  if (!creatureId) {
    console.log("Error: Invalid ID received: ", creatureId);
    return;
  }
  const docRef = doc(db, "creatures", creatureId);
  const docSnap = await getDoc(docRef);
  return {
    ...docSnap.data(),
    timestamp: docSnap.data().timestamp.toDate(),
  };
}

// this function is complete in the nextjs-end codebase,
// but is never introduced in the tutorial steps anywhere, 
// so it remains non-functional at the end of the tutorial
export function getCreatureSnapshotById(creatureId, cb) {
  if (!creatureId) {
    console.log("Error: Invalid ID received: ", creatureId);
    return;
  }

  if (typeof cb !== "function") {
    console.log("Error: The callback parameter is not a function");
    return;
  }

  const docRef = doc(db, "creatures", creatureId);
  return onSnapshot(docRef, (docSnap) => {
    cb({
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toDate(),
    });
  });
}



export async function getReviewsByCreatureId(db, creatureId) {
  if (!creatureId) {
    console.log("Error: Invalid creatureId received: ", creatureId);
    return;
  }

  const q = query(
    collection(db, "creatures", creatureId, "ratings"),
    orderBy("timestamp", "desc")
  );

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

export function getReviewsSnapshotByCreatureId(creatureId, cb) {
  if (!creatureId) {
    console.log("Error: Invalid creatureId received: ", creatureId);
    return;
  }

  const q = query(
    collection(db, "creatures", creatureId, "ratings"),
    orderBy("timestamp", "desc")
  );
  return onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        timestamp: doc.data().timestamp.toDate(),
      };
    });
    cb(results);
  });
}

export async function addFakeCreaturesAndReviews() {
  const data = await generateFakeCreaturesAndReviews();
  for (const { creatureData, ratingsData } of data) {
    try {
      const docRef = await addDoc(
        collection(db, "creatures"),
        creatureData
      );

      for (const ratingData of ratingsData) {
        await addDoc(
          collection(db, "creatures", docRef.id, "ratings"),
          ratingData
        );
      }
    } catch (e) {
      console.log("There was an error adding the document");
      console.error("Error adding document: ", e);
    }
  }
}
