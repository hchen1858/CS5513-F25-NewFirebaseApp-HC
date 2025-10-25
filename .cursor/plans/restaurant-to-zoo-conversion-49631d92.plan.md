<!-- 49631d92-a2e5-4873-b2be-8c83c3ff2055 f31a6a62-9133-474d-a905-27b6a9d8d148 -->
# Convert Restaurant Site to Mythical Creatures Zoo

## Overview

Transform the "Friendly Eats" restaurant review application into a mythical creatures zoo visitor review site called "Mythical Menagerie" (or similar). This involves renaming all restaurant-related terminology, updating data structures, modifying filters, and refreshing the UI theme.

## Key Changes

### 1. Data Model Updates (`src/lib/randomData.js`)

- Replace `restaurantNames` with mythical creature names (Dragon, Unicorn, Phoenix, Griffin, Basilisk, Kraken, Cerberus, Pegasus, etc.)
- Replace `restaurantCities` with zoo habitat names (Enchanted Forest, Dragon's Lair, Mystic Pool, Crystal Caverns, Sky Sanctuary, etc.)
- Split `restaurantCategories` into two arrays:
        - `creatureTypes`: Flying, Aquatic, Terrestrial, Magical, Fire-breathing, Ice-dwelling, etc.
        - `mythologyOrigins`: Greek, Norse, Egyptian, Chinese, Celtic, Japanese, Hindu, Persian, etc.
- Update `restaurantReviews` to creature-appropriate reviews (behavior observations, appearance, interactions, etc.)

### 2. Firestore Functions (`src/lib/firebase/firestore.js`)

- Rename all `restaurant` references to `creature` (functions, variables, collection names)
- Update `applyQueryFilters` to handle both `creatureType` and `mythologyOrigin` filters
- Rename functions:
        - `getRestaurants` → `getCreatures`
        - `getRestaurantById` → `getCreatureById`
        - `addReviewToRestaurant` → `addReviewToCreature`
        - `addFakeRestaurantsAndReviews` → `addFakeCreaturesAndReviews`
- Update Firestore collection paths from `restaurants` to `creatures`

### 3. Component Renaming and Updates

- **RestaurantListings.jsx** → **CreatureListings.jsx**
        - Update all props, state, and function names
        - Change filter structure to include `creatureType` and `mythologyOrigin`

- **Restaurant.jsx** → **Creature.jsx**
        - Update image handling function names
        - Change terminology in comments and variable names

- **RestaurantDetails.jsx** → **CreatureDetails.jsx**
        - Update display text and metadata structure
        - Change "category | city" to "creatureType | mythologyOrigin | habitat"

- **Filters.jsx**
        - Update summary text from "Restaurants" to "Creatures"
        - Split category filter into two separate filters:
                - `creatureType` filter with creature types
                - `mythologyOrigin` filter with mythology origins
        - Replace `city` filter with `habitat` filter
        - Keep `price` filter but update label to "Rarity" (still using $ symbols)

### 4. Main Pages

- **src/app/page.js**
        - Update function calls to use creature-related functions
        - Update variable names

- **src/app/restaurant/[id]/page.jsx** → **src/app/creature/[id]/page.jsx**
        - Move the entire folder structure
        - Update all imports and function calls

### 5. Supporting Files

- **src/lib/fakeRestaurants.js** → **src/lib/fakeCreatures.js**
        - Update data generation logic
        - Add support for both creatureType and mythologyOrigin

- **src/components/Reviews/ReviewSummary.jsx**
        - Update prompt to Gemini to reflect creature reviews
        - Change "restaurant reviews" to "creature visitor reviews"

- **src/app/layout.js**
        - Update metadata title to "Mythical Menagerie" or similar
        - Update description to reference zoo/creatures

- **src/components/Header.jsx**
        - Update logo text and alt text
        - Change "Add sample restaurants" to "Add sample creatures"

### 6. Database Schema Changes

The Firestore structure will change from:

```
restaurants/{restaurantId}
  - name, category, city, price, photo, avgRating, numRatings
  - ratings/{ratingId}
```

To:

```
creatures/{creatureId}
  - name, creatureType, mythologyOrigin, habitat, rarity, photo, avgRating, numRatings
  - ratings/{ratingId}
```

### 7. Filter System Enhancement

Current: city, category, price, sort

New: habitat, creatureType, mythologyOrigin, rarity, sort

This requires updating URL query parameters and filter state management throughout the application.

## Files to Modify

- `src/lib/randomData.js`
- `src/lib/fakeRestaurants.js` → `src/lib/fakeCreatures.js`
- `src/lib/firebase/firestore.js`
- `src/lib/firebase/storage.js`
- `src/components/RestaurantListings.jsx` → `src/components/CreatureListings.jsx`
- `src/components/Restaurant.jsx` → `src/components/Creature.jsx`
- `src/components/RestaurantDetails.jsx` → `src/components/CreatureDetails.jsx`
- `src/components/Filters.jsx`
- `src/components/Header.jsx`
- `src/components/Reviews/ReviewSummary.jsx`
- `src/app/page.js`
- `src/app/restaurant/[id]/` → `src/app/creature/[id]/`
- `src/app/layout.js`

### To-dos

- [ ] Update randomData.js with mythical creature names, habitats, creature types, mythology origins, and creature-appropriate reviews
- [ ] Rename and update fakeRestaurants.js to fakeCreatures.js with new data structure
- [ ] Update firestore.js to rename all restaurant references to creature and update collection paths
- [ ] Update storage.js to rename restaurant image functions to creature image functions
- [ ] Rename Restaurant*.jsx components to Creature*.jsx and update internal references
- [ ] Update Filters.jsx to support habitat, creatureType, mythologyOrigin, and rarity filters
- [ ] Move and update restaurant/[id] folder to creature/[id] and update page.js
- [ ] Update layout.js metadata and Header.jsx branding to reflect mythical zoo theme
- [ ] Update ReviewSummary.jsx Gemini prompt to reflect creature reviews instead of restaurant reviews