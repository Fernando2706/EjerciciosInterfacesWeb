import axios from 'axios';
import React , {FC, useState,useEffect} from 'react';
import './style.css';
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

const Body:FC<{text:string}>=({text})=>{

    text=text.replaceAll(" ","+");

    const[data,setData]=useState<data>();
    const[docs,setDocs]=useState<Libros[]>([])
    const[state,setState]=useState<string>("null");
    const[url,setUrl]=useState<string>("http://openlibrary.org/search.json?title="+text)
    const[maxIndex,setIndex]=useState<number>(16);
    const[minIndex,setMinIndex]= useState<number>(0);
    var responseDate:data;
    
    useEffect(()=>{
        axios.get(url).then((response)=>{
            if(response.data.numFound>100){
                if(response.data.start<response.data.numFound){
                    console.log(response.data.start,response.data.numFound);
                    
                }
            }
            update(response.data);
            
        })
    },[url]);
    
    const update=(data:data)=>{
        setData(data);
        setDocs([...docs,...data.docs])
        setState("done");
        if(data.start<data.num_found){
           if(data.start===0){
            setUrl(url+"&page=2");
           }else{
            var aux = url.split("&");
            var aux2 = aux[1].split("=");
            var page = parseInt(aux2[1]);
            page = page+1;
            setUrl(aux[0]+"&"+aux2[0]+"="+page);
            
           }

        }
        
    }

    const updateIndex=()=>{
        setIndex(maxIndex+16);
        setMinIndex(minIndex+16);
        
    }
    const updateIndexLess=()=>{
        setIndex(maxIndex-16);
        setMinIndex(minIndex-16);
    }
    
    console.log(data);
    return(
        <div className="container_search">
            {state!=="done"&&<div>Buscando...</div>}
            {state==="done"&&<div>Busqueda completada</div>}
            {data&&<div className="botones">
                    <div onClick={(e)=>updateIndexLess()} className="button">Prev ({minIndex})</div>
                    <div onClick={(e)=>updateIndex()} className="button">Next ({maxIndex})</div>
            </div>}
            <div >
            {data&&<div className="grind">
                {docs.map((element, index)=>{
                    
                if((index>=minIndex)&&(index<maxIndex)){
                    return (<div className="box">
                        {!element.cover_i&&"No cover..."}
                        {element.cover_i&&<div style={{backgroundImage:"url(http://covers.openlibrary.org/b/id/"+element.cover_i+"-M.jpg",height:"200px",width:"180px",justifySelf:"center", marginBottom:"5px"}}></div>}
                        <div className="texto_title">tile: {element.title}</div>
                        <div className="texto_title">author: {element.author_name}</div>
                        <div className="texto_title">date: {element.first_publish_year}</div>
                        {element.id_amazon&&<a className="texto_amz" href={"https://www.amazon.es/dp/"+element.id_amazon[0]}>Comprar</a>} 
                    </div>)
                }
                })}
                </div>}
                
            </div>
        </div>
    )
}

export default Body;