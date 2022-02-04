const { PrismaClient } = require('@prisma/client');
const res = require('express/lib/response');
const prisma = new PrismaClient();

async function seed() {
    await createCustomer();
    const movies = await createMovies();
    const screens = await createScreens();
    await createScreenings(screens, movies);
    await createTicket();

    process.exit(0);
}

async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@boolean.co.uk',
                    phone: '1234567890'
                }
            }
        },
        include: {
            contact: true
        }
    });

    console.log('Customer created', customer);

    return customer;
}

async function createMovies() {
    const rawMovies = [
        { title: 'The Matrix', runtimeMins: 120 },
        { title: 'Dodgeball', runtimeMins: 154 },
    ];

    const movies = [];

    for (const rawMovie of rawMovies) {
        const movie = await prisma.movie.create({ data: rawMovie });
        movies.push(movie);
    }

    console.log('Movies created', movies);

    return movies;
}

async function createScreens() {
    const rawScreens = [
        { number: 1 }, { number: 2 }
    ];

    const screens = [];

    for (const rawScreen of rawScreens) {
        const screen = await prisma.screen.create({
            data: rawScreen
        });

        console.log('Screen created', screen);

        screens.push(screen);
    }

    return screens;
}

async function createScreenings(screens, movies) {
    const screeningDate = new Date();

    for (const screen of screens) {
        for (let i = 0; i < movies.length; i++) {
            screeningDate.setDate(screeningDate.getDate() + i);

            const screening = await prisma.screening.create({
                data: {
                    startsAt: screeningDate,
                    movie: {
                        connect: {
                            id: movies[i].id
                        }
                    },
                    screen: {
                        connect: {
                            id: screen.id
                        }
                    }
                }
            });

            console.log('Screening created', screening);
        }
    }
}

async function createTicket() {
    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                create: {
                    name: 'bob',
                    contact: {
                        create: {
                            email: 'bob@boolean.co.uk',
                            phone: '1234567890'
                        }
                    }
                }
            },
            screening: {
                create: {
                    screenId: 1,
                    movieId: 1,
                    startsAt: new Date(),
                }
            },
            seats: {
                create: [{
                    seat: {
                        create: {
                            number: 1,
                            screen: {
                                connect: {
                                    id: 1
                                }
                            }
                        }
                    }
                }]
            }
        },
        include: {
            customer: true,
            screening: true,
            seats: true
        }
    })
    console.log("createdTicket", createdTicket);
    //res.json({ data: { createdTicket } });
}

seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));