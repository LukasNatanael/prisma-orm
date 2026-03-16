const { Router } = require('express')
const prisma = require('../database')

const router = Router()

router.get('/', async (req, res) => {
  const tags = await prisma.tag.findMany()
  res.json(tags)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const tag = await prisma.tag.create({
    data: { name },
  })
  res.status(201).json(tag)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const tags = await prisma.tag.findUnique({
    where: { id: Number(id) },
    include: { posts: {
      include: { author: { select: { name: true} } }
    } }
    
  })
  res.json(tags)
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const tag = await prisma.tag.update({
    data: { name },
    where: { id: Number(id) }
  })
  res.json(tag)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const tag = await prisma.tag.delete({ where: { id: Number(id) } })
  res.json(tag)
}) 

module.exports = router