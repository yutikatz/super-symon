import React from 'react';

import { IonModal, IonButton, IonInput, IonApp } from '@ionic/react';
import { Link } from "react-router-dom";
import start from './../images/game.jpg';
import { env } from './../config'
import './../styles/Game.css'
import "react-tooltip/dist/react-tooltip.css";
import party from "party-js";


class Game extends React.Component {
    isStart: boolean = false;
    arrColor: string[] = [];
    flag: boolean = true;
    btn: boolean = false;
    stateName: string = 'Game';
    counter: number = 0;
    score: number = 0;
    audio;
    innerCounter: number = 0;
    constructor(props: any) {
        super(props);
        this.start = this.start.bind(this);
        this.checkBalls = this.checkBalls.bind(this);
        this.stopShowModal = this.stopShowModal.bind(this);
        this.audio = new Audio(env.SOUND);
        this.state = {
            showModal: false,
            turn: '',
            userName: ''

        }
    }
    render() {
        return (
            <>
                <div id='body'>
                    <div className='header'>

                        <div className='score'><span>score : </span><span>{this.score}</span></div>
                    </div>
                    <div className='ball' id='ball1' onClick={() => this.checkBalls(1)} ></div>
                    <div className='ball' id='ball2' onClick={() => this.checkBalls(2)}></div>
                    <div className='ball' id='ball3' onClick={() => this.checkBalls(3)}></div>
                    <div className='ball' id='ball4' onClick={() => this.checkBalls(4)}></div>
                    <div className='ball' id='ball5' onClick={() => this.checkBalls(5)}></div>
                    {(this.state as any).turn === '' ? <img src={start} className='img' data-tooltip-html={'start'} alt="img didn't found" onClick={this.start} />
                        : <div></div>}
                </div>
                <IonApp>
                    <IonModal isOpen={(this.state as any).showModal} className='modal'>
                        <IonInput className='input'
                            onIonChange={(e: any) => this.changeValue(e.target.value)}
                            placeholder='Init user name'
                        ></IonInput>
                        <Link onClick={this.stopShowModal }  
                                  to={(this.state as any).userName ? { pathname: 'wins', state: (this.state as any).userName } : {}} >
                            <IonButton className='submit' disabled={!(this.state as any).userName}> Submit
                            </IonButton>
                        </Link>
                    </IonModal>
                </IonApp>
                <div id='wow'></div>
            </>
        );
    }

    changeValue(ev: string) {
        this.setState({
            userName: ev,
        })
    }
    start() {
        if (!this.isStart) {
            this.isStart = true
        }
        this.counter = 0;
        this.setState({ turn: 'me' });
        if (this.flag) {
            const d = document as any;
            let num = Math.trunc(Math.random() * 5 + 1)
            this.arrColor.push(`#ball${num}`)
            for (let index = 0; index < this.arrColor.length; index++) {
                let setTime = setTimeout(() => {
                    if (this.btn) {
                        clearTimeout(setTime)
                    }
                    d.querySelector(this.arrColor[index]).setAttribute('class', 'ball')

                }, 1000 * (index + 1) + 500);
                setTimeout(() => {
                    this.play();
                    d.querySelector(this.arrColor[index]).setAttribute('class', 'ball bright')
                    this.counter++
                    if (this.counter === this.arrColor.length) {
                        this.btn = true
                    }
                    if (index === this.arrColor.length - 1) {
                        setTimeout(() => {
                            this.setState({ turn: 'you' });
                        }, 800);
                    }
                }, 1000 * (index + 1));
            }

        }
    }
    checkBalls(id: number) {
        if (!this.isStart) {
            return;
        }
        if (this.innerCounter !== 0) {
            (document as any).querySelector(this.arrColor[this.innerCounter - 1]).setAttribute('class', 'ball')
        }
        if (this.btn) {
            this.play();
            let current = this.arrColor[this.innerCounter]
            if (current !== `#ball${id}`) {
                (document as any).querySelector('#body').setAttribute('class', '');
                (document as any).querySelector('#body').innerHTML = ('error!' as any);
                (document as any).querySelector('#body').style.color = ('white' as any);
                (document as any).querySelector('#body').style.fontSize = '50rem';
                this.flag = false;
                this.endGame();
                return;
            }
            (document as any).querySelector(current).setAttribute('class', 'ball bright');
            setTimeout(() => {
                (document as any).querySelector(current).setAttribute('class', 'ball');

            }, 900)
            this.innerCounter++;
            this.score = this.counter
            if (this.innerCounter === this.arrColor.length) {
                let wow = (document as any).querySelector("#wow");
                party.confetti(wow);
                this.innerCounter = 0;
                this.btn = false;
                this.start()
            }
        }
    };
    endGame() {
        this.setState({
            showModal: true,
        })
    }
    play() {
        this.audio.play();
    }
    stopShowModal() {
        let wins = localStorage.getItem('wins');
        let property = { name: (this.state as any).userName, score: this.score }
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
        this.setState({
            showModal: false,
        })
    }
}
export default Game