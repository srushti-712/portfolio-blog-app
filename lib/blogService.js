import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "../firebase"

const COLLECTION_NAME = "blog-posts"

export const blogService = {
  // Create a new blog post
  async createPost(postData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error creating post:", error)
      throw error
    }
  },

  // Get all published posts (for public blog page)
  async getPublishedPosts() {
    try {
      const q = query(collection(db, COLLECTION_NAME), where("published", "==", true), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error fetching published posts:", error)
      throw error
    }
  },

  // Get all posts (for admin)
  async getAllPosts() {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error("Error fetching all posts:", error)
      throw error
    }
  },

  // Get a single post by ID
  async getPost(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        }
      } else {
        return null
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      throw error
    }
  },

  // Update a post
  async updatePost(id, updateData) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error updating post:", error)
      throw error
    }
  },

  // Delete a post
  async deletePost(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error("Error deleting post:", error)
      throw error
    }
  },
}
