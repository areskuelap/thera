import React, {useState, useEffect} from 'react';
import { SearchIcon } from '@heroicons/react/solid';
import Searchresults from "./searchresults";
import axios from "axios";

function LoadingIcon() {
    return (
<div className="flex items-center justify-center space-x-2 animate-pulse">
    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-400 rounded-full"></div>
    <div className="w-3 h-3 sm:w-4 sm:h-4  bg-blue-400 rounded-full"></div>
    <div className="w-3 h-3 sm:w-4 sm:h-4  bg-blue-400 rounded-full"></div>
</div>
    );
  }


const Home = () => {

    const [loading, setLoading] = useState(false);
    let [obj, setObj] = useState({ choices: [] });

    const getRes = () => {
        setLoading(true);
        axios({
          method: "POST",
          url: "https://api.openai.com/v1/completions",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_KEY}`
          }
        })
          .then((res) => {
            console.log(res);
            responseHandler(res);
          })
          .catch((e) => {
            setLoading(false);
            console.log(e.message, e);
          });
      };
    
      const responseHandler = (res) => {
        if (res.status === 200) {
          setObj(res.data);
          setLoading(false);
          setVTextVisible(true);
        }
      };

    const [openMenu, setOpenMenu] = useState(false);

    const open = () => {
        setOpenMenu(!openMenu)
      }

      const [searchText, setSearchText] = useState("");

      const keyApi = `${process.env.AZURE_KEY}`;
      const [dataText, setDataText] = useState([]);
      const [dataImages, setDataImages] = useState([]);
      const [dataVideos, setDataVideos] = useState([]);
      const [dataNews, setDataNews] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
  
      const options = {
          method: 'GET',
          headers: {
              'Ocp-Apim-Subscription-Key': keyApi,
          }
      };
  
      const getData2 = () => {
        var urlVideos = `https://api.bing.microsoft.com/v7.0/videos/search?q=${searchText}&safeSearch=strict&count=20&offset=20`;
        var urlNews = `https://api.bing.microsoft.com/v7.0/news/search?q=${searchText}&safeSearch=strict&count=20&offset=20`;
        fetch(encodeURI(urlVideos), options)
        .then(response => response.json())
        .then(values => {
            setDataVideos(values);
            console.log("Videos recibidos");
            console.log(dataVideos)
        });
        fetch(encodeURI(urlNews), options)
            .then(response => response.json())
            .then(values => {
                setDataNews(values);
            });
  
      }
  

      const getData = () => {
        getRes();
          setIsLoading(true);
          var url = `https://api.bing.microsoft.com/v7.0/search?q=${searchText}&offset=20`;
          var urlImages = `https://api.bing.microsoft.com/v7.0/images/search?q=${searchText}&offset=20`;
  
              fetch(encodeURI(url), options)
                  .then(response => response.json())
                  .then(values => {
                      setDataText(values.webPages);
                      setIsLoading(false);
                      console.log(dataText)
                      console.log(dataImages)
                  });
  
              fetch(encodeURI(urlImages), options)
                  .then(response => response.json())
                  .then(values => {
                      setDataImages(values);
                  });
        }

          useEffect(() => {
      setPayLoad((prevPayload) => ({
        ...prevPayload,
        prompt: searchText,
      }));
    }, [searchText]);

    const [payload, setPayLoad] = useState({
      prompt: searchText,
      temperature: 0.4,
      n: 1,
      max_tokens: 800,
      model: "text-davinci-003"
    });


      const [vTextVisible, setVTextVisible] = useState(false);


      return (
        <div className="">
            <div className="mt-12 ml-5 mr-20">
                <p id="first-message" className="font-semibold text-gray-600">Bienvenido a <a className="text-blue-700 font-bold">Konlap chat</a>. Te ayudamos a buscar 😀</p>
            </div>
                <div>
                    {loading ? (
                        <div className="flex justify-center mt-5 pb-8"><LoadingIcon className=" w-6 pb-8" /></div>
                    ) : (
                        vTextVisible && obj?.choices?.map((v, i) => (
                            <div className="pb-20" key={i}>
                                <p className="font-medium text-justify my-5 ml-5 mr-16 text-gray-600">{v.text}</p>
                                <button onClick={open} className="bg-blue-700 mx-5 flex justify-evenly text-white rounded-xl font-semibold items-center px-4 py-1">Ver resultados <SearchIcon className="w-5 h-5 text-white" /> </button>
                            </div>
                        ))
                    )}
                </div>
                <Searchresults dataText={dataText} getData2={getData2} dataImages={dataImages} dataVideos={dataVideos} dataNews={dataNews} open={open} openMenu={openMenu} />
            <div className="flex bg-white w-full justify-center">
            <div className="py-5 bg-white fixed w-11/12 bottom-0 ">
                <div className="flex items-center bg-white shadow-lg border border-gray-200 rounded-xl">
                    <input value={searchText} onChange={(e) => setSearchText(e.target.value)} className="flex-grow outline-none font-semibold p-2" placeholder="Search..." />
                    <div className="p-2">
                        <SearchIcon onClick={getData} className="w-6 h-6 text-blue-700" />
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Home;
