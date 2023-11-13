import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditList = () => {
    const [title, setTitle] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const getListById = async () => {
        const response = await axios.get(`http://localhost:5000/list_artikel/${id}`)
        // console.log("Respon : " ,response)
        setTitle(response.data.response.title)
        setTanggal(response.data.response.tanggal)
        setImage(response.data.response.image)
        setContent(response.data.response.content)
        // console.log("Title : ", title);
        // console.log("Tanggal : ", tanggal);
        // console.log("Content : ", content);
    }

    useEffect(() => {
        getListById();
    },[]);

    const updateList = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/list_artikel/${id}`,{
                title,
                tanggal,
                image,
                content
            });
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateList}>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input type="text" className="input" value={title || ''} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tanggal</label>
                    <div className="control">
                        <input type="date" className="input" value={tanggal || ''} onChange={(e) => setTanggal(e.target.value)} placeholder='Tanggal'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input type="file" className="input" onChange={(e) => setImage(e.target.files[0])} accept='image/*'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <input type="text" className="input" value={content || ''} onChange={(e) => setContent(e.target.value)} placeholder='Sinopsis...'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditList;