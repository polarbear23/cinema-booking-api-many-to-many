const prisma = require('../utils/prisma')


const createTicket = async (req, res) => {
    const { customerId, screeningId, seatIds } = req.body;
    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: customerId
                }
            },
            screening: {
                connect: {
                    id: screeningId
                }
            },
            seat: {
                connect: [...seatIds]
            }
        },
        include: {
            customer: true,
            screening: true,
            seat: true
        }
    })

    res.json({ data: { createdTicket } })
}


module.exports = { createTicket }