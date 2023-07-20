import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <p className='text-4xl font-mono leading-loose text-center font-semibold'>This is my first 
        <Link href="https://nextjs.org/docs">
          <strong className='text-blue-500 text-6xl font-bold'> NextJS App</strong>
        </Link> <br /> 
        built to test my skills.
      </p>
    </div>
  )
}
