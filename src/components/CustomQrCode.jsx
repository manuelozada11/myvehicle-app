import { QRCodeSVG } from "qrcode.react";
import { translate } from "../common/utils";
import "../styles/App.css";

const CustomQrCode = ({ value, height= 180, width= 180, onClose, onAccept, confirmation, title= "-", subtitle= "-", qrSubtitle= "-" }) => {
    return (
        <>
            <div className="qr-background" onClick={ onClose }></div> 
            <div className="qr-modal p-3 d-flex flex-column align-items-center">
            { 
                !confirmation ?
                    <div className="mt-3">
                        <div className="qr-code">
                            <QRCodeSVG
                                value={ value } 
                                height={height}
                                width={width} />
                        </div>
                        <p className="mx-0 mb-0 mt-2 text-center text-muted">{ qrSubtitle }</p>
                    </div>
                :
                <div className="d-flex pt-5 flex-column text-center">
                    <h5>{ title }</h5>
                    <div className="my-2">
                        <button className="btn btn-outline-primary rounded-pill m-2" onClick={ onAccept }>{ translate("vehicle.information.qrcode.accept") }</button>
                        <button className="btn btn-primary rounded-pill m-2" onClick={ onClose }>{ translate("vehicle.details.cancel") }</button>
                    </div>
                    <p className="m-0 fw-bold text-danger">{ subtitle }</p>
                </div>
            }
            </div>
        </>
    );
}

export default CustomQrCode;