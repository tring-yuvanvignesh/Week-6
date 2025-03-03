import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { CREATE_PERSONA, UPDATE_PERSONA, DELETE_PERSONA } from "../../api/userApi";
import { createPersonaForCurrentUser, updatePersonaForCurrentUser, deletePersonaForCurrentUser } from "../../Slicer/authSlice";
import "./personaDetails.css";
import sampleImage from "../../Images/login_background.png";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";
import exclamation from "../../Images/Delete_Persona.png";

const PersonaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isNew = location.state?.isNew || false;

  const existingPersona = currentUser?.persona.find((p) => p.id === parseInt(id));

  const [personaData, setPersonaData] = useState(
    existingPersona || {
      id: parseInt(id),
      user_id: currentUser?.id,
      persona_name: "",
      quote: "",
      description: "",
      attitudes: "",
      pain: "",
      jobs: "",
      activities: "",
      image: sampleImage,
    }
  );

  const [createPersona] = useMutation(CREATE_PERSONA);
  const [updatePersona] = useMutation(UPDATE_PERSONA);
  const [deletePersona] = useMutation(DELETE_PERSONA);

  const [showImageModal, setImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(personaData.image);
  const [showDeleteModal, setDeleteModal] = useState(false);

  const handleChange = (e) => {
    setPersonaData({ ...personaData, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (field, value) => {
    setPersonaData({ ...personaData, [field]: value });
  };

  const handleSave = async () => {
    try {
      if (isNew) {
        const { data } = await createPersona({
          variables: {
            persona_name: personaData.persona_name,
            quote: personaData.quote,
            description: personaData.description,
            attitudes: personaData.attitudes,
            pain: personaData.pain,
            jobs: personaData.jobs,
            activities: personaData.activities,
            image: personaData.image,
            user_id: currentUser?.id, 
          },
        });

        if (data?.createPersona) {
          dispatch(createPersonaForCurrentUser(data.createPersona));
          alert("Persona created successfully!");
        }
      } else {
        const { data } = await updatePersona({
          variables: {
            id: personaData.id,
            persona_name: personaData.persona_name,
            quote: personaData.quote,
            description: personaData.description,
            attitudes: personaData.attitudes,
            pain: personaData.pain,
            jobs: personaData.jobs,
            activities: personaData.activities,
            image: personaData.image,
          },
        });

        if (data?.updatePersonaForCurrentUser) {
          dispatch(updatePersonaForCurrentUser(data.updatePersonaForCurrentUser));
          alert("Persona updated successfully!");
        }
      }

      navigate("/landingPage");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save persona");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePersona({ variables: { id: personaData.id } });
      dispatch(deletePersonaForCurrentUser(personaData.id));
      alert("Persona deleted successfully!");
      navigate("/landingPage");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete persona");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setModalImage(URL.createObjectURL(file));
    } else {
      alert("File size should be less than 5MB");
    }
  };

  const handleImageSubmit = () => {
    setPersonaData({ ...personaData, image: modalImage });
  };

  return (
    <div className="persona-details">
      <div className="persona-banner" style={{ backgroundImage: `url(${personaData.image})` }}>
        <div className="overlay">
          <div className="persona-header">
            <div className="persona_title">
              <label>
                Persona Name <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="persona_name" value={personaData.persona_name} onChange={handleChange} />
            </div>
            <button onClick={() => setImageModal(true)}>✏️ Edit Image</button>
          </div>
        </div>
      </div>

      {showImageModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h4>Update Image</h4>
            <button onClick={() => setImageModal(false)}>✖</button>
            <div className="image-preview-container">
              <img src={modalImage} alt="Preview" />
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <button onClick={handleImageSubmit}>SAVE</button>
          </div>
        </div>
      )}

      <div className="persona-content">
        <div className="persona-grid">
          <div className="persona-field">
            <label>Notable Quote</label>
            <input type="text" name="quote" value={personaData.quote} onChange={handleChange} />
          </div>
          <div className="persona-field">
            <label>Description</label>
            <input type="text" name="description" value={personaData.description} onChange={handleChange} />
          </div>
          <div className="persona-field">
            <label>Attitudes / Motivations</label>
            <input type="text" name="attitudes" value={personaData.attitudes} onChange={handleChange} />
          </div>
          <div className="persona-field">
            <label>Pain Points</label>
            <Quill value={personaData.pain} onChange={(value) => handleQuillChange("pain", value)} />
          </div>
          <div className="persona-field">
            <label>Jobs / Needs</label>
            <Quill value={personaData.jobs} onChange={(value) => handleQuillChange("jobs", value)} />
          </div>
          <div className="persona-field">
            <label>Activities</label>
            <Quill value={personaData.activities} onChange={(value) => handleQuillChange("activities", value)} />
          </div>
        </div>
      </div>

      <div className="persona-footer">
        {!isNew && (
          <button className="delete-btn" onClick={() => setDeleteModal(true)}>
            DELETE
          </button>
        )}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal-container">
              <h4>Delete Persona</h4>
              <img src={exclamation} alt="exclamation" />
              <p>Are you sure?</p>
              <button onClick={() => setDeleteModal(false)}>CLOSE</button>
              <button className="delete-btn" onClick={handleDelete}>
                DELETE
              </button>
            </div>
          </div>
        )}
        <Link to={"/landingPage"}>
          <button className="close-btn">CLOSE</button>
        </Link>
        <button className="update-btn" onClick={handleSave}>
          {isNew ? "CREATE PERSONA" : "UPDATE PERSONA"}
        </button>
      </div>
    </div>
  );
};

export default PersonaDetails;
