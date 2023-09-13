'use client'

import React from 'react'
import ArticleCard from '@/app/components/ArticleCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Plus } from 'react-feather';
import Link from 'next/link'

const data = [
  {
    id: 1,
    title: "L/'eau et le feu",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto",
    category: "Science",
    date: "12 juillet 2023",
    image: "/assets/abt.jpg",
  },
  {
    id: 2,
    title: "L/'eau et le feu",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto",
    category: "Technologie",
    date: "12 juillet 2023",
    image: "/assets/abt.jpg",
  },
  {
    id: 3,
    title: "L/'eau et le feu",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto",
    category: "Science",
    date: "12 juillet 2023",
    image: "/assets/abt.jpg",
  },
  {
    id: 4,
    title: "L/'eau et le feu",
    content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto",
    category: "Technologie",
    date: "12 juillet 2023",
    image: "/assets/abt.jpg",
  },
];

function Articles() {

  const [articles, setArticles] = useState([]);;

  const getArticles = async () => {
    try {
      const response = await axios.get('/api/article/listing');
      console.log(response.data)

      setArticles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-white m-0 p-0">
        <div className="w-full h-auto flex justify-start">
          <div className="flex flex-col p-6 w-full bg-white h-auto">
            <h1 className="font-bold text-3xl text-zinc-800 tracking-tight mb-4">Notre blog</h1>

            <div className="w-full h-auto flex items-center justify-between mb-3 ">
              <div className="flex flex-col md:flex-row items-center justify-start w-1/2  md:my-4 py-2">
                <button className="flex items-center justify-center border-none md:mr-1  h-10 w-36 md:w-12 bg-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" className="text-zinc-400 w-6 h-6 mr-3 md:mr-0">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <p className="md:hidden font-semibold text-base text-white">Rechercher</p>
                </button>
                <input className="w-full md:w-4/5 border-gray-300 border-0 focus-visible:ring-transparent border-b form-input p-2 outline-none block" type="text" placeholder="Entrer un mot clé" />
              </div>

              <div className="flex justify-end w-1/2 px-3">
                <button className='flex items-center bg-blue-500 p-4 rounded-sm'>
                  <Plus className='text-white'/>
                  <Link legacyBehavior href="/blog/add">
                    <p className='text-white ml-2'>Ajouter un article</p>
                  </Link>
                </button>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-8 md:gap-6 py-4 ">
              {articles.map((d, index) => (
                <ArticleCard key={index} data={d} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Articles