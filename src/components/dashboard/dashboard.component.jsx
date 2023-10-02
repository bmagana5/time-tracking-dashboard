import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { DataContext } from "../../contexts/data.context";
import TitleCard from "../title-card/title-card.component";
import Card from "../card/card.component";

import './dashboard.styles.scss';

const Dashboard = () => {
    const { user, timeOption } = useContext(UserContext);
    const { data } = useContext(DataContext);
    const [ currentData, setCurrentData ] = useState(null);
    const [ prevData, setPrevData ] = useState(null);

    const titles = [
        "work",
        "play",
        "study",
        "exercise",
        "social",
        "selfCare"
    ];

    useEffect(() => {
        if (timeOption && data) {
            const defaultDataTemplate = {
                type: "",
                data: {
                    work: 0,
                    play: 0,
                    study: 0,
                    exercise: 0,
                    social: 0,
                    selfCare: 0
                }
            };
            
            const generateTimeSums = () => {
                // console.log(data);
                switch (timeOption) {
                    case 'daily':
                        break;
                    case 'monthly':
                        let months = [];
                        data.months.forEach(month => {
                            const updatedMonth = month.weeks.reduce((prevVal, currWeek, index) => {
                                const updatedWeek = currWeek.days.reduce((prevVal, currDay, index) => {
                                    // console.log(currDay);
                                    return {
                                        ...prevVal,
                                        data: {
                                            work: prevVal.data.work + currDay.work,
                                            play: prevVal.data.play + currDay.play,
                                            study: prevVal.data.study + currDay.study,
                                            exercise: prevVal.data.exercise + currDay.exercise,
                                            social: prevVal.data.social + currDay.social,
                                            selfCare: prevVal.data.selfCare + currDay.selfCare
                                        }
                                    };
                                }, {...defaultDataTemplate, type: timeOption});
                                return {
                                    ...prevVal,
                                    data: {
                                        work: prevVal.data.work + updatedWeek.data.work,
                                        play: prevVal.data.play + updatedWeek.data.play,
                                        study: prevVal.data.study + updatedWeek.data.study,
                                        exercise: prevVal.data.exercise + updatedWeek.data.exercise,
                                        social: prevVal.data.social + updatedWeek.data.social,
                                        selfCare: prevVal.data.selfCare + updatedWeek.data.selfCare
                                    }
                                };
                            }, {...defaultDataTemplate, type: timeOption});
                            months.push(updatedMonth);
                        });
                        // console.log(months);
                        setCurrentData(months[0]);
                        setPrevData({
                            type: timeOption,
                            data: {
                                work: 'N/A',
                                play: 'N/A',
                                study: 'N/A',
                                exercise: 'N/A',
                                social: 'N/A',
                                selfCare: 'N/A'
                            }
                        });
                        break;
                    default:
                        // console.log(data.months)
                        let weeks = [];
                        data.months.forEach(month => {
                            month.weeks.forEach(week => {
                                const updatedWeek = week.days.reduce((prevVal, currDay, index) => {
                                    // console.log(currDay);
                                    return {
                                        ...prevVal,
                                        data: {
                                            work: prevVal.data.work + currDay.work,
                                            play: prevVal.data.play + currDay.play,
                                            study: prevVal.data.study + currDay.study,
                                            exercise: prevVal.data.exercise + currDay.exercise,
                                            social: prevVal.data.social + currDay.social,
                                            selfCare: prevVal.data.selfCare + currDay.selfCare
                                        }
                                    }
                                }, {...defaultDataTemplate, type: timeOption});
                                weeks.push(updatedWeek);
                            });
                        });
                        // console.log(weeks);
                        setCurrentData(weeks[0]);
                        setPrevData(weeks[1]);
                }
            };
            generateTimeSums();
        }
    }, [timeOption, data]);

    return (
        <div className='dashboard-container'>
            {
                data &&
                <TitleCard name={user.name} profileImg={data.profileImg} />
            }
            <div className="card-list-container">
                {
                    data && currentData && 
                    titles.map(title => <Card key={title} 
                        title={title} 
                        data={currentData.data[title]} 
                        prevData={prevData.data[title]}
                        timeOption={timeOption}/>)
                }
            </div>
        </div>
    );
};

export default Dashboard;