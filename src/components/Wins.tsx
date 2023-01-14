import { IonGrid, IonRow, IonCol, IonTitle } from '@ionic/react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import game from './../images/game.jpg';
import React, { useState } from 'react'
import { initialWins } from '../context/localStorage/reducer/LocalStorageRedux';
import './../styles/Wins.css'
let flagInit = false;
function Wins(props: any) {
    const reduxState: any = useSelector((state) => (state as any).reducer);
    const dispatch = useDispatch();
    const [myWins, setMyWins] = useState(reduxState.wins);

    setTimeout(() => {
        if (!flagInit) {
            onInit();
            flagInit = true;
        }
    }, 1000);

    const updateNewWin = () => {
        let property = props.location.state;
        let wins = localStorage.getItem('wins');
        if (!wins) {
            (wins as any) = [property]
            localStorage.setItem('wins', JSON.stringify(wins))
        }
        else {
            let result: any = JSON.parse(wins);
            result.push(property)
            result.sort((a: any, b: any) => {
                return b.score - a.score
            })
            if (result.length > 10) {
                result.pop()
            }
            localStorage.setItem('wins', JSON.stringify(result))
        }
    }

    const onInit = () => {
        let property = props.location.state;
        const getWinsFromState = () => dispatch(initialWins())
        getWinsFromState();
        setMyWins(reduxState.wins)
        const rows = document.getElementsByClassName('row') as HTMLCollection;
        for (let row of rows as any) {
            const text = row.childNodes[0].children[0].innerText;
            if (text === property) {
                row.setAttribute('class', 'blink_me')
            }
        }
    }
    return (
        <>
            <div className='main'>
                <IonTitle className='pink-header' onClick={onInit} >Our Wins:</IonTitle>
                <div className='win-list'>
                    <IonGrid>{
                        myWins.map((item: any) =>
                            <IonRow key={item.name + ' ' + item.score + Math.random()} className='row'>
                                <IonCol size='6'>
                                    <span>
                                        {item.name}
                                    </span>
                                </IonCol>
                                <IonCol size='6'>
                                    <span>
                                        {item.score}
                                    </span>
                                </IonCol>
                            </IonRow>)
                    }</IonGrid>
                </div>
                <div className='home'>
                    <img src={game} className='home-img' alt="img didn't found" />
                    <Link to={''} className='link'>
                        <span>Go to Home page</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Wins