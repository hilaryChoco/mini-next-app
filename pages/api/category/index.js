import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function create(req, res) {
    const { name } = req.body;
    const result = await prisma.category.create({
        data: {
            name: name,
        },
    });
    res.json(result);
}