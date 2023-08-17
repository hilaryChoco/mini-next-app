import { PrismaClient } from "@prisma/client";

export default async function deleteCategory(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const prisma = new PrismaClient()

    const catId = parseInt(req.query.id);

    try {
        const category = await prisma.category.findUnique({
            where: {id: catId}
        });

        if(category){
            await prisma.category.delete({
                where: {id: catId }
            })

            return res.status(200).json({
                message: "Category deleted!"
            });
        }else{
            return res.status(404).json({
                message: "Category unavailable!"
            })
        }       

    } catch (error) {
        console.log(error)
    }
}