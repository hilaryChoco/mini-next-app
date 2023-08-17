import { PrismaClient } from "@prisma/client";

export default async function edit(req, res){
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient();

    const { id } = req.query

    const { name } = req.body

    try {
        const exist = await prisma.category.findUnique({
            where: {id: parseInt(id)}
        });

        if(exist){
            const result = await prisma.category.update({
                where: {id: parseInt(id)},
                data: {
                    name
                }
            })

            return res.status(201).json({
                result
            })

        }else{
            return res.status(404).json({
                message: "This category doesn't exist!"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}