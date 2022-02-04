const prisma = require('../utils/prisma')


const getSeatByScreenId = async (req, res) => {
    const seats = await prisma.seat.findMany({
        where: {
            screenId: parseInt(req.params.screenId)
        },
        include: {
            screen: true,
            tickets: true
        }
    })
    res.json({ data: { seats } })
}


module.exports = { getSeatByScreenId }