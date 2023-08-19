import { PrismaClient } from "@prisma/client";

export default async function create(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    try {
        const articles = await prisma.article.findMany({
            include: { category: true }
        });

        return res.status(200).json(articles);

    } catch (error) {
        console.log("the error is", error)
        return res.status(500).json({
            message: "Internal server error!"
        })
    } finally {
        await prisma.$disconnect();
    }
}