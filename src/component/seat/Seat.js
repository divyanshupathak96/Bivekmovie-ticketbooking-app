import './Seat.css';
import {ReactComponent as Seatsvg} from '../../assets/Seat.svg';



export default function Seat({ idname, clsname, onclickfn }){


    return (
        <div className="seat-wrapper" id={idname} onClick={onclickfn ? (e)=>onclickfn(e.currentTarget.id) : null}>
            <Seatsvg className={clsname}/>
        </div>
    )
}