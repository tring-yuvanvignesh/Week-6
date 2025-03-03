import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./personaCard.css";

const defaultImage = "Task-Card_with_richTextEditer\src\Images\login_background.png"; 

const PersonaCard = ({ id, image, title, lastUpdated }) => {
    const navigate = useNavigate();
    return (
        <div className="persona-card" onClick={() => navigate(`/persona/${id}`)}>
            <img src={image || defaultImage} alt={title || "Persona"} className="persona-image" />
            <h3 className="persona-title">{title || "Untitled Persona"}</h3>
            {lastUpdated && <p className="persona-timestamp">Last updated: {lastUpdated}</p>}
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
    const personas = currentUser?.persona || [];

    const handleAddPersona = () => {
        const maxId = personas.reduce((max, p) => (p.id > max ? p.id : max), 0);
        const newId = maxId + 1;
        navigate(`/persona/${newId}`, { state: { isNew: true } });
    };

    return (
        <div className="Persona-main">
            <div className="Persona-container">
                <div className="AddPersona">
                    <button onClick={handleAddPersona}><span>+</span> Add Persona</button>
                </div>
                <div className="persona-grid">{
                        personas.map((persona) => (
                            <PersonaCard
                                key={persona.id}
                                id={persona.id}
                                image={persona.image}
                                title={persona.persona_name}
                                lastUpdated={persona.lastUpdated}
                            />
                        )
                    )}
                    <AddPersonaCard onClick={handleAddPersona} />
                </div>
            </div>
        </div>
    );
};

export default PersonaGrid;
