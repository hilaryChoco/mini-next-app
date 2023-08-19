import { PrismaClient } from "@prisma/client";

export default async function listOne(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient();

    const { id } = req.query

    try {
        const result = await prisma.article.findUnique({
            where: { id: parseInt(id) },
            include: { category: true }
        })

        if (result) {
            return res.status(200).json({
                result
            })
        } else {
            return res.status(404).json({
                message: "This article doesn't exist!"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}