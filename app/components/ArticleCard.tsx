import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    data: {
        id: number;
        title: string;
        content: string
        category: string;
        date: string;
        image: string;
    };
}

function ArticleCard({ data }: Props) {

    const content = (data.content).slice(0, 65);

    return (
        <Link href={`/blog/article/${data.id}`}>
            {/* <div className="flex lg:flex-row flex-col lg:items-center lg:justify-center lg:w-[424px] w-full lg:h-[184px] bg-white lg:mt-[-40px] lg:px-2 shadow">
                <div className="lg:w-[240px] w-full h-[156px] rounded-xl bg-violet-300"></div>
               
            </div> */}
            <div>
                <div className="w-full flex flex-col md:flex-row items-start justify-around p-3 cursor-pointer rounded-lg shadow hover:shadow-md transition-all ease-in-out delay-200">
                    <Image
                        className="md:w-60 h-48  bg-slate-600 rounded-md "
                        src={data.image}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                    <div className="flex flex-col lg:ml-4 lg:mt-0 mt-2">
                        <div className={`${data.category == 'Technologie'? 'bg-blue-500':'bg-pink-700'} p-1 rounded-md text-white font-semibold w-24 text-center`}>
                            {data.category}
                        </div>
                        <h2 className="my-1.5 font-semibold text-[21px] text-zinc-800">{data.title}</h2>
                        <p className="my-1.5 text-[15px] ">{content}...</p>
                        <span className="flex my-1">
                            <h6 className="flex items-center font-normal text-gray-500 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                </svg>
                                {data.date}
                            </h6>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard