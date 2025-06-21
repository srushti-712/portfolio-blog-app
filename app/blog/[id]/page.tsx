"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Tag, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlogService, type BlogPost } from "@/lib/blog-service"
import { useAuth } from "@/contexts/auth-context"

export default function BlogPostPage() {
  const params = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (params.id) {
          const blogPost = await BlogService.getPost(params.id as string)
          setPost(blogPost)
        }
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" asChild className="text-gray-400 hover:text-white">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {user && (
            <Button variant="outline" asChild className="border-slate-600 hover:bg-slate-800">
              <Link href={`/admin/edit/${post.id}`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Post
              </Link>
            </Button>
          )}
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {post.createdAt?.toDate().toLocaleDateString()}
                </div>
                <span>by {post.author}</span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-6">
                <Tag className="w-4 h-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-slate-700 text-gray-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">{post.content}</div>
          </div>
        </article>
      </div>
    </div>
  )
}
