import { useState } from "react";
import QrReader from "react-qr-reader";
import { MdFlipCameraAndroid } from "react-icons/md";
import "../styles/App.css";

const CustomQrReader = ({ onClose, onError, onScan, showQrReader = false }) => {
    const [facingMode, setFacingMode] = useState(false);

    return (
        showQrReader &&
        <>
            <div className="qr-background" onClick={ onClose }></div> 
            <div className="qr-modal p-1 d-flex flex-column align-items-center">
                <div className="qr-reader" >
                    <QrReader 
                        delay={ 500 }
                        style={{ height: 240, width: 240 }}
                        onError={ onError }
                        onScan={ onScan }
                        facingMode={ facingMode ? "user" : "environment" }
                    />
                </div>
                <MdFlipCameraAndroid size={40} id="flipCamera" onClick={ () => setFacingMode(!facingMode) } />
            </div>
        </>
    );
}

export default CustomQrReader;