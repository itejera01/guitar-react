import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAlert } from '../functions';
import { Link } from 'react-router-dom';
const url = 'http://localhost/apiGuitarras/controllers/guitarraController.php';

const ShowGuitars = () => {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    getGuitars();
  }, []);

  const getGuitars = async () => {
    const response = await axios.get(url);
    console.log(response.data);
    setGuitars(response.data);
  };

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
        const params = { headers: { 'Content-Type': 'application/json' }, data: { 'id': id } };
        axios.delete(url, params);
        getGuitars();
      } else {
        createAlert("La guitarra no fue eliminada", 'info');
      }
    })
  }

  return (
    <div className='App'>
      <header className="bg-gray-800 text-white py-4 px-6 shadow-md flex justify-center">
        <h1 className="text-3xl font-bold m-4">Guitarras</h1>
      </header>
      <div className="container flex space-between mx-auto items-center justify-center p-4">
        <Link to='/create'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" id="btn-crear" data-bs-toggle="modal" data-bs-target="#modalGuitars">
            <i className="fa-solid fa-plus"></i> Añadir Guitarra
          </button>
        </Link>
      </div>
      <div className="container flex mx-auto p-4 justify-center">
        {guitars.length === 0 && (
          <>
            <p>
              No hay guitarras.
            </p>
          </>
        )}
        <div className="grid grid-cols-4 gap-6 p-4">
          {guitars.map((guitar) => (
            <div className="bg-white rounded-lg shadow-md w-full p-4 m-4">
              <h3 className="text-lg font-bold mb-4">{guitar.nombre}</h3>
              <p className="text-gray-600">{guitar.descripcion}</p>
              <p className="text-gray-600">Precio: ${new Intl.NumberFormat('en-US').format(guitar.precio)}</p>
              <p className="text-gray-600">Stock: {guitar.stock}</p>
              <div className="flex justify-end">
                <Link to='edit/${guitar.id}'>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    data-bs-toggle="modal" data-bs-target="#modalGuitars">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </Link>
                &nbsp;
                <button onClick={() => deleteGuitar(guitar.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowGuitars;
