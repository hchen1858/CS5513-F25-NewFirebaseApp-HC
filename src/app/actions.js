"use server";

import { addReviewToCreature } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp.js";
import { getFirestore } from "firebase/firestore";


// This is a next.js server action, which is an alpha feature, so
// use with caution.
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
export async function handleReviewFormSubmission(data) {

   // const { app } = await getAuthenticatedAppForUser();
  // Retrieve currentUser from server-side firebase auth for security  
    const { app, currentUser } = await getAuthenticatedAppForUser();
    
    const db = getFirestore(app);

    await addReviewToCreature(db, data.get("creatureId"), {
            text: data.get("text"),
            rating: data.get("rating"),

            //Replace next two lines with Ethan's more secure workaround
            // This came from a hidden form field.
            //userId: data.get("userId"),

            //ETHAN'S NOTE: Instead of letting userid be passed from client in a hidden form field,
            //use the server-side firebase auth result for currentUser.uid
            //More secure because not relying on client posted userid
            userId: currentUser.uid,
    });
}

