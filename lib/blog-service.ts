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
  Timestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export interface BlogPost {
  id?: string
  title: string
  content: string
  excerpt: string
  author: string
  tags: string[]
  published: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

const COLLECTION_NAME = "blog-posts"

export class BlogService {
  static async createPost(post: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const now = Timestamp.now()
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...post,
      createdAt: now,
      updatedAt: now,
    })
    return docRef.id
  }

  static async getAllPosts(): Promise<BlogPost[]> {
    const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as BlogPost,
    )
  }

  static async getPublishedPosts(): Promise<BlogPost[]> {
    const q = query(collection(db, COLLECTION_NAME), where("published", "==", true), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as BlogPost,
    )
  }

  static async getPost(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, COLLECTION_NAME, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as BlogPost
    }
    return null
  }

  static async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    })
  }

  static async deletePost(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id)
    await deleteDoc(docRef)
  }
}
