import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonaForCurrentUser, deletePersonaForCurrentUser } from "../../Slicer/authSlice";
import "./personaDetails.css"
import sampleImage from '../../Images/login_background.png'
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css"
import exclamation from './../../Images/Delete_Persona.png';

const PersonaDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth.currentUser)

    const existingPersona = currentUser.personas.find(p => p.id === parseInt(id))

    const [personaData, setPersonaData] = useState(
        existingPersona || {
            id: parseInt(id),
            title: "",
            quote: "",
            description: "",
            motivations: "",
            painPoints: "",
            jobsNeeds: "",
            activities: "",
            image: sampleImage,
            lastUpdated: "",
        }
    )

    const [showImageModal, setImageModal] = useState(false)
    const [modalImage, setModalImage] = useState(personaData.image)
    const [showDeleteModal, setDeleteModal] = useState(false)

    const handleChange = (e) => {
        setPersonaData({ ...personaData, [e.target.name]: e.target.value })
    }

    const handlepain = (value) => {
        setPersonaData({ ...personaData, painPoints: value })
    }

    const handleJobs = (value) => {
        setPersonaData({ ...personaData, jobsNeeds: value })
    }

    const handleActivities = (value) => {
        setPersonaData({ ...personaData, activities: value })
    }

    const handleUpdate = () => {
        const updatedPersona = {
            ...personaData,
            // lastUpdated: new Date().toLocaleString(),
        }

        dispatch(updatePersonaForCurrentUser(updatedPersona))
        alert("Persona updated successfully!")
        navigate("/landingPage")
    };

    const handleDelete = () => {
        dispatch(deletePersonaForCurrentUser(personaData.id))
        navigate("/landingPage")
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB")
                return;
            }
            setModalImage(URL.createObjectURL(file))
            // const reader = new FileReader()
            // reader.readAsDataURL(file)
            // reader.onload = function() {
            //     setModalImage(reader.result)
            // }
            // reader.onerror = function() {
            //     setImageModal(false)
            // }
            // reader.readAsDataURL(file); 
        }
    }

    const ImageSubmit = () => {
        setPersonaData({ ...personaData, image: modalImage })
    }

    return (
        <div className="persona-details">
            <div className="persona-banner" style={{ backgroundImage: `url(${personaData.image})` }}>
                <div className="overlay">
                    <div className="persona-header">
                        <div className="persona_title">
                            <label className="persona-name-label">Persona Name <label style={{ color: "red" }}>*</label></label>
                            <input
                                type="text"
                                name="title"
                                value={personaData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <label className="edit-image-btn">
                            {/* <button onClick={() => setImageModal(true)} />✏️ Edit Image<button /> */}
                            <button onClick={() => setImageModal(true)}></button>✏️ Edit Image
                        </label>
                    </div>
                </div>
            </div>
            {showImageModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h4>Update Image</h4>
                            <button onClick={() => { setImageModal(false); setModalImage(personaData.image) }} className="close-button">✖</button>
                        </div>

                        <div className="image-preview-container">
                            <div className="image-wrapper">
                                {personaData.image ? (
                                    <img src={modalImage} alt="Preview" className="preview-image" />
                                ) : (
                                    <span className="no-image-text">No Image Selected</span>
                                )}
                                <label className="change-image-btn">
                                    <input type="file" className="hidden-file-input" onChange={handleImageChange} accept="image/*" />
                                    Change Image
                                </label>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <div></div>
                            <div>
                                <button onClick={() => { setImageModal(false); setModalImage(personaData.image) }} className="cancel-button">CANCEL</button>
                                <button className="save-button" onClick={() => { ImageSubmit(); setImageModal(false); }}>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            <div className="persona-content">
                <div className="persona-grid">
                    <div className="persona-field">
                        <label>Notable Quote</label>
                        <input
                            type="text"
                            name="quote"
                            placeholder="Enter a quote that identifies the persona"
                            value={personaData.quote}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="persona-field">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Enter a general description/bio about the persona"
                            value={personaData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="persona-field">
                        <label>Attitudes / Motivations</label>
                        <input
                            type="text"
                            name="motivations"
                            placeholder="What drives the persona?"
                            value={personaData.motivations}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="persona-field">
                        <label>Pain Points</label>
                        <Quill
                            theme="snow"
                            style={{ height: "85px" }}
                            onChange={handlepain}
                            value={personaData.painPoints}
                            name="painPoints"
                        />
                    </div>
                    <div className="persona-field">
                        <label>Jobs / Needs</label>
                        <Quill
                            theme="snow"
                            style={{ height: "85px" }}
                            onChange={handleJobs}
                            name="jobsNeeds"
                            value={personaData.jobsNeeds}
                        />
                    </div>
                    <div className="persona-field">
                        <label>Activities</label>
                        <Quill
                            theme="snow"
                            style={{ height: "85px" }}
                            onChange={handleActivities}
                            name="activities"
                            value={personaData.activities}
                        />
                    </div>
                </div>
            </div>

            <div className="persona-footer">
                <button className="delete-btn" onClick={() => setDeleteModal(true)}>DELETE</button>
                {showDeleteModal &&
                    <div className="modal-overlay">
                        <div className="delete-modal-container">
                            <div className="delete-modal">
                                <div className="delete-headder">
                                    <h4>Delete Persona</h4>
                                    <button onClick={() => { setDeleteModal(false); setModalImage(personaData.image) }} className="close-button">✖</button>
                                </div>
                                <div className="delete-hr"><hr /></div>
                                <div className="delete-img"><img src={exclamation} alt="exclamation" /></div>
                                <div className="delete-content"><h3>Are You Sure</h3></div>
                                <div className="delete-actions">
                                    <button className="close-btn" onClick={() => setDeleteModal(false)}>CLOSE</button>
                                    <button className="delete-btn" onClick={handleDelete}>DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div>
                    <Link to={'/landingPage'}><button className="close-btn">CLOSE</button></Link>
                    <button className="update-btn" onClick={handleUpdate}>UPDATE PERSONA</button>
                </div>
            </div>
        </div>
    );
};

export default PersonaDetails;
