const WhiteCard = ({ title, subtitle }) => {
    return (
        <div className="p-4 m-3 shadow"
            style={{ borderRadius: "1.5rem", border: "solid 2px black", backgroundColor: "#fff" }}>
            <h3 className="fw-light mb-0 d-flex align-items-center">
                { title ?? '' }
            </h3>
            <p className="m-0 fw-bold d-flex align-items-center">
                { subtitle ?? '' }
            </p>
        </div>
    );
}

export default WhiteCard;