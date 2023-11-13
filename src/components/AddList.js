import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddList = () => {
const [id, setId] = useState("");
const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [image, setImage] = useState("");
const [content, setContent] = useState("");

const navigate = useNavigate();

const saveList = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/list_artikel',{
            id,
            title,
            date,
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
            <form onSubmit={saveList}>
                <div className="field">
                    <label className="label">Id</label>
                    <div className="control">
                        <input type="text" className="input" value={id} onChange={(e) => setId(e.target.value)} placeholder='Id'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tanggal</label>
                    <div className="control">
                        <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} placeholder='Tanggal'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input type="text" className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder='Link Image...'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <input type="text" className="input" value={content} onChange={(e) => setContent(e.target.value)} placeholder='Sinopsis...'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddList;