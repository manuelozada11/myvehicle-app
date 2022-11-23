import '../styles/App.css';

const Card = ({ title, subtitle, subtStyle, value, onClick, valueStyle = {} }) => {
    
    const getInitials = () => {
        const words = title?.split(' ');
        let letters = '';
        
        for (let i = 0; i < 2; i++) {
            letters += words[i]?.substr(0, 1);
        }
        return letters;
    }

    return (
        <div className="py-3 px-4 my-3 mx-3 d-flex card-custom justify-content-between"
            onClick={ onClick ?? null }>
            <div>
                <h4 className="m-0" style={{ fontWeight: '300' }}>{ title }</h4>
                { subtitle }
            </div>

            <div className="rounded-circle d-flex align-items-center"
                style={ valueStyle }>
                { value ?? getInitials() } 
            </div>
        </div>
    );
}

export default Card;