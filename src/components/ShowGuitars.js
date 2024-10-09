import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { createAlert } from '../functions.js';
const ShowGuitars = () => {
  const url = "http://localhost:8000/apiGuitarras";
  const [guitars, setGuitars] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('');
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
      <div className='container-fluid'>
        <div className='row'>
            <div className='col-4'>
              <div className='card m-3'>
                <div className='card-body'>
                  <button
                    type='button'
                    className='btn btn-primary m-3'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModalCenter'
                  >
                  <i className='fa-solid fa-guitar'></i> Añadir Guitarra
                  </button>
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className='modal fade'>
        
          
      </div>
    </div>
  );
}

export default ShowGuitars;