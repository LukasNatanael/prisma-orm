const { Router } = require('express')
const prisma = require('../database')

const router = Router()

router.get('/', async (req, res) => {
  const page     = Number(req.params.page)     || 1
  const pageSize = Number(req.params.pageSize) || 10

  const skip = (page - 1) * pageSize
  const take = pageSize

  const posts = await prisma.post.findMany({
    where:   { published: true },
    orderBy: { createdAt: 'desc' },
    take,
    skip,
  })

  const publishedPosts   = await prisma.post.count({ where: { published: true } })
  const unpublishedPosts = await prisma.post.count({ where: { published: false } })
  const totalPages = Math.ceil(publishedPosts / pageSize)

  res.json({
    posts,
    pagination: {
      page,
      pageSize,
      totalPages,
      publishedPosts,
      unpublishedPosts
    }
  })
})

router.get('/search', async (req, res) => {
  const { title, authorId, published, startDate, endDate } = req.query
  const filter = {}

  if (title) {
    filter.title = {
      contains: title,
      mode: 'insensitive'
    }
  }

  if (authorId) {
    filter.authorId = Number(authorId)
  }

  if (published) {
    filter.published = published === 'true'
  }

  if ( startDate || endDate) {
    filter.createdAt = {}

    if (startDate) {
      filter.createdAt.gte = new Date(startDate)
    }
    
    if (endDate) {
      filter.createdAt.lte = new Date(endDate)
      
    }
  }  

  console.log('Filtros:', filter)

  const posts = await prisma.post.findMany({
    where: filter,
    orderBy: { createdAt: 'desc' }
  })

  res.json(posts)
})

router.post('/', async (req, res) => {
  const { title, slug, content, authorId } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      authorId
    },
  })
  res.status(201).json(post)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const posts = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  })
  res.json(posts)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { title, slug, content, published } = req.body
  const post = await prisma.post.update({
    data: { title, slug, content, published },
    where: { id: Number(id) }
  })
  res.json(post)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  })

  res.json(deletedPost)
}) 

module.exports = router