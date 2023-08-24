import React, { useState, useEffect } from "react";
import { SearchIcon, PhotographIcon, NewspaperIcon, XIcon } from '@heroicons/react/solid'

function Searchresults({openMenu, open, getData2, dataText, dataImages, dataVideos, dataNews}) {

const [web, setWeb] = useState(true);
const [images, setImages] = useState(false);
const [videos, setVideos] = useState(false);
const [news, setNews] = useState(false);

    const showImages = () => {
        setWeb(false);
        setImages(true);
        setVideos(false);
        setNews(false);
    }

    const showWeb = () => {
        setWeb(true);
        setImages(false);
        setVideos(false);
        setNews(false);
    }

    const showVideos = () => {
      setWeb(false);
      setImages(false);
      setVideos(true);
      setNews(false);
      getData2();
  }

  const showNews = () => {
      setWeb(false);
      setImages(false);
      setVideos(false);
      setNews(true);
      getData2();
  }

  return (
    <div className="z-10">
        {openMenu && (
        <div className="fixed h-screen w-screen z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white text-left overflow-hidden transform transition-all sm:align-middle sm:max-w-lg w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
            <div>
                {web &&
                <div>
                {(dataText?.value ?? []).map((result, index) => {
        return (
          <div className="searchresult_list mx-2 sm:border rounded-lg shadow-lg sm:shadow-none p-2 sm:p-0 mb-5 border-white sm:hover:bg-gray-50" key={index}>
            <div className="">
            <div className="flex pt-6 px-2 items-center">
          <div>
          <span
              >
                <a href={result.url} target="_blank" rel="noreferrer">
                  <p className="sm:ml-2 font-bold my-2 text-blue-700 text-lg" dangerouslySetInnerHTML={{ __html: result.name }}></p>
                </a>
              </span>
          <div className="flex items-center">
          <p className={`sm:ml-2 pb-2 ${result?.thumbnailUrl? "ml-0" : "ml-0" } font-sans text-gray-800`} dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
{result?.thumbnailUrl? <><img src={result.thumbnailUrl} className="w-auto hidden h-24 rounded ml-2" alt={result.name} /></> : <></>}
          </div>
          </div>
            </div>
            </div>
          </div>
        );
      })}
                </div>
                }
                {images &&
                <div>
                {(dataImages.value ?? []).map((result, index) => {
            return (
                <div className="" key={index}>
                    <div className="px-4 pb-4 pt-6">
                        <a className="flex justify-center" href={result.contentUrl} target="_blank" rel="noreferrer"> 
                            <img src={result.thumbnailUrl} className={`object-cover sm:border h-auto hover:shadow-lg w-full sm:rounded-lg sm:h-48 sm:w-auto sm:border-white`} alt={result.name} />                                    
                        </a>
                    </div>
                </div>
            );
        })}                    
                </div>
                }
                {videos &&
                <div>
                {(dataVideos.value ?? []).map((result, index) => {
                        console.log(result);
                        const links = result.contentUrl.split("?v=")[1];
                        const newlinks = `https://www.youtube.com/embed/${links}`
                        return (
                            <div className="mx-4 mb-4 pt-3" key={index}>
                                <div className={` rounded-lg bg-black`}>
                                      <div className="flex  px-2 justify-center">
                                        <iframe src={newlinks} className="mt-6 w-full h-auto" />
                                      </div>
                                    <a target="_blank" href={result.contentUrl} rel="noreferrer">
                                        <p className={`line-clamp-2 mb-3 mt-2 sm:mt-1 hover:underline font-semibold px-2 text-sm text-gray-200`}>
                                            {result.name}
                                        </p>
                                    </a>
                                    <a className="" href={result.hostPageUrl}>
                                    <div className=" mx-2">
                                    {result?.creator ? (
  <div translate="no" className="text-sm text-gray-100">
    {result.creator["name"]}{" "}
    {result.publisher.map((result, index) => (
      <a translate="no" className="text-sm text-gray-100">
        {result.name}
      </a>
    ))}
  </div>
) : null}

{result?.viewCount ? (
  <div className="pb-4">
    <a className="text-sm pb-3 text-gray-100"> Visualizaciones: {result.viewCount.toLocaleString()} <a className="text-black">---</a>  {result?.datePublished?.split("T")[0]} </a>
  </div>
) : null}

                                    </div>
                                    </a>
                                </div>
                            </div>
                        );
                    })}                    
                </div>
                }
                {news &&
                <div>
                {(dataNews.value || []).map((result, index) => {

                  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (isSameDay(date, today)) {
      return 'Hoy';
    } else if (isSameDay(date, yesterday)) {
      return 'Ayer';
    } else {
      const diffTime = Math.abs(today - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        return `${diffDays} dia atrás`;
      } else if (diffDays <= 7) {
        return `${diffDays} dias atrás`;
      } else {
        return date.toLocaleDateString(); 
      }
    }
  };
  
  
  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };


        return (
          <>
          <div className="mt-6 mx-4 sm:hidden">
          <div className="sm:mb-0">
            <div className="flex items-center">
              {result.image?.thumbnail?.contentUrl ? (
                <img src={result.image?.thumbnail?.contentUrl} alt={result.name} loading="lazy" className=" rounded-lg mr-1 h-auto w-44"/>
              ) : (
                <></>
              )}
              <span >
                <a className="" href={result.url} rel="noreferrer" target="_self">
                  <p className="text-blue-700 text-lg">{result.name}</p>
                </a>
              </span>
            </div>
            <div className="">
              <div className="flex items-center text-gray-500 text-base">
                <p className={`text-lg font-medium pb-1 text-gray-700`}>{result.provider[0].name}</p>
                <span className="">&#183;</span>
                <p className={`text-base font-base ml-2 text-gray-500`}>{formatDate(result.datePublished.split("T")[0])}</p>
              </div>
            </div>
          </div>
          <div>
          <p className={`text-base mb-10 py-1 text-gray-600`}>{result.description}</p>
          </div>
          </div>

          </>
        );
      })}                    
                </div>
                }
            </div>
        </div>
      </div>
      <div className="bg-gray-50 w-full fixed bottom-0 z-20 px-4 mt-6 sm:mt-0 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <div className="grid py-4 grid-cols-5 items-center flex">
                <div className="flex justify-center text-sm items-center cursor-pointer hover:bg-gray-200 p-2 rounded">
                <XIcon onClick={open} className="w-5 text-blue-700"/>
                </div>
                <div onClick={showWeb} className="flex justify-center text-sm cursor-pointer hover:bg-gray-200 p-2 rounded">
                    <p>Web</p>
                </div>
                <div onClick={showImages} className="flex justify-center text-sm cursor-pointer hover:bg-gray-200 p-2 rounded">
                    <p>Imágenes</p>
                </div>
                <div onClick={showVideos} className="flex justify-center text-sm cursor-pointer hover:bg-gray-200 p-2 rounded">
                    <p>Videos</p>
                </div>
                <div onClick={showNews} className="flex justify-center text-sm cursor-pointer hover:bg-gray-200 p-2 rounded">
                    <p>Noticias</p>
                </div>
            </div>
          </div>
    </div>
    
  )}
</div>
)
}

export default Searchresults;