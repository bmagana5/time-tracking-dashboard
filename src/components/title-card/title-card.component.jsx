import { useContext } from "react";
import "./title-card.styles.scss";
import { UserContext } from "../../contexts/user.context";

const TitleCard = ({ name, profileImg }) => {
    const { timeOption, setTimeOption } = useContext(UserContext);

    const changeTimeOption = (event) => {
        const { value } = event.target;
        if (value !== timeOption) {
            setTimeOption(value);
        }
    }

    return (
        <div className="title-card-container">
            <div className="title-container">
                <img src={`${process.env.PUBLIC_URL}/${profileImg}`} alt={name} />
                <div className="text-container">
                    <span>Report for</span>
                    <span className="name-span">{name}</span>
                </div>
            </div>
            <div className="buttons-container">
                <button className={`${timeOption === 'daily' ? 'active' : ''}`} value="daily" onClick={changeTimeOption}>Daily</button>
                <button className={`${timeOption === 'weekly' ? 'active' : ''}`} value="weekly" onClick={changeTimeOption}>Weekly</button>
                <button className={`${timeOption === 'monthly' ? 'active' : ''}`} value="monthly" onClick={changeTimeOption}>Monthly</button>
            </div>
        </div>
    );
};

export default TitleCard;