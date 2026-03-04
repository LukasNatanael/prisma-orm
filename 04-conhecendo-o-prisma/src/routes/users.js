const { Router } = require("express")
const prisma = require("../database")

const router = Router()

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post("/", async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  })
  res.status(201).json(user)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {posts: true },
  })
  res.json(user)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  })
  res.json(user)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const deletedUser = await prisma.user.delete({
    where: { id: Number(id) },
  })

  res.json(deletedUser)
}) 


module.exports = router