'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/blog-data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, User, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();

  // Filter posts based on selected tag
  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  return (
    <div className="space-y-8">
      {/* Tag Cloud */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant={selectedTag === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedTag(null)}
          className="rounded-full"
        >
          All
        </Button>
        {allTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            className="rounded-full"
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group h-full block">
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 group-hover:-translate-y-1">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-secondary/50">
                    <span className="text-4xl font-bold text-muted-foreground/20">Blog</span>
                  </div>
                )}
                <Badge className="absolute top-3 right-3 shadow-sm" variant="secondary">
                  {post.category}
                </Badge>
              </div>
              
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  {post.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  )}
                </div>
                <CardTitle className="line-clamp-2 text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-secondary/50 px-2 py-1 rounded-md text-secondary-foreground/80 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground self-center">+{post.tags.length - 3}</span>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4 bg-muted/5">
                <div className="flex items-center text-sm font-medium text-muted-foreground">
                  <User className="w-3 h-3 mr-2" />
                  {post.author}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found with the selected tag.</p>
          <Button variant="link" onClick={() => setSelectedTag(null)}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
