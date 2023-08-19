import { PrismaClient } from "@prisma/client";

export default async function deleteArticle(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    const articleId = parseInt(req.query.id);

    try {
        const article = await prisma.article.findUnique({
            where: {id: articleId}
        });

        if(article){
            await prisma.article.delete({
                where: {id: articleId }
            })

            return res.status(200).json({
                message: "Article deleted!"
            });
        }else{
            return res.status(404).json({
                message: "Article unavailable!"
            })
        }       

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error!"})
    }
}