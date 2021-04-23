import React, {FC,useState, useEffect}  from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'
import './Body.css'
import axios from 'axios'
import Filter from '../Filter/Filter'

interface bodyProps{
    type:boolean,
    filter:string,
}
interface data{
    numfound:number,
    start:number,
    docs:Libros[],
    num_found:number
}

interface Libros {
    key:                     string;
    type:                    string;
    title:                   string;
    title_suggest:           string;
    has_fulltext:            boolean;
    edition_count:           number;
    first_publish_year:      number;
    last_modified_i:         number;
    ebook_count_i:           number;
    cover_edition_key:       string;
    cover_i:                 number;
    publish_year:            number[];
    author_name:             string[];
    author_key:              string[];
    id_amazon:               string[];
    seed:                    string[];
    author_alternative_name: string[];
    subject:                 string[];
    isbn:                    string[];
    edition_key:             string[];
    language:                string[];
    id_librarything:         string[];
    id_goodreads:            string[];
    publish_place:           string[];
    oclc:                    string[];
    publisher:               string[];
    text:                    string[];
    publish_date:            string[];
}


const Body:FC<bodyProps> =(props)=>{

    const [finish, setFinish]=useState<boolean>(false)
    const[data,setData]=useState<data>();
    const[docs,setDocs]=useState<Libros[]>([])
    const[sortYear,setSort1]=useState<Libros[]>([])
    const[sortAlpha,setSort2]=useState<Libros[]>([])
    const[url,setUrl]=useState<string>(props.type ? "http://openlibrary.org/search.json?title="+props.filter : "http://openlibrary.org/search.json?author="+props.filter )
    const[maxIndex,setIndex]=useState<number>(20);
    const[minIndex,setMinIndex]= useState<number>(0);


    useEffect(()=>{
        axios.get(url).then((response)=>{
            if(response.status===500){
                alert("El servidor no responde...")
            }
            update(response.data);
            
        })
    },[url]);

    const updateIndex=()=>{
        setIndex(maxIndex+20);
        setMinIndex(minIndex+20);
    }
    const updateIndexLess=()=>{
            setIndex(maxIndex-20);
            setMinIndex(minIndex-20);
    }

    const update=(data:data)=>{
        setData(data);
        setDocs([...docs,...data.docs])

        if(data.num_found>100){
            if((data.num_found-data.start)>100){
                if(data.start===0){
                    setUrl(url+"&page=2");
                }else{
                    var aux = url.split("&");
                    var aux2 = aux[1].split("=");
                    var page = parseInt(aux2[1]);
                    page = page+1;
                    setUrl(aux[0]+"&"+aux2[0]+"="+page);
                }  
            }else{
                if(data.start<data.num_found){
                    var aux = url.split("&");
                    var aux2 = aux[1].split("=");
                    var page = parseInt(aux2[1]);
                    page = page+1;
                    setUrl(aux[0]+"&"+aux2[0]+"="+page);
                }else{
                    setFinish(true)
                    var aux1:Libros[] =docs.sort((a, b)=>{
                        if(a.title.charAt(0).toLocaleLowerCase > b.title.charAt(0).toLocaleLowerCase) { return -1; }
                        if(a.title.charAt(0).toLocaleLowerCase < b.title.charAt(0).toLocaleLowerCase) { return 1; }
                        return 0;
                    })

                    setSort2(aux1.slice())
                    var aux3:Libros[] =docs.sort((a, b)=>{
                        if(a.first_publish_year > b.first_publish_year) { return -1; }
                        if(a.first_publish_year < b.first_publish_year) { return 1; }
                        if(!a.first_publish_year) {return 1}   
                        if(!b.first_publish_year) {return -1}
                        return 0;
                    })
                    setSort1(aux3.slice())                    
                }
            }
        }
    }
    
    const[typeShow, setType]=useState<string>("")
    const[sortBy, setSortBy]=useState<string>("alpha")

    return(
        <div className="bodyContainer">
            {!finish&&<div className="loader">
                <PacmanLoader color="#ffffff"></PacmanLoader>
                <div className="boxInfo">Cargando... {data?.start} {data?.num_found}</div>
            </div>}
            {finish&&<div>
                <div className="typeShow">
                    <div className="btn-grad" onClick={(e)=>{
                        setType("list")
                    }}>Lista</div>
                    <div className="btn-grad" onClick={(e)=>{
                        setType("grid")
                    }}>Cuadricula</div>
                </div>
                <div>
                    {typeShow==="list"&&
                        <div>
                            <div className="sortOption">
                            {sortBy==="alpha"&&"✓"}
                            <div className="sort" onClick={(e)=>setSortBy("alpha")}>Ordenar Alfabeticamente</div>
                            {sortBy==="year"&&"✓"}
                            <div className="sort" onClick={(e)=>setSortBy("year")}>Ordenar por año</div>
                        </div>
                        <div className="botones">
                                <div onClick={(e)=>updateIndexLess()} className="btn-grad2">Prev Page</div>
                                <div onClick={(e)=>updateIndex()} className="btn-grad2">Next Page</div>
                        </div>
                        <div>
                        {sortBy==="alpha"&&sortAlpha.map((book,index)=>{
                            if((index>=minIndex)&&(index<maxIndex)){
                            return(
                                <div className="List">
                                    <div className="texto_title">Title: {book.title}</div>
                                    <div className="texto_title">Author: {book.author_name}</div>
                                    <div className="texto_title">Date: {book.first_publish_year}</div>
                                    {book.id_amazon&&<a className="texto_amz" href={"https://www.amazon.es/dp/"+book.id_amazon[0]}>Comprar</a>} 
                                </div>
                            )
                            }
                        })}
                        {sortBy==="year"&&sortYear.map((book,index)=>{
                            if((index>=minIndex)&&(index<maxIndex)){
                            return(
                                <div className="List">
                                    <div className="texto_title">Title: {book.title}</div>
                                    <div className="texto_title">Author: {book.author_name}</div>
                                    <div className="texto_title">Date: {book.first_publish_year}</div>
                                    {book.id_amazon&&<a className="texto_amz" href={"https://www.amazon.es/dp/"+book.id_amazon[0]}>Comprar</a>} 
                                </div>
                            )
                            }
                        })}
                        </div>
                        </div>                        
                    }
                    {typeShow==="grid"&&
                        <div className="container">
                            <div className="botones">
                                <div onClick={(e)=>updateIndexLess()} className="btn-grad2">Prev Page</div>
                                <div onClick={(e)=>updateIndex()} className="btn-grad2">Next Page</div>
                            </div>
                            <div className="grid">
                                {docs.map((book, index)=>{
                                   if((index>=minIndex)&&(index<maxIndex)){
                                    return (<div className="box">
                                        {!book.cover_i&&"No cover..."}
                                        {book.cover_i&&<div style={{backgroundImage:"url(http://covers.openlibrary.org/b/id/"+book.cover_i+"-M.jpg",height:"200px",width:"180px",justifySelf:"center", marginBottom:"5px"}}></div>}
                                        <div className="texto_title">Title: {book.title}</div>
                                        <div className="texto_title">Author: {book.author_name}</div>
                                        <div className="texto_title">Date: {book.first_publish_year}</div>
                                        {book.id_amazon&&<a className="texto_amz" href={"https://www.amazon.es/dp/"+book.id_amazon[0]}>Comprar</a>} 
                                    </div>)
                                } 
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>}
        </div>
    )
}


export default Body;