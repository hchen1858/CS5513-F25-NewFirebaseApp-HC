<!-- 49631d92-a2e5-4873-b2be-8c83c3ff2055 34d9be7e-b786-4eb8-8e8d-f6b34f6f212f -->
# Remove Image Upload Feature via Code Comments

## Overview

Disable the ability for users to upload custom images to creature pages by commenting out relevant code in three files. This preserves the functionality for easy restoration in the future.

## Files to Modify

### 1. `src/components/CreatureDetails.jsx`

Comment out the image upload button (lines 29-42):

```jsx
      <div className="actions">
        {userId && (
          <img
            alt="review"
            className="review"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            src="/review.svg"
          />
        )}
        {/* Image upload feature disabled - uncomment to restore
        <label
          onChange={(event) => handleCreatureImage(event.target)}
          htmlFor="upload-image"
          className="add"
        >
          <input
            name=""
            type="file"
            id="upload-image"
            className="file-input hidden w-full h-full"
          />

          <img className="add-image" src="/add.svg" alt="Add image" />
        </label>
        */}
      </div>
```

Remove `handleCreatureImage` from the props destructuring (line 9):

```jsx
const CreatureDetails = ({
  creature,
  userId,
  // handleCreatureImage,  // Commented out - image upload disabled
  setIsOpen,
  isOpen,
  children,
}) => {
```

### 2. `src/components/Creature.jsx`

Comment out the image upload import (line 11):

```jsx
// import { updateCreatureImage } from "@/src/lib/firebase/storage.js";  // Commented out - image upload disabled
```

Comment out the `handleCreatureImage` function (lines 35-43):

```jsx
  /* Image upload feature disabled - uncomment to restore
  async function handleCreatureImage(target) {
    const image = target.files ? target.files[0] : null;
    if (!image) {
      return;
    }

    const imageURL = await updateCreatureImage(id, image);
    setCreatureDetails({ ...creatureDetails, photo: imageURL });
  }
  */
```

Remove `handleCreatureImage` from the CreatureDetails component props (line 61):

```jsx
      <CreatureDetails
        creature={creatureDetails}
        userId={userId}
        // handleCreatureImage={handleCreatureImage}  // Commented out - image upload disabled
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      >
```

### 3. `src/lib/firebase/storage.js`

Comment out the import for `updateCreatureImageReference` (line 5):

```jsx
// import { updateCreatureImageReference } from "@/src/lib/firebase/firestore";  // Commented out - image upload disabled
```

Comment out both functions (lines 8-33):

```jsx
/* Image upload feature disabled - uncomment to restore
export async function updateCreatureImage(creatureId, image) {
    try {
      if (!creatureId) {
        throw new Error("No creature ID has been provided.");
      }
  
      if (!image || !image.name) {
        throw new Error("A valid image has not been provided.");
      }
  
      const publicImageUrl = await uploadImage(creatureId, image);
      await updateCreatureImageReference(creatureId, publicImageUrl);
  
      return publicImageUrl;
    } catch (error) {
      console.error("Error processing request:", error);
    }
  }
  
  async function uploadImage(creatureId, image) {
    const filePath = `images/${creatureId}/${image.name}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytesResumable(newImageRef, image);
  
    return await getDownloadURL(newImageRef);
  }
*/
```

## Benefits

- **UI Clean-up**: Removes the upload button from creature pages
- **Easy Restoration**: All code preserved in comments with clear labels
- **Safe**: No database schema changes required
- **Consistent**: Comments explain why feature is disabled

## To Restore Feature Later

Simply uncomment all sections marked with "Image upload feature disabled - uncomment to restore" in the three files above.

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