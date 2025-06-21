"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogService, type BlogPost } from "@/lib/blog-service"
import { useAuth } from "@/contexts/auth-context"

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadPosts()
    }
  }, [user])

  const loadPosts = async () => {
    try {
      const allPosts = await BlogService.getAllPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await BlogService.deletePost(id)
        loadPosts()
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  const togglePublished = async (id: string, published: boolean) => {
    try {
      await BlogService.updatePost(id, { published: !published })
      loadPosts()
    } catch (error) {
      console.error("Error updating post:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/admin")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>

          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/admin/new">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>

            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Blog Admin</h1>
          <p className="text-gray-400 mb-8">Manage your blog posts</p>

          {/* Posts List */}
          {isLoading ? (
            <div className="text-center">Loading posts...</div>
          ) : posts.length === 0 ? (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <p className="text-gray-400 mb-4">No blog posts yet.</p>
                <Button asChild>
                  <Link href="/admin/new">Create your first post</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={post.published ? "default" : "secondary"}
                          className={post.published ? "bg-green-600" : "bg-gray-600"}
                        >
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Created: {post.createdAt?.toDate().toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        {post.published && (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/blog/${post.id}`}>
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Link>
                          </Button>
                        )}

                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/edit/${post.id}`}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Link>
                        </Button>

                        <Button variant="outline" size="sm" onClick={() => togglePublished(post.id!, post.published)}>
                          {post.published ? "Unpublish" : "Publish"}
                        </Button>

                        <Button variant="destructive" size="sm" onClick={() => handleDelete(post.id!)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
