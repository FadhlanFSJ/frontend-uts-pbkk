import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FilmList = () => {
  const [lists, setLists] = useState([]);

  useEffect(()=>{
    getList();
  },[]);

  const deleteList = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/list_artikel/${id}`)
        getList();
    } catch (error) {
        console.error(error)
    }
  }

  const getList = async () => {
    const response = await axios.get("http://localhost:5000/list_artikel");
    // console.log(response.data);
    setLists(response.data);
  }
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <Link to={'add'} className='button is-success'>Tambah data</Link>
        <table className='table is-striped is-fullwidth'>
          <thead>
            <tr className='has-text-centered'>
              <th>ID</th>
              <th>Title</th>
              <th>Tanggal</th>
              <th>Image</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {lists.response ? (
            lists.response.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.date}</td>
                <td>
                {item.image ? (
                  <img src={item.image}
                  alt="Pictures"
                  />
                ) : (
                  "Tidak ada gambar"
                )}
                </td>
                <td>{item.content}</td>
                <td>
                  <Link to={`edit/${item.id}`} className='button is-small is-info'>Edit</Link>
                  <Link onClick={() => deleteList(item.id)} className='button is-small is-danger'>Delete</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilmList;