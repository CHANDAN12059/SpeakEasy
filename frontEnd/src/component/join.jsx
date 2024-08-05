
import "./join.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Link } from "react-router-dom";


let currUser;

function Join() {
    let [user,setUser]=useState("");

function inputHandler(e){
    setUser(e.target.value);
   
}
function sendUser(e){
    currUser=user;
    if(!user){
        e.preventDefault();
        return;
    }
    setUser("");
}


    return (
        <div className="joinPage">

<div className="navbar">

<h4>SpeakEasy</h4>

</div>


            <div className="joinContainer">
                <div className="row">

                    <div className="col-lg-5 col-md-8 col-sm-8 col-8 offset-2">
                        <div className="card">
                            <div className="card-body">

                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput" className="form-label">Name</label>
                                    <input type="text" id="disabledTextInput" className="form-control" onChange={inputHandler} value={user} />
                                </div>

                                    <Link to="/chats"><button onClick={sendUser} className="btn btn-outline-success">Login</button> </Link>


                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>


    )
}

export default Join;
export {currUser};