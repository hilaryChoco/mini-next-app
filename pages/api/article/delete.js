import { PrismaClient } from "@prisma/client";

export default async function deleteArticle(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    try {
        const articles = await prisma.article.findMany({});

        if(articles){
            await prisma.article.deleteMany({})

            return res.status(200).json({
                message: "All articles were deleted!"
            });
        }else{
            return res.status(404).json({
                message: "No article"
            })
        }       

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error!"})
    }
}