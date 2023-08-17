import { PrismaClient } from "@prisma/client";

export default async function create(req, res){
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }
    
    const prisma = new PrismaClient()

    const {} = req.body;
}