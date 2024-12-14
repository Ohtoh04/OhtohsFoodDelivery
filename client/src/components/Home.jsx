import React, { useState, useEffect } from 'react';
import {getCatFact} from "../../api/CatFact.js";
import {getDogFact} from "../../api/DogFact.js";

const Home = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [catFact, setCatFact] = useState(null);
    const [dogFact, setDogFact] = useState(null);

    useEffect(() => {
        const getCatRandomFact = async () => {
            const data = await getCatFact();
            if (data) setCatFact(data);
        }
        const getDogRandomfact = async () => {
            const data = await getDogFact();
            if (data) setDogFact(data);
        }
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        getCatRandomFact();
        getDogRandomfact();
        console.log(catFact);
        return () => clearInterval(timer);
    }, []);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <>
            <div>
                <section>
                    <h1 id="text-bg">Welcome</h1>
                </section>
                <section>
                    <div>
                        <h1>{currentTime.toLocaleDateString()}</h1>
                        <h2>{currentTime.toLocaleTimeString()}</h2>
                        <p>Time Zone: {timeZone}</p>
                    </div>
                </section>
                <section>
                    <section>
                        <h1>Cat Fact</h1>
                        {catFact ? (
                            <div>
                                {catFact.fact}
                            </div>
                        ) : (
                            <p>Loading random cat fact</p>
                        )}
                    </section>

                    <section>
                        <h1>Dog fact</h1>
                        {dogFact ? (
                            <div>
                                {dogFact}
                            </div>
                        ) : (
                            <p>Loading random dog fact</p>
                        )}
                    </section>
                </section>
            </div>

        </>
    );

  };
  
  export default Home;