import Creature from "@/src/components/Creature.jsx";
import { Suspense } from "react";
import { getCreatureById } from "@/src/lib/firebase/firestore.js";
import {
  getAuthenticatedAppForUser,
  getAuthenticatedAppForUser as getUser,
} from "@/src/lib/firebase/serverApp.js";
import ReviewsList, {
  ReviewsListSkeleton,
} from "@/src/components/Reviews/ReviewsList";
import {
  GeminiSummary,
  GeminiSummarySkeleton,
} from "@/src/components/Reviews/ReviewSummary";
import { getFirestore } from "firebase/firestore";

export default async function Home(props) {
  // This is a server component, we can access URL
  // parameters via Next.js and download the data
  // we need for this page
  const params = await props.params;
  const { currentUser } = await getUser();
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const creature = await getCreatureById(
    getFirestore(firebaseServerApp),
    params.id
  );

  return (
    <main className="main__creature">
      <Creature
        id={params.id}
        initialCreature={creature}
        initialUserId={currentUser?.uid || ""}
      >
        <Suspense fallback={<GeminiSummarySkeleton />}>
          <GeminiSummary creatureId={params.id} />
        </Suspense>
      </Creature>
      <Suspense
        fallback={<ReviewsListSkeleton numReviews={creature.numRatings} />}
      >
        <ReviewsList creatureId={params.id} userId={currentUser?.uid || ""} />
      </Suspense>
    </main>
  );
}
