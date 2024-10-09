import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAlert } from '../functions.js';
const ShowGuitars = () => {
  const url = "http://localhost/apiGuitarras";
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
    setGuitars(response.data);
  };


  return (
    <div className='App'>
      <header className="bg-gray-900 text-white p-4 flex justify-center">
        <h1 className="text-3xl font-bold">Guitarras</h1>
      </header>
      <div class="container flex space-between mx-auto items-center justify-center p-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn-crear">
          <i className="fa-solid fa-plus"></i> Añadir Guitarra
        </button>
      </div>
      <div className="container flex mx-auto p-4 justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Id</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody id="tabla-datos">
            {guitars.map( (guitar, id) => {
              <tr key={guitar.id}>
                <td className="px-4 py-2">{guitar.id}</td>
                <td className="px-4 py-2">{guitar.name}</td>
                <td className="px-4 py-2">{guitar.description}</td>
                <td className="px-4 py-2">${new Intl.NumberFormat('en-US').format(guitar.price)}</td>
                <td className="px-4 py-2">{guitar.stock}</td>
                <td className="px-4 py-2">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  &nbsp;
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>

    </div>

  );
}

export default ShowGuitars;