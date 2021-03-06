import React, {useState, useEffect} from "react"
import {Table, Container,Button, ToggleButton} from "react-bootstrap"

import ModalDelete from "../Modals/ModalDelete"
import ModalDetails from "../Modals/ModalDetails"
import ModalEdit from "../Modals/ModalEdit"

import "./Styles/Lista.css"


export default function CatalogoLista(props){

    const{searchOnCatalog, filterCategory, dateMax, dateMin, filterGender, dataMovies, setDataMovies} = props;

    const [showDelete, setShowDelete] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    
    const [toggleOrderName, setToggleOrderName] = useState(0)
    const [toggleOrderNota, setToggleOrderNota] = useState(0)

    const [toggleCheckItem, setToggleCheckItem] = useState(true)
    
    function searchMovieOnList(movieOnList) {
        const [movieFilter] = dataMovies.filter((d) => (d.id === movieOnList))
            if (movieFilter) {
                setShowDelete({
                    id: movieFilter.id,
                    name: movieFilter.name,
                    show: true,
                });
            } else {
                alert("nada aqui")
            }
    }
    function searchMovieOnListToDetails(movieOnListDetails) {
        const [movieFilterDetails] = dataMovies.filter((d) => (d.id === movieOnListDetails))
        if (movieFilterDetails) {
            setShowDetails({
                id: movieFilterDetails.id,
                banner: movieFilterDetails.banner,
                name: movieFilterDetails.name,
                sinopse: movieFilterDetails.sinopse,
                categoria: movieFilterDetails.categoria,
                genero: movieFilterDetails.genero,
                show: true,
            });
        } else {
            alert("nada aqui")
        }
    }
    function searchMovieOnListToEdit(movieOnListEditId) {
        const [movieFilterEdit] = dataMovies.filter((d) => (d.id === movieOnListEditId))
        if (movieFilterEdit) {
            setShowEdit({
                id: movieFilterEdit.id,
                banner: movieFilterEdit.banner,
                name: movieFilterEdit.name,
                sinopse: movieFilterEdit.sinopse,
                categoria: movieFilterEdit.categoria,
                genero: movieFilterEdit.genero,
                show: true,
            });
            
        } else {
            alert("nada aqui")
        }
    }
    function editData(id, banner, name, sinopse, categoria ,genero){
            setDataMovies(dataMovies.map((movie)=>{
                if(movie.id === id){
                    return{
                        id: movie.id,
                        bannerTop: movie.bannerTop,
                        banner: banner,
                        name: name,
                        genero: genero,
                        notaImdb: movie.notaImdb,
                        sinopse: sinopse,
                        dataLancamento: movie.dataLancamento,
                        categoria: categoria,
                    }
                }else{
                    return {...movie}
                }
            }))
        }
        function checkItem(id){
            setDataMovies(dataMovies.map((movie)=>{
                if(movie.id === id){  
                    return {...movie, active: !movie.active}
                }else{
                    return movie
                }
            }))
        }
        function checkItemAll(){
            setToggleCheckItem(!toggleCheckItem)
            setDataMovies(dataMovies.map((movie)=>{
                return {...movie, active: toggleCheckItem}
            }))
        }
    return(
        <Container className="w-80">
            <ModalDelete
                showDelete={showDelete}
                setShowDelete={setShowDelete}
                dataMovies = {dataMovies}
                setDataMovies = {setDataMovies}
            />
            <ModalDetails
                showDetails={showDetails}
                setShowDetails={setShowDetails}
                dataMovies = {dataMovies}
                setDataMovies = {setDataMovies}
            />
            <ModalEdit
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                editData={editData}
                dataMovies={dataMovies}
                setDataMovies={setDataMovies}
            />
            <Table striped bordered hover variant="dark" style={{marginTop: "15px"}}>
                <thead>
                    <tr>
                        <th>
                            {
                                toggleCheckItem?
                                <i className="checkIcon material-icons text-center" onClick={()=>checkItemAll()}>
                                    radio_button_unchecked
                                </i>
                                :
                                <i className="checkIcon material-icons text-center" onClick={()=>checkItemAll()}>
                                    radio_button_checked
                                </i>
                            }
                        </th>
                        <th>#</th>
                        <th>Banner</th>
                        <th>Name 
                                {
                                    toggleOrderName === 1?
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderName(2)}>
                                        keyboard_arrow_down
                                    </i>  
                                    :toggleOrderName === 2?
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderName(0)}>
                                        keyboard_arrow_up
                                    </i>
                                    :toggleOrderName === 0&&
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderName(1)}>
                                        remove
                                    </i>       
                                }
                        </th>
                        <th>Genero</th>
                        <th>Categoria</th>
                        <th style={{width: "130px"}}>Nota IMDB 
                                {
                                    toggleOrderNota === 1?
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderNota(2)}>
                                        keyboard_arrow_down
                                    </i>  
                                    :toggleOrderNota === 2?
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderNota(0)}>
                                        keyboard_arrow_up
                                    </i>  
                                    :toggleOrderNota === 0&&
                                    <i className="orderIcon material-icons" onClick={()=>setToggleOrderNota(1)}>
                                        remove
                                    </i>   
                                }
                        </th>
                        <th>Data de Lancamento</th>
                        <th className="text-center"style={{width: "200px"}}> Acoes </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataMovies
                        .sort((Movie1,Movie2)=>{
                            if(toggleOrderName === 1){
                                if(Movie1.name > Movie2.name){
                                    return -1
                                }
                                if(Movie1.name < Movie2.name){
                                    return 1
                                }
                                return 0
                            }if(toggleOrderName === 2){
                                if(Movie1.name > Movie2.name){
                                    return 1
                                }
                                if(Movie1.name < Movie2.name){
                                    return -1
                                }
                                return 0
                            }  
                        })
                        .sort((Movie1,Movie2)=>{
                            if(toggleOrderNota === 1){
                                return Movie1.notaImdb - Movie2.notaImdb
                            }if(toggleOrderNota === 2){
                                return Movie2.notaImdb - Movie1.notaImdb
                            }
                            return 0 
                        })
                        .filter((a)=>(
                            a.name.toUpperCase().indexOf(searchOnCatalog.toUpperCase()) !== -1 ||
                            a.categoria.toUpperCase().indexOf(searchOnCatalog.toUpperCase()) !== -1 ||
                            a.genero.toUpperCase().indexOf(searchOnCatalog.toUpperCase()) !== -1
                        ))
                        .filter((b)=>(
                            b.genero.toUpperCase().indexOf(filterGender.toUpperCase()) !== -1
                        ))
                        .filter((elementCateg)=>(
                            elementCateg.categoria.toUpperCase().indexOf(filterCategory.toUpperCase()) !== -1
                        ))
                        .map((e,index)=>(
                            <tr>
                                <td>
                                    {
                                        e.active?
                                        <i className="checkIcon material-icons text-center" onClick={()=>checkItem(e.id)}>
                                            radio_button_checked
                                        </i>
                                        :
                                        <i className="checkIcon material-icons text-center" onClick={()=>checkItem(e.id)}>
                                            radio_button_unchecked
                                        </i>
                                    }
                                    
                                </td>
                                <td>{index+1}</td>
                                <td>
                                    <img 
                                        src={e.banner} 
                                        style={{maxWidth: "30px", maxHeight:"50px"}}
                                    />
                                </td>
                                <td>{e.name}</td>
                                <td>{e.genero}</td>
                                <td>{e.categoria}</td>
                                <td>{e.notaImdb}</td>
                                <td>{e.dataLancamento}</td>
                                <td>
                                    <Button  onClick={()=>setShowEdit(!showEdit), ()=>searchMovieOnListToEdit(e.id)}className="mx-1" variant="warning"><i className="material-icons">mode_edit</i></Button>
                                    <Button onClick={()=>setShowDelete(!showDelete), ()=>searchMovieOnList(e.id)} className="mx-1" variant="danger"><i className="material-icons">delete</i></Button>
                                    <Button onClick={()=>setShowDetails(!showDetails), ()=>searchMovieOnListToDetails(e.id)} className="mx-1" variant="info"><i className="material-icons">preview</i></Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>       
    )
}