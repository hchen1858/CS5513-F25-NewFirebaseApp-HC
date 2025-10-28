import {
  randomNumberBetween,
  getRandomDateAfter,
  getRandomDateBefore,
} from "@/src/lib/utils.js";
import { randomData } from "@/src/lib/randomData.js";

import { Timestamp } from "firebase/firestore";

export async function generateFakeCreaturesAndReviews() {
  const creaturesToAdd = 5;
  const data = [];

  for (let i = 0; i < creaturesToAdd; i++) {
    const creatureTimestamp = Timestamp.fromDate(getRandomDateBefore());

    const ratingsData = [];

    // Generate a random number of ratings/reviews for this creature
    for (let j = 0; j < randomNumberBetween(0, 5); j++) {
      const ratingTimestamp = Timestamp.fromDate(
        getRandomDateAfter(creatureTimestamp.toDate())
      );

      const ratingData = {
        rating:
          randomData.creatureReviews[
            randomNumberBetween(0, randomData.creatureReviews.length - 1)
          ].rating,
        text: randomData.creatureReviews[
          randomNumberBetween(0, randomData.creatureReviews.length - 1)
        ].text,
        userId: `User #${randomNumberBetween()}`,
        timestamp: ratingTimestamp,
      };

      ratingsData.push(ratingData);
    }

    const avgRating = ratingsData.length
      ? ratingsData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.rating,
          0
        ) / ratingsData.length
      : 0;

    const creatureData = {
      creatureType:
        randomData.creatureTypes[
          randomNumberBetween(0, randomData.creatureTypes.length - 1)
        ],
      mythologyOrigin:
        randomData.mythologyOrigins[
          randomNumberBetween(0, randomData.mythologyOrigins.length - 1)
        ],
      name: randomData.creatureNames[
        randomNumberBetween(0, randomData.creatureNames.length - 1)
      ],
      avgRating,
      habitat: randomData.creatureHabitats[
        randomNumberBetween(0, randomData.creatureHabitats.length - 1)
      ],
      numRatings: ratingsData.length,
      sumRating: ratingsData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.rating,
        0
      ),
      rarity: randomNumberBetween(1, 4),
      photo: `/creatureassets/creature_${randomNumberBetween(
        1,
        20
      )}.jpg`,
      timestamp: creatureTimestamp,
    };
   

    data.push({
      creatureData,
      ratingsData,
    });
  }
  return data;
}
