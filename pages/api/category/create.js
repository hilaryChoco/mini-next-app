import { PrismaClient } from "@prisma/client";

export default async function create(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
    
    const prisma = new PrismaClient()

    const { name } = req.body;

    try {
        const exist = await prisma.category.findUnique({
            where: {
                name: name,
            },
        });

        if(!exist){
            const result = await prisma.category.create({
                data: {
                    name,
                },
            });
            return res.status(201).json({
                message: 'Category created!',
                result,
            });
        }else{
            return res.status(409).json({
                message: "This category already exist!"
            })
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err, message: 'Internal Server Error.' });
    }
}