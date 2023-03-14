import "./EditMessage.css"

export default function EditMessage({ textRef, nodeName, setNodeName }) {
    return (
      <div className="modal-container">
        <div className="modal-header">
            <span>Test 1.1</span>
            <div
            className="modal-close-icon"
            style={{ cursor: "pointer" }}
            >
            <p style={{fontSize: "10px", color: "white"}}>X</p>
        </div>
        </div>
        <div>
            <div className="form-group">
                <label htmlFor="">Description:</label>
                <input className="input-box" type="text" placeholder="CharField :" ref={textRef} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Type</label>
                <input className="input-box" type="text" placeholder="CharField :" ref={textRef} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Content:</label>
                <input className="input-box" type="text" placeholder="CharField :" ref={textRef} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="">Color:</label>
                <input className="input-box" type="text" placeholder="CharField :" ref={textRef} value={nodeName} onChange={(evt) => setNodeName(evt.target.value)}/>
            </div>

            <div className="form-footer">
                <input className="footer-btn" type="button" value="Cancel"/>
                <input className="footer-btn" type="button" value="OK"/>
            </div>
        </div>
      </div>
    );
  }