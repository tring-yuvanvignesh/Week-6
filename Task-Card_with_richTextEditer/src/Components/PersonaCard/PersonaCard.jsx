import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./personaCard.css";

const PersonaCard = ({ id, image, title, lastUpdated }) => {
    const navigate = useNavigate();
    return (
        <div className="persona-card" onClick={() => navigate(`/persona/${id}`)}>
            <img src={image} alt={title} className="persona-image" />
            <h3 className="persona-title">{title || "Untitled Persona"}</h3>
            {/* <p className="persona-timestamp">Last updated: {lastUpdated || "Never"}</p> */}
        </div>
    );
};

const AddPersonaCard = ({ onClick }) => {
    return (
        <div className="add-persona-card" onClick={onClick}>
            <div className="add-icon">+</div>
            <p>Add a Persona</p>
        </div>
    );
};

const PersonaGrid = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const personas = currentUser.persona || [];

    const handleAddPersona = () => {
        const newId = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
        navigate(`/persona/${newId}`, { state: { isNew: true } });
    };

    return (
        <div className="Persona-main">
            <div className="Persona-container">
                <div className="AddPersona">
                    <button onClick={handleAddPersona}><span>+</span> Add Persona</button>
                </div>
                <div className="persona-grid">
                    {personas.map((persona) => (
                        <PersonaCard
                            key={persona.id}
                            id={persona.id}
                            image={persona.image}
                            title={persona.persona_name}
                            lastUpdated={persona.lastUpdated}
                        />
                    ))}
                    <AddPersonaCard onClick={handleAddPersona} />
                </div>
            </div>
        </div>
    );
};

export default PersonaGrid;
