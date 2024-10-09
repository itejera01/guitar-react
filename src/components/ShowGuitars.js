import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAlert } from '../functions.js';
const ShowGuitars = () => {
  const url = 'http://localhost/apiGuitarras/guitarraController.php';
  const [guitars, setGuitars] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getGuitars();
  }, []);

  const getGuitars = async () => {
      const response = await axios.get(url);
      console.log(response.data);
      setGuitars(response.data);
  }; 
  const openModal = (op,id,name,description,price,stock) => {
    setId('');
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setOperation(op);
    if(op === 2){
      setId(id);
      setName(name);
      setDescription(description);
      setPrice(price);
      setStock(stock);
      setTitle("Editar guitarra");
    }else{
      setTitle("Ingresar guitarra");
    }
  }

  const validar = () =>{
    var parametros;
    var metodo;
    if (name.trim() == ''){
      createAlert('Debe ingresar el nombre de la guitarra','warning');
    }
    if (description.trim() == ''){
      createAlert('Debe enviar la descripción de la guitarra','warning');
    }
    if (price.trim() == ''){
      createAlert('Debe enviar el precio de la guitarra','warning');
    }
    if (stock.trim() == ''){
      createAlert('Debe enviar el stock de la guitarra','warning');
    }
    if (operation === 1){
      parametros = {name: name, description: description, price: price, stock: stock};
      metodo = 'POST';
    }else{
      parametros = {id: id, name: name, description: description, price: price, stock: stock};
      metodo = 'PUT';
    }
    enviarSoliciud(metodo,parametros);
  }
  const enviarSoliciud = async (metodo,parametros) => {
    await axios({
      method: metodo,
      url: url,
      data: parametros
    }).then(function(response){
      var tipo = response.data[0];
      var msj = response.data[1];
      createAlert(msj,tipo);
      if(tipo == 'success'){
        document.getElementById('btnCerrar').click();
        getGuitars();
      }
    }).catch(function(error){
      createAlert("Error en la solicitud",'error');
      console.log(error);  
    });
  }  


  return (
    <div className='App'>
      <header className="bg-gray-900 text-white p-4 flex justify-center">
        <h1 className="text-3xl font-bold">Guitarras</h1>
      </header>
      <div className="container flex space-between mx-auto items-center justify-center p-4">
        <button onClick={()=>openModal(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn-crear">
          <i className="fa-solid fa-plus"></i> Añadir Guitarra
        </button>
      </div>
      <div className="container flex mx-auto p-4 justify-center">
        <table className="table">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {guitars.map((guitar) => {
              <tr key={guitar.id}>
                <td className="px-4 py-2">{guitar.id}</td>
                <td className="px-4 py-2">{guitar.nombre}</td>
                <td className="px-4 py-2">{guitar.descripcion}</td>
                <td className="px-4 py-2">${new Intl.NumberFormat('en-US').format(guitar.precio)}</td>
                <td className="px-4 py-2">{guitar.stock}</td>
                <td className="px-4 py-2">
                  <button onclick={()=>openModal(2,guitar.id,guitar.nombre,guitar.descripcion,guitar.precio,guitar.stock)} 
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          data-bs-toggle="modal" data-bs-target="#modalGuitars">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  &nbsp;
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      <div id="modalGuitars" className="modal fade hidden">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" name="id" />
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="fa-solid fa-guitar"></i> Nombre</span>
                <input type="text" id="nombre" name="nombre" className="form-control" placeholder='nombre' value={name}
                onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="fa-solid fa-file-pen"></i> Descripcion</span>
                <input type="text" id="descripcion" name="descripcion" className="form-control" placeholder='descripcion' value={description}
                onChange={(e) => setDescription(e.target.value)}/>
              </div>  
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="fa-solid fa-dollar-sign"></i> Precio</span>
                <input type="number" id="precio" name="precio" className="form-control" placeholder='Precio (U$D)' value={price}
                onChange={(e) => setPrice(e.target.value)}/>
              </div>  
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="fa-solid fa-boxes-stacked"></i> Stock</span>
                <input type="number" id="stock" name="stock" className="form-control" placeholder='Stock' value={stock}
                onChange={(e) => setStock(e.target.value)}/>
              </div>  
              <div className="d-grid col-6 mx-auto">
                <button onClick={()=> validar()}className="btn btn-primary">
                  <i className="fa-solid fa-floppy-disk"></i>Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" id="btnCerrar"className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowGuitars;