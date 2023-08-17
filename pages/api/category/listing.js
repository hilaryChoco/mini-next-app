import { PrismaClient } from "@prisma/client";

export default async function listing(req, res){
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient();

    try {
        const categories = await prisma.category.findMany();

        return res.status(200).json(categories);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
}