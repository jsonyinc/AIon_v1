import BlogPostClient from './BlogPostClient';
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// 공유 타입 정의 (필요시 별도 파일로 분리 가능)
interface Author {
  id: string;
  name: string;
  image_url: string | null;
  role: string | null;
  bio?: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface TagType {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  content: string;
  summary: string | null;
  image_url: string | null;
  published_at: string | null;
  read_time: string | null;
  author: Author | null;
  category: Category | null;
  tags: TagType[];
  likes_count: number;
  comments_count: number;
}

const fetchPostData = cache(async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
        id,
        created_at,
        title,
        content,
        summary,
        image_url,
        published_at,
        read_time,
        author:author_id ( id, name, image_url, role, bio ),
        category:category_id ( id, name, slug ),
        tags:post_tags ( tag:tag_id ( id, name, slug ) ),
        likes_count:likes(count),
        comments_count:comments(count)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post data in server component for id:', id, error);
    return null;
  }

  if (data) {
    // Supabase v3+에서 단일 조인 관계는 객체 또는 null, 다중 조인 관계는 배열로 반환될 수 있습니다.
    // Supabase JS 라이브러리 버전에 따라 반환 형태가 다를 수 있으므로 확인 필요.
    // .single() 사용 시에도 관계형 데이터는 배열로 반환될 수 있습니다.
    // likes_count, comments_count는 count 집계 결과이므로 배열 속의 객체로 올 수 있습니다.
    const authorArray = data.author as any[]; // Supabase가 배열로 반환하는 경우를 대비
    const authorData = (authorArray && authorArray.length > 0) ? authorArray[0] as Author : null;

    const categoryArray = data.category as any[]; // Supabase가 배열로 반환하는 경우를 대비
    const categoryData = (categoryArray && categoryArray.length > 0) ? categoryArray[0] as Category : null;
    
    return {
      id: data.id,
      created_at: data.created_at,
      title: data.title,
      content: data.content,
      summary: data.summary,
      image_url: data.image_url,
      published_at: data.published_at,
      read_time: data.read_time,
      author: authorData ? {
        id: authorData.id,
        name: authorData.name,
        image_url: authorData.image_url,
        role: authorData.role,
        bio: authorData.bio || null,
      } : null,
      category: categoryData ? {
        id: categoryData.id,
        name: categoryData.name,
        slug: categoryData.slug,
      } : null,
      tags: data.tags ? data.tags.map((tagRelation: any) => tagRelation.tag).filter(Boolean) : [],
      likes_count: (data.likes_count && Array.isArray(data.likes_count) && data.likes_count.length > 0) ? data.likes_count[0].count : 0,
      comments_count: (data.comments_count && Array.isArray(data.comments_count) && data.comments_count.length > 0) ? data.comments_count[0].count : 0,
    } as BlogPost;
  }
  return null;
});

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  // Explicitly await params before accessing properties, as per error message's implication
  // Although params in Server Components are usually resolved, this might satisfy the runtime check.
  // It's unusual to await params directly like this, but the error message is specific.
  // A more common pattern if params were a promise would be to use React.use(params) if it were a Client Component,
  // or for Server Components, destructuring is usually fine.
  // This is an attempt to directly address the "params should be awaited" part of the error.
  const resolvedParams = await params; 
  const id = resolvedParams.id;

  const post = await fetchPostData(id);

  if (!post) {
    notFound(); // 게시물을 찾지 못하면 404 페이지 표시
  }

  return <BlogPostClient initialPost={post} postId={id} />;
}
