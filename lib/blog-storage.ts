export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  published: boolean
}

const STORAGE_KEY = "portfolio-blog-posts"

export class BlogStorage {
  static getPosts(): BlogPost[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static savePosts(posts: BlogPost[]): void {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }

  static addPost(post: Omit<BlogPost, "id" | "publishedAt" | "updatedAt">): BlogPost {
    const posts = this.getPosts()
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    posts.unshift(newPost)
    this.savePosts(posts)
    return newPost
  }

  static updatePost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const posts = this.getPosts()
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) return null

    posts[index] = {
      ...posts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.savePosts(posts)
    return posts[index]
  }

  static deletePost(id: string): boolean {
    const posts = this.getPosts()
    const filteredPosts = posts.filter((post) => post.id !== id)
    if (filteredPosts.length === posts.length) return false
    this.savePosts(filteredPosts)
    return true
  }

  static getPost(id: string): BlogPost | null {
    const posts = this.getPosts()
    return posts.find((post) => post.id === id) || null
  }

  static getPublishedPosts(): BlogPost[] {
    return this.getPosts().filter((post) => post.published)
  }
}
