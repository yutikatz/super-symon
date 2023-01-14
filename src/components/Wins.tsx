import { IonGrid, IonRow, IonCol, IonTitle } from '@ionic/react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import game from './../images/game.jpg'; 
import { initialWins, winsList } from '../context/localStorage/reducer/WinsReducer';
import './../styles/Wins.css';
import  Player from './../model/Player';
let flag = false;

function Wins(props: any) {
    const dispatch = useDispatch();
    if (!flag) {

        dispatch(initialWins());
        flag = true;
    }
    const myWins: Player[] = useSelector(winsList);

    setTimeout(() => {
        onInit();
    }, 1000);

    const updateFlag = () => {
        flag = false;
    }
    const onInit = () => {
        let property = props.location.state;

        // console.log(winsState.wins);

        //myWins = winsState.wins;
        // setMyWins(winsState.wins)
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
                    <Link onClick={updateFlag} to={''} className='link'>
                        <span>Go to Home page</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Wins