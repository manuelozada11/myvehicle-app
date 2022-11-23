import QrCode from "qrcode.react";
import "../styles/App.css";

const CustomQrCode = ({ value, height= 150, width= 150, onClose }) => {
    return (
        <>
            <div className="qr-background" onClick={ onClose }></div> 
            <div className="qr-modal p-5 d-flex flex-column align-items-center">
                <div className="qr-code">
                    <QrCode
                        value={ value } 
                        renderAs={'svg'}
                        height={height}
                        width={width} />
                </div>
                {/* <div className="pt-3 pb-2" style={{ fontSize: '0.8rem' }}>
                    <div className="me-3 form-check">
                        <input className="form-check-input"
                            type="checkbox" 
                            name="permissions"
                            checked={ permissions }
                            onChange={ () => setPermissions(!permissions) } />
                        <label className="form-check-label" htmlFor="radioGasoline">Traspasar vehiculo</label>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default CustomQrCode;