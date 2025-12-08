import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published') === 'true';
    const authorId = searchParams.get('authorId');
    
    const whereClause: any = {};
    if (published !== undefined) {
      whereClause.published = published;
    }
    if (authorId) {
      whereClause.authorId = parseInt(authorId);
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, published, authorId, categoryIds, tagIds } = await request.json();
    
    if (!title || !authorId) {
      return NextResponse.json(
        { error: 'Title and authorId are required' },
        { status: 400 }
      );
    }

    // Verificar si el autor existe
    const author = await prisma.user.findUnique({
      where: { id: parseInt(authorId) },
    });

    if (!author) {
      return NextResponse.json(
        { error: 'Author not found' },
        { status: 404 }
      );
    }

    // Crear la publicación
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: parseInt(authorId),
        categories: categoryIds ? {
          connect: categoryIds.map((id: number) => ({ id })),
        } : undefined,
        tags: tagIds ? {
          create: tagIds.map((tagId: number) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        } : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Error creating post' },
      { status: 500 }
    );
  }
}