import './Status.css';
import {ReactComponent as Seatsvg} from '../../assets/Seat.svg';


export default function Status(){

    return (
        <div id="status">
            <div className="status-inner-wrapper">
                <div className="available">
                    <Seatsvg fill='none' width={40} />
                    <h2>Available</h2>
                </div>

                <div className="unavailable">
                    <Seatsvg fill='#808080' style="background-color:e58a8a" width={40} />
                    <h2>Sold</h2>
                </div>
                
                <div className="selection">
                    <Seatsvg fill='#88C900' width={40} />
                    <h2>Your Selection</h2>
                </div>
            </div>
        </div>
    )
}