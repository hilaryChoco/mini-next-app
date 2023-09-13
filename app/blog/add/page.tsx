'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { storage } from '../../firebase/firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function ArticleAdd() {
  const router = useRouter();

  type Format = {
    id: number;
    name: string;
  };

  const [categories, setCategories] = useState<Format[]>([]);;

  const getCategories = async () => {
    try {
      const response = await axios.get('/api/category/listing');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Insertion de l'image dans Firebase
  const [imgUrl, setImgUrl] = useState('');
  const [progresspercent, setProgresspercent] = useState(0);

  const handleFireBaseUpload = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) return;

    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("The url", downloadURL)
          setImgUrl(downloadURL)
        });
        console.log(imgUrl)
      }
    );
  }

  // Creation d'un nouvel article
  const [article, setArticle] = useState({
    title: '',
    content: '',
    catId: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const createArticle = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    if (article.title && article.catId && article.content) {
      const title = article.title;
      const catId = article.catId;
      const content = article.content;
      const image = imgUrl;

      await axios.post('/api/article/create', {
        title: title,
        content: content,
        image: image,
        catId: catId,
      })
        .then((response) => {
          console.log(response.data)
          router.push('/blog/articles');
          setLoading(false)
        })
        .catch((error: any) => {
          setMessage(error.response.data.message)
          setLoading(false)
        })
    }
    else {
      setIsError(true);
      setMessage("All fields are required");
      setLoading(false)
      return;
    }
  }

  return (
    <div>
      <div className="flex items-center justify-center w-full min-h-screen p-3 bg-white">
        <div className="flex flex-col items-center justify-center w-4/5 p-4 h-auto bg-slate-100 rounded-lg shadow">
          {/* <div className="relative w-36 h-36 rounded-full overflow-clip shadow">
            {avatar ? (
              <>
                <Image
                  className="relative w-full h-full object-cover"
                  src={avatar}
                  alt={lastname}
                // width={40} height={26}
                />
                <div className="absolute w-6 h-6 rounded-full bg-gray-400"></div>
              </>
            ) : (
              <>
                <Image
                  className="relative w-full h-full object-cover"
                  src={userImage}
                  alt={lastname}
                // width={20} height={10}
                />
                <div className="absolute w-6 h-6 rounded-full bg-gray-400"></div>
              </>
            )}
          </div> */}

          {/* Formulaire pour editer le profil de l'utilisateur */}
          <form className="flex flex-col w-full py-3 px-4" onSubmit={createArticle}>

            {/* Error or success message show */}
            <p className={`${isError ? 'text-red-500' : 'text-green-500'} text-center mb-4`}>
              {message}
            </p>

            <div className="w-full mt-3">
              <label>
                Titre de l&apos;article
              </label>
              <input
                value={article.title}
                onChange={(e) => [setArticle({ ...article, title: e.target.value }), setMessage('')]}
                className="border-gray-300 mt-1 border form-input p-2 outline-blue-500 block rounded-lg shadow-sm w-full"
                type="text"
                placeholder="Ex: Les technologies les plus utilisées en 2023"
                required
              />
            </div>

            <div className="w-full mt-3">
              <label>Categorie</label>
              <select
                value={article.catId}
                onChange={(e) => [setArticle({ ...article, catId: e.target.value }), setMessage('')]}
                className="form-select p-2 outline-blue-500 mt-1 border block border-gray-300 rounded-lg shadow-sm w-full"
              >
                <option value="">Dérouler la liste pour choisir...</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="w-full mt-3">
              <label>Image</label>
              <input
                onChange={handleFireBaseUpload}
                className="border-gray-300 mt-1 border form-input p-2 outline-blue-500 block rounded-lg shadow-sm w-full"
                type="file"
                id="file" />
            </div>

            <div className="w-full mt-3">
              <label>Corps de l&apos;article</label>
              <textarea name="" id="" cols={30} rows={10}
                value={article.content}
                onChange={(e) => [setArticle({ ...article, content: e.target.value }), setMessage('')]}
                className="border-gray-300 mt-1 border form-input p-2 outline-blue-500 block rounded-lg shadow-sm w-full"
              >
              </textarea>
            </div>
            {imgUrl &&
              <button
                type="submit"
                disabled={loading}
                className="p-2 mt-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 disabled:bg-blue-300 text-white font-semibold flex items-center justify-center"
              >
                {loading ? (
                  <span>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm10-10.582A7.963 7.963 0 0120 12h-4c0-3.314-2.018-6.153-4.899-7.374l3.799-1.648z"
                      ></path>
                    </svg>
                  </span>
                ) : (
                  <span>Publier</span>
                )}
              </button>
            }
          </form>
          {
            !imgUrl &&
            <div className='outerbar'>
              <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ArticleAdd