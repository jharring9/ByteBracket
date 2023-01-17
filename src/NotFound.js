import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="error-section pt-120 pb-120">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="img-area">
                <img src="/assets/images/error-illus.png" alt="image" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="section-text">
                <h2 className="title">Page Not Found</h2>
                <p>Looks like you got lost...</p>
              </div>
              <div className="btn-border" onClick={goBack} style={{cursor: "pointer"}}>
                <div className="cmn-btn">
                  Go back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
