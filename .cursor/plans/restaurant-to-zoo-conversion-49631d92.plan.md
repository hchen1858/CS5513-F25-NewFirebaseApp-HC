<!-- 49631d92-a2e5-4873-b2be-8c83c3ff2055 f9b31378-c106-4757-8ff0-5eabd9f8137c -->
# Rename Creature Assets to Standardized Format

## Overview

Rename all 20 creature image files in the `public/creatureassets/` folder to follow the naming convention `creature_N.jpg` where N is an integer from 1 to 20, ensuring each file has a unique name.

## Current Files (20 total):

1. another_minotaur.jpg
2. Black_Dragon.jpg
3. Chimera_fire_breathing.jpg
4. Dire_Wolf.jpg
5. goat_unicorn.jpg
6. Gryphon.jpg
7. Kitsune_fox.jpg
8. mayan_bird_serpent.jpg
9. mayan_flying_serpent.jpg
10. mermaid.jpg
11. Minotaur.jpg
12. serpent_fire.jpg
13. Silver_water_dragon.jpg
14. Silver_wolf.jpg
15. Stratford_Lyon.png → creature_15.jpg (convert .png to .jpg)
16. tree_serpent.jpg
17. Troll.jpg
18. water_horse.jpg
19. water_serpent.jpg
20. Winged_tree_serpent.jpg

## Renaming Mapping:

- another_minotaur.jpg → creature_1.jpg
- Black_Dragon.jpg → creature_2.jpg
- Chimera_fire_breathing.jpg → creature_3.jpg
- Dire_Wolf.jpg → creature_4.jpg
- goat_unicorn.jpg → creature_5.jpg
- Gryphon.jpg → creature_6.jpg
- Kitsune_fox.jpg → creature_7.jpg
- mayan_bird_serpent.jpg → creature_8.jpg
- mayan_flying_serpent.jpg → creature_9.jpg
- mermaid.jpg → creature_10.jpg
- Minotaur.jpg → creature_11.jpg
- serpent_fire.jpg → creature_12.jpg
- Silver_water_dragon.jpg → creature_13.jpg
- Silver_wolf.jpg → creature_14.jpg
- Stratford_Lyon.png → creature_15.jpg
- tree_serpent.jpg → creature_16.jpg
- Troll.jpg → creature_17.jpg
- water_horse.jpg → creature_18.jpg
- water_serpent.jpg → creature_19.jpg
- Winged_tree_serpent.jpg → creature_20.jpg

## Implementation Steps:

1. Rename each file using terminal commands
2. Update fakeCreatures.js to use the new naming convention
3. Verify all files are properly renamed

## After Renaming:

Update `src/lib/fakeCreatures.js` line 69-72 from:

```javascript
photo: `https://storage.googleapis.com/firestorequickstarts.appspot.com/food_${randomNumberBetween(1, 22)}.png`,
```

To:

```javascript
photo: `/creatureassets/creature_${randomNumberBetween(1, 20)}.jpg`,
```

This will make the creatures use the local creature images instead of the food images.

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