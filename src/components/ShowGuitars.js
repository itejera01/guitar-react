import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAlert } from '../functions';
import { Link } from 'react-router-dom';
const urlApi = 'http://localhost/apiGuitarras/controllers/guitarraController.php';

const ShowGuitars = () => {
  const [guitars, setGuitars] = useState([]);

  useEffect(() => {
    getGuitars();
  }, [guitars]);

  const getGuitars = async () => {
    const response = await axios.get(urlApi);;
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
        axios.delete(urlApi, params);
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
            <i className="fa-solid fa-plus mr-3"></i> Añadir Guitarra
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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {guitars.map((guitar) => (
            <div key={guitar.id} className="bg-white rounded-lg shadow-md p-4 m-4">
              <img className="w-full mb-4" src={`logo192.png`} alt={guitar.nombre} />
              <h1 className="text-xl font-bold my-2">{guitar.nombre}</h1>
              <h2 className="text-green-600 font-bold">${new Intl.NumberFormat('en-US').format(guitar.precio)}</h2>
              <div className="flex space-x-4">
                <p className="text-gray-500 pt-4">{guitar.descripcion}</p>
                <p className="text-blue-400 pt-4 text-xl font-bold">{guitar.stock === 0 ? 'No Hay Stock' : guitar.stock}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link to={`/edit/${guitar.id}`}>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-auto">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </Link>
                <button
                  onClick={() => deleteGuitar(guitar.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-auto">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 px-6 flex justify-center">
        <p>
          Copyright &copy; {new Date().getFullYear()} Ignacio Tejera. Todos los derechos reservados.
        </p>
      </footer>
    </div >
  );
}

export default ShowGuitars;
