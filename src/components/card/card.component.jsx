import { ReactComponent as IconEllipsis } from "../../assets/images/icon-ellipsis.svg";

import "./card.styles.scss";

const Card = ({ title, data, prevData, timeOption }) => {

    timeOption = timeOption[0].toUpperCase() + timeOption.slice(1);
    title = title === 'selfCare' ? 'Self Care' : title;
    
    return (
        <div className={`card-container ${title === 'Self Care' ? 'self-care' : title}`}>
            <div className="card-text-container">
                <div className="top-row-container">
                    <div className="type-text">{title[0].toUpperCase() + title.slice(1)}</div>
                    <IconEllipsis/>
                </div>
                <div className="bottom-row-container">
                    <div className="hours-text">{data}hrs</div>
                    <div className="last-week-text">
                        {timeOption === 'Daily' ? 'Yesterday' : `Last ${timeOption.slice(0, timeOption.length - 2)} `}
                        - {prevData}{prevData === 'N/A' ? '' : 'hrs'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;