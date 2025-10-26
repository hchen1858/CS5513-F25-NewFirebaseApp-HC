<!-- 49631d92-a2e5-4873-b2be-8c83c3ff2055 d7c725ef-ab3c-4585-9c2e-ed2c78a7e82c -->
# Update CSS for Mythical Menagerie

## Overview

Update the `src/app/styles.css` file to replace all restaurant-related CSS class names with creature-themed equivalents to match the component changes already made.

## CSS Class Name Changes Required

### Main Layout Classes

- `.main__restaurant` → `.main__creature` (line 201)

### Grid and List Classes  

- `.restaurants` → `.creatures` (line 216)

### Component-Specific Classes

- `.restaurant__meta` → `.creature__meta` (line 260)
- `.restaurant__details` → `.creature__details` (line 268)
- `.restaurant__rating` → `.creature__rating` (line 272)
- `.restaurant__review_summary` → `.creature__review_summary` (line 292)

## Changes Summary

1. **Line 201**: Update main page class for creature detail pages
2. **Line 216**: Update grid container class for creature listings
3. **Line 260**: Update metadata display class
4. **Line 268**: Update details container class
5. **Line 272**: Update rating display class
6. **Line 292**: Update Gemini review summary class

All other CSS remains unchanged as it applies to general layout, dialogs, headers, filters, and reviews which are theme-agnostic.

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