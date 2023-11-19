import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FilmList = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const deleteList = async (id) => {
    const confirmDelete = window.confirm('Apakah anda ingin menghapus data ini??');
    if(confirmDelete){
      try {
        await axios.delete(`http://localhost:5000/list_artikel/${id}`);
        getList();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getList = async () => {
    const response = await axios.get("http://localhost:5000/list_artikel");
    setLists(response.data);
  };

  return (
    <div style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/620/851/original/blue-wave-abstract-background-web-background-blue-texture-banner-design-creative-cover-design-backdrop-minimal-background-illustration-vector.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-quarters">
            <p style={{
              textAlign: 'center',
              fontSize: '50px',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'sans-serif'
            }}>CRUD Artikel</p>
            <Link to={'add'} className='button is-success mt-5 mb-4' style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'}}>Tambah data</Link>
            <table className='table is-fullwidth is-hoverable' style={{ 
              boxShadow: '0px 4px 8px rgba(0,0,0,0.1)', 
              borderCollapse: 'collapse',
              border: '1px',
              }}>
              <thead style={{ borderBottom: '2px solid #ddd', background: '#d4ebf7'}}>
                <tr>
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
                    <tr key={item.id} style={{ background : index % 2 === 0 ? '#e6f7ff' : '#d4ebf7', transition : 'background 0.3s'}} className="table-row-hover">
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.date}</td>
                      <td>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt="Pictures"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        ) : (
                          "Tidak ada gambar"
                        )}
                      </td>
                      <td>
                        <span style={{
                          display: 'block',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          maxWidth: '200px',
                        }}>{item.content}</span>
                        </td>
                      <td>
                        <Link to={`edit/${item.id}`} className='button is-small is-warning mr-2 mb-2' style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'}}>Edit</Link>
                        <Link onClick={() => deleteList(item.id)} className='button is-small is-danger' style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.25)'}}>Delete</Link>
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
      </div>
    </div>
  );
};

export default FilmList;

