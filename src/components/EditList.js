import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditList = () => {
  const [title, setTitle] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const getListById = async () => {
    const response = await axios.get(`http://localhost:5000/list_artikel/${id}`);
    setTitle(response.data.response.title);
    setTanggal(response.data.response.tanggal);
    setImage(response.data.response.image);
    setContent(response.data.response.content);
  };

  useEffect(() => {
    getListById();
  }, [id]);

  const updateList = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/list_artikel/${id}`, {
        title,
        tanggal,
        image,
        content,
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="box">
          <h1
            style={{
              textAlign: 'center',
              fontSize: '30px',
              color: '#3273dc',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.17)',
            }}
          >
            Edit Data Form
          </h1>
          <form onSubmit={updateList}>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={title || ''}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Tanggal</label>
              <div className="control">
                <input
                  type="date"
                  className="input"
                  value={tanggal || ''}
                  onChange={(e) => setTanggal(e.target.value)}
                  placeholder="Tanggal"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Image</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Link Image..."
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={content || ''}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Sinopsis..."
                ></textarea>
              </div>
            </div>
            <div className="field">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditList;
