const { Router } = require('express')
const prisma = require('../database')

const router = Router()

router.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
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