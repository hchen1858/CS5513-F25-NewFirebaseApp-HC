import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/src/lib/firebase/clientApp";

import { updateCreatureImageReference } from "@/src/lib/firebase/firestore";


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


