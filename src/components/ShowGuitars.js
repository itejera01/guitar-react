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

  const openModal = (op, id, name, description, price, stock) => {
    document.getElementById('modalGuitars').classList.remove('hidden');
    setId('');
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setOperation(op);
    if (op === 2) {
      setId(id);
      setName(name);
      setDescription(description);
      setPrice(price);
      setStock(stock);
      setTitle("Editar guitarra");
      console.log(id, name, description, price, stock);
    } else {
      setTitle("Ingresar guitarra");
    }
  }

  const validar = () => {
    var parametros;
    var metodo;
    if (name.trim() === '') {
      createAlert('Debe ingresar el nombre de la guitarra', 'warning');
      return;
    }
    if (description.trim() === '') {
      createAlert('Debe enviar la descripción de la guitarra', 'warning');
      return;
    }
    if (price.trim() === '') {
      createAlert('Debe enviar el precio de la guitarra', 'warning');
      return;
    }
    if (stock.trim() === '') {
      createAlert('Debe enviar el stock de la guitarra', 'warning');
      return;
    }
    if (operation === 1) {
      parametros = { nombre: name, descripcion: description, precio: price, stock: stock };
      metodo = 'POST';
    }else{
    if (operation === 2) {
      parametros = { id: id, nombre: name, descripcion: description, precio: price, stock: stock };
      metodo = 'PUT';
      console.log(metodo, parametros);
    }}
    enviarSoliciud(metodo, parametros);
  }
  const enviarSoliciud = async (metodo, parametros) => {
    await axios({
      method: metodo,
      url: url,
      data: parametros
    }).then(function (response) {
      console.log(response.data);
      var tipo = response.data[0];
      var msj = response.data[1];
      createAlert(msj, tipo);
      if (tipo === 'success') {
        document.getElementById('btnCerrar').click();
        getGuitars();
      }
    }).catch(function (error) {
      createAlert("Error en la solicitud", 'error');
      console.log(error);
    });
  }

  const deleteGuitar = async (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro que quieres eliminar esta guitarra?',
      icon: 'warning',
      text: "No podras revertir esta accion!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        setId(id);
        enviarSoliciud('DELETE', { id: id });
      } else {
        createAlert("La guitarra no fue eliminada", 'info');
      }
    })
  }

  return (
    <div className='App'>
      <header className="bg-gray-900 text-white p-4 flex justify-center">
        <h1 className="text-3xl font-bold">Guitarras</h1>
      </header>
      <div className="container flex space-between mx-auto items-center justify-center p-4">
        <button onClick={() => openModal(1)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn-crear" data-bs-toggle="modal" data-bs-target="#modalGuitars">
          <i className="fa-solid fa-plus"></i> Añadir Guitarra
        </button>
      </div>
      <div className="container flex mx-auto p-4 justify-center">
        <table className="table">
          <thead className="bg-gray-100 text-lg font-semibold text-gray-700 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guitars.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No hay guitarras.
                </td>
              </tr>
            )}
            {guitars.map((guitar) => (
            <tr key={guitar.id}>
              <td className="px-4 py-2">{guitar.id}</td>
              <td className="px-4 py-2">{guitar.nombre}</td>
              <td className="px-4 py-2">{guitar.descripcion}</td>
              <td className="px-4 py-2">${new Intl.NumberFormat('en-US').format(guitar.precio)}</td>
              <td className="px-4 py-2">{guitar.stock}</td>
              <td className="px-4 py-2">
                <button onClick={() => openModal(2, guitar.id, guitar.nombre, guitar.descripcion, guitar.precio, guitar.stock)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                  data-bs-toggle="modal" data-bs-target="#modalGuitars">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                &nbsp;
                <button onClick={() => deleteGuitar(guitar.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div id="modalGuitars" className="fixed flex top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 justify-center items-center hidden">
        <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
          <h2 className="text-lg font-bold mb-4" id="titulo-modal">{title}</h2>
          <div className="input-group mb-4">
            <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-guitar"></i> Nombre</span>
            <input type="text" id="nombre" name="nombre" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Nombre' value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="input-group mb-4">
            <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-file-pen"></i> Descripcion</span>
            <input type="text" id="descripcion" name="descripcion" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Descripcion' value={description}
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="input-group mb-4">
            <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-dollar-sign"></i> Precio</span>
            <input type="number" id="precio" name="precio" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Precio (U$D)' value={price}
              onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="input-group mb-4">
            <span className="block text-sm font-medium text-gray-700"><i className="fa-solid fa-boxes-stacked"></i> Stock</span>
            <input type="number" id="stock" name="stock" className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent" placeholder='Stock' value={stock}
              onChange={(e) => setStock(e.target.value)} />
          </div>
          <div className="d-grid col-6 mx-auto">
            <button onClick={() => validar()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <i className="fa-solid fa-floppy-disk"></i> Guardar
            </button>
            <button type="button" id="btnCerrar" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" data-bs-dismiss="modal" aria-label="Close" onClick={() => document.getElementById('modalGuitars').classList.add('hidden')}>
              <i className="fa-solid fa-xmark"></i> Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowGuitars;
