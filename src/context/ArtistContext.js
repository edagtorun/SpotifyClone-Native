import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ArtistsContext = createContext()

const ArtistsProvider = ({children}) =>{
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getArtists = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/search/',
            params: {
              q: 'Turkiye de popüler ',
              type: 'artists',
              offset: '0',
              limit: '10',
              numberOfTopResults: '5'
            },
            headers: {
              'x-rapidapi-key': '3a018899a3msh42c01566c4542b3p13caa0jsnbc374e087ca6',
              'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            },
        };
      
     try {
        const response =  await axios.request(options);
        const data = response.data.artists.items;
        setArtists(data);
        setLoading(false)
     } catch (error) {
        setError(error)
        setLoading(false)
     }

    };
    useEffect(() => {
        getArtists()
    }, [])
    return <ArtistsContext.Provider value={{artists, loading, error}}>{children}</ArtistsContext.Provider>
}

export {ArtistsContext, ArtistsProvider}