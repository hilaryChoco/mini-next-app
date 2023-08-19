import { PrismaClient } from "@prisma/client";

export default async function create(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    const { title, content, image, catId } = req.body;

    try {
        const findCategory = await prisma.category.findUnique({
            where: {id: parseInt(catId)}
        });

        if(findCategory){
            const sameTitle = await prisma.article.findUnique({
                where: {title : title}
            });

            if(!sameTitle){
                const article = await prisma.article.create({
                    data: {
                        title,
                        content,
                        image,
                        category: {
                            connect: { id: catId },
                        },
                    },
                });
        
                return res.status(201).json({
                    message: "Article created succesfully!",
                    article
                })
            }else{
                return res.status(409).json({
                    message: "An article with this title already exists!"
                })
            }
            
        }else{
            return res.status(404).json({
                message: "This category doesn't exist"
            })
        }        

    } catch (error) {
        console.log("the error is", error)
        return res.status(500).json({
            message: "Internal server error!"
        })
    } finally {
        await prisma.$disconnect();
    }
}