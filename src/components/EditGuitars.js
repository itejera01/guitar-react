import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const url = 'http://localhost/apiGuitarras/controllers/guitarraController.php';

const EditGuitars = () => {
    const[name, setName]= useState('');
    const[description, setDescription]= useState('');
    const[price, setPrice]= useState(0);
    const[stock, setStock]= useState(0);
    const {id} = useParams();
    const redirect = useNavigate();
    

    useEffect( () =>{
        const getGuitar = async() =>{
            const options = {headers: {'Content-Type': 'application/json'},params:{id:id} };
            const respuesta = await axios.get(url,options);
            setName(respuesta.data[0].nombre);
            setDescription(respuesta.data[0].descripcion);
            setPrice(respuesta.data[0].precio);
            setStock(respuesta.data[0].stock);
        }
        getGuitar();
    },[]);

    const update = async(e) =>{
        e.preventDefault();
        await axios.put(url,{id:id,name:name,description:description,price:price,stock:stock});
        redirect('/');
    }

  return (
    <div id="modalGuitars" className="fixed flex top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 justify-center items-center">
    <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
      <h2 className="text-lg font-bold mb-4" id="titulo-modal">Editar Guitarra</h2>
      <div className="input-group mb-4">
        <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-guitar"></i> Nombre</span>
        <input required type="text" id="nombre" name="nombre" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Nombre' value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-group mb-4">
        <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-file-pen"></i> Descripcion</span>
        <input required type="text" id="descripcion" name="descripcion" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Descripcion' value={description}
          onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="input-group mb-4">
        <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-dollar-sign"></i> Precio</span>
        <input required type="number" id="precio" name="precio" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Precio (U$D)' value={price}
          onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className="input-group mb-4">
        <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-boxes-stacked"></i> Stock</span>
        <input required type="number" id="stock" name="stock" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Stock' value={stock}
          onChange={(e) => setStock(e.target.value)} />
      </div>
      <div className="d-grid col-6 mx-auto">
        <button onClick={() => update()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <i className="fa-solid fa-floppy-disk"></i> Guardar
        </button>
        <button onclick={() => redirect('/')}type="button" id="btnCerrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          <i className="fa-solid fa-xmark"></i> Cerrar
        </button>
      </div>
    </div>
  </div>
  )
}

export default EditGuitars;
