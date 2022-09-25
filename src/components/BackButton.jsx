import { IoChevronBackCircleSharp } from 'react-icons/io5';

const BackButton = ({ onClick }) => {
    return <IoChevronBackCircleSharp onClick={ onClick } size={ 45 } className="color-secondary cursor-pointer" />
}

export default BackButton;