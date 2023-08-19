import { PrismaClient } from "@prisma/client";

export default async function edit(req, res){
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient();

    const { id } = req.query

    const { title, content, image, catId } = req.body;

    try {
        const exist = await prisma.article.findUnique({
            where: {id: parseInt(id)}
        });

        if(exist){
            const result = await prisma.article.update({
                where: {id: parseInt(id)},
                data: {
                    title,
                    content,
                    image,
                    catId
                }
            })

            return res.status(201).json({
                result
            })

        }else{
            return res.status(404).json({
                message: "This article doesn't exist!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}