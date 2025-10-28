import { gemini20Flash, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";
import { getReviewsByCreatureId } from "@/src/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/src/lib/firebase/serverApp";
import { getFirestore } from "firebase/firestore";


export async function GeminiSummary({ creatureId }) {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  const reviews = await getReviewsByCreatureId(
    getFirestore(firebaseServerApp),
    creatureId
  );

  //Make a prompt that covers the 1st 30 reviews, each up to 500 chars long, and separated by an @ character.
  const reviewSeparator = "@";
  const MAX_REVIEWS = 30;           // Limit number of reviews
  const MAX_REVIEW_LENGTH = 500;    // Limit each review to 500 chars
  
  const prompt = `
  Based on the following visitor reviews for a mythical creature exhibit at a zoo, 
  where each review is separated by a '${reviewSeparator}' character, 
  create a one-sentence summary focusing on the creature's behavior, appearance, 
  habitat quality, and overall visitor experience. 

  Here are the reviews: ${reviews
    .map((review) => (review?.text || "").trim().substring(0, MAX_REVIEW_LENGTH))
    .filter(Boolean)
    .slice(0, MAX_REVIEWS)
    .join(reviewSeparator)}
`;

  /*
  const reviewSeparator = "@";

  const prompt = `
  Based on the following visitor reviews for a mythical creature exhibit at a zoo, 
  where each review is separated by a '${reviewSeparator}' character, 
  create a one-sentence summary focusing on the creature's behavior, appearance, 
  habitat quality, and overall visitor experience. 

  Here are the reviews: ${reviews.map((review) => review.text).join(reviewSeparator)}
`; */
  
if (!reviews || reviews.length === 0) {
  return (
    <div className="creature__review_summary">
      <p>No reviews available for this creature yet.</p>
    </div>
  );
}

  try {
    if (!process.env.GEMINI_API_KEY) {
      // Make sure GEMINI_API_KEY environment variable is set:
      // https://firebase.google.com/docs/genkit/get-started
      throw new Error(
        'GEMINI_API_KEY not set. Set it with "firebase apphosting:secrets:set GEMINI_API_KEY"'
      );
    }

    // Configure a Genkit instance.
    const ai = genkit({
      plugins: [googleAI()],
      model: gemini20Flash, // set default model
    });

    const result = await ai.generate({ prompt });
    // Try multiple shapes Genkit/Google AI may return
    const text =
      result?.outputText ??
      result?.text ??
      result?.response?.text ??
      result?.response?.candidates?.[0]?.content?.parts
        ?.map((p) => p?.text)
        .filter(Boolean)
        .join(" ") ??
      "";

    if (!text || text.trim() === "") {
      return (
        <div className="creature__review_summary">
          <p>Unable to generate a summary at this time.</p>
          <p>✨ Summarized with Gemini</p>
        </div>
      );
    }

    /*const { response } = await ai.generate(prompt);
    const text = response?.text;

  if (!text || text.trim() === '') {
    return (
      <div className="creature__review_summary">
      <p>Unable to generate summary at this time. Empty response from AI</p>
      </div>
  );
}*/

    return (
      <div className="creature__review_summary">
        <p>{text}</p>
        <p>✨ Summarized with Gemini</p>
      </div>
    );
  } catch (e) {
    console.error(e);
    return <p>Error summarizing reviews.</p>;
  }
}



export function GeminiSummarySkeleton() {
  return (
    <div className="creature__review_summary">
      <p>✨ Summarizing reviews with Gemini...</p>
    </div>
  );
}
