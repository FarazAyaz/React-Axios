import React from "react";

const Card = () => {
  return (
    <div className="card">
      <div className="card-title">The First Card</div>
      <div className="card-desc">This is the details of this card </div>
      <div className="card-actions">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Card;
