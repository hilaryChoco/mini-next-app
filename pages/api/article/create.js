import { PrismaClient } from "@prisma/client";

export default async function create(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    const { title, content, catId } = req.body;

    try {
        const article = await prisma.article.create({
            data: {
                title,
                content,
                category: {
                    connect: { id: catId },
                },
            },
        });

        return res.status(201).json({
            message: "Article created succesfully!",
            article
        })

    } catch (error) {
        console.log("the error is", error)
        return res.status(500).json({
            message: "Internal server error!"
        })
    } finally {
        await prisma.$disconnect();
    }
}