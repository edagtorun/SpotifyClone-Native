import axios from "axios";
import { createContext, useEffect , useState} from "react";

const AlbumsContext = createContext();


const AlbumsProvider = ({children}) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading]= useState(true);
    const [error, setError] = useState(null);
    
    const getData = async() => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
              q: 'Türkiye\'de popüler olanlar',
              type: 'albums',
              offset: '0',
              limit: '10',
              numberOfTopResults: '5'
            },
            headers: {
              'x-rapidapi-key': '3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6',
              'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
          };
    
          try {
           const response = await axios.request(options)
           const albumsItems = response.data?.albums?.items?.map(item => ({
            uri:item.data.uri,
            name:item.data.name,
            artist:item.data.artists.items[0].profile.name,
            coverArt:item.data.coverArt.sources[0].url,
            year: item.data.date.year,
           }));
           setAlbums(albumsItems);
           setLoading(false)

          } catch (error) {
            setError(error);
            setLoading(false);
          }
    };

useEffect(()=> {
    getData();
},[]);

    return <AlbumsContext.Provider value={{albums, loading, error}}>{children}</AlbumsContext.Provider>
};

export {AlbumsContext, AlbumsProvider};