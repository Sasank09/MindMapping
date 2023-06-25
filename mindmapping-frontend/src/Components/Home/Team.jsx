import React from "react";

export const Team = (props) => {
    return (
        <div id="team" className="text-center" style={{backgroundColor: "black",color: "navajowhite", minHeight:"40vh"}}>
            <div className="container">
                <div className="section-title">
                    <h2>Meet the Team</h2>
                    <h4  style={{color: "white", padding:"10px"}}>
                        Advanced Software Engineering - Group Project - Mind Mapping SpringBoot+React+MySQL Web Application
                    </h4>
                </div>
                <div className="row justify-content-center">
                    {props.data
                        ? props.data.map((d, i) => (
                            <div key={`${d.name}-${i}`} className="col-sm-4 col-md-4">
                                {" "}
                                <div className="caption">
                                    <h5>{d.name}</h5>
                                    <p  style={{color: "papayawhip", fontSize:"small"}}>{d.job}</p>
                                </div>
                            </div>
                        ))
                        : "Loading..."}
                </div>
            </div>
        </div>
    );
};