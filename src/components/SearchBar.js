import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import { debounce, DebounceSettings } from 'lodash'


import '../App.css';

const baseURL = "https://collectionapi.metmuseum.org/public/collection/v1";

export const SearchBar = ({ searchValue, setSearchValue, objectIDList, setObjectIDList, objects, setObjects }) => {

    const [input, setInput] = useState("");
    const [matchIDList, setMatchIDList] = useState([]);
    const [matches, setMatches] = useState([]);
    const [uniqueMatches, setUniqueMatches] = useState([]);
    const [noResults, setNoResults] = useState([]);
    const [searching, setSearching] = useState(false);

    const fetchMatches = useMemo( () =>
        debounce(async (value) => {

        console.log(value)
        // setUniqueMatches([])
        if(value!=''){
            setSearching(true)
            const response = await axios.get(`${baseURL}/search?hasImages=true&artistOrCulture=true&q=${value}`)
            let capValue = value.charAt(0).toUpperCase() + value.slice(1);
            const geoResponse = await axios.get(`${baseURL}/search?hasImages=true&geoLocation=${capValue}&q=${capValue}`)
            console.log(response)
            console.log(geoResponse)

            if (!response.data.objectIDs && !geoResponse.data.objectIDs) {
                setNoResults('No Results')
                setMatchIDList([])
                setSearching(false)

            }
            else if(!response.data.objectIDs && geoResponse.data.objectIDs) {
                setNoResults([])
                setMatchIDList(geoResponse.data.objectIDs)
            }
            else if(response.data.objectIDs && !geoResponse.data.objectIDs) {
                setNoResults([])
                setMatchIDList(response.data.objectIDs)
            }
            else {
                setNoResults([])
                setMatchIDList(matchIDList => [...response.data.objectIDs, ...geoResponse.data.objectIDs])
            }
            
            return await response.data.objectIDs
        }

        }, 1000)
    , [])

    function grabMatch(objectID) {
        return axios
            .get(`${baseURL}/objects/${objectID}`)
            .then(function(response) {  
                return {
                  success: true,
                  data: response.data
                };
            })
            .catch(function(error) {
                return { success: false };
            })
    }
    
    function getAllMatches(IDList) {
        return Promise.allSettled(IDList.map(grabMatch))
    }

    useEffect( () => {
        console.log(matchIDList)
        if(matchIDList && matchIDList.length){
            getAllMatches(matchIDList).then(resp=>{
            console.log(resp)
            let filterMatches = resp.filter((object) => 
            object.value.success 
            && object.value.data.primaryImageSmall.length > 0
            && object.value.data.artistDisplayName
            // && object.value.data.artistDisplayName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(input.toLowerCase())
            );
            console.log(filterMatches)
            setMatches(filterMatches) 
            if(filterMatches.length < 1) {
                setNoResults('No Results')
            }
            }).catch(e=>{console.log(e)})

        }
        
    }, [matchIDList])

    useEffect( () => {
        console.log(matches)
        let theMatches = [...new Set(matches.map(item => item.value.data.artistDisplayName))]
        setUniqueMatches(theMatches)
        setSearching(false)
    }, [matches])

    useEffect( () => {
        console.log(uniqueMatches)
    }, [uniqueMatches])



    async function handleChange (value) {
        setUniqueMatches([])
        setInput(value)
        fetchMatches(value) 
        if(value===''){
            setUniqueMatches([])
            setNoResults([])
            setSearching(false)
        }     
    }

    const handleClick = (value) => {
        // value = value.toLowerCase();
        setObjects(objects => []);

        // fetchData(value);
        value = value.replace(/[()]/g, '')

        setSearchValue(value);
        // console.log(objectIDList);

        setInput(input => []);
        setNoResults([])
        setUniqueMatches(uniqueMatches => [])
    }

    const handlerFunction = (e) => {
            handleClick(input)
        
    };




    return  (
        <div className="searchBar" 
        >
            <input placeholder="Search for an artist..." 
            id="searchInput"
            value={input}
            type="search"
            onChange={(e) => handleChange(e.target.value)}

            />
    
            <div className="resultBox">
                {uniqueMatches.map((match, id) => {
                    return (
                        <button key={id} onClick={(e) => handleClick(match)}>
                            {match}
                        </button>
                    )

                })}

               {noResults==="No Results"? 
                (<button>
                    {noResults}
                </button>)
                : null }

               {searching? (
                <button id="searching">
                    <div id="searchingContent">
                        Searching...
                    </div>
                </button>
               ) : null }

            </div>
            
        </div>
    );
       
};