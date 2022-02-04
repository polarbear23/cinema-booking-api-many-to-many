/*
  Warnings:

  - You are about to drop the `_SeatToTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_A_fkey";

-- DropForeignKey
ALTER TABLE "_SeatToTicket" DROP CONSTRAINT "_SeatToTicket_B_fkey";

-- DropTable
DROP TABLE "_SeatToTicket";

-- CreateTable
CREATE TABLE "SeatsOnTickets" (
    "ticketId" INTEGER NOT NULL,
    "seatId" INTEGER NOT NULL,

    CONSTRAINT "SeatsOnTickets_pkey" PRIMARY KEY ("seatId","ticketId")
);

-- AddForeignKey
ALTER TABLE "SeatsOnTickets" ADD CONSTRAINT "SeatsOnTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatsOnTickets" ADD CONSTRAINT "SeatsOnTickets_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
