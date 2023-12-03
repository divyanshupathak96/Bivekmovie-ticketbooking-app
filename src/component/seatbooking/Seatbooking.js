import Seat from '../seat/Seat';
import './Seatbooking.css';
import data from '../../seatdata';
import { useEffect, useState } from 'react';
import { context } from '../../App';
import { useContext } from 'react';

let selectedSeatsCount = 0;
let selectedSeatsId = [];

export default function Seatbooking(){
    const {ticketType, setTicketType, ticketCount, setTicketCount, error, success, selectedSeats, setSelectedSeats} = useContext(context);

    const [seatData, setSeatData] = useState([...data]);

    function checkSeat(){
        if(ticketType === "none" && ticketCount === 0){
            error("Ticket Type and Quantity");
            return false;
        }
        else if(ticketType === "none"){
            error("Ticket Type");
            return false;
        }
        else if(ticketCount === 0){
            error("Quantity");
            return false;
        }
        else{
            return true;
        }
    }

    function onSeatClick(id){
        if(checkSeat()){
            if(selectedSeatsCount === ticketCount){
                removeSelected();
                autoSelectSeats(id);
            }
            else{
                autoSelectSeats(id);
            }
        }
    }

    function autoSelectSeats(id){
        const rowName = id.charAt(0);
        const seatNumber = Number(id.slice(1,id.length));


        const selectedRow = seatData.filter((item) => {
            return item.row === rowName;
        });
        
        for(let i=0; i<selectedRow[0].seats.length; i++){
            let seat = selectedRow[0].seats[i];
            if(seat.pos >= seatNumber){
                if(!seat.isSelected && seat.status === "available" && selectedSeatsCount < ticketCount){
                    seat.isSelected = true;
                    selectedSeatsCount += 1;
                    selectedSeatsId.push(selectedRow[0].row + seat.pos);
                }
                else{
                    setSelectedSeats(selectedSeatsId);
                    break;
                }
            }
        }

        const tempData = [...seatData];
        tempData[selectedRow[0].index] = selectedRow[0];
        setSeatData(tempData);
    }

    function bookSeats(){
        if(ticketCount){
            let updatedSeatData = [...seatData]
            updatedSeatData.forEach((rowItem)=>{
                rowItem.seats.forEach((seat)=>{
                    if(seat.isSelected){
                        seat.status = "unavailable";
                        seat.isSelected = false;
                    }
                })
            });

            success(selectedSeats);
            setSeatData(updatedSeatData);
            setTicketType("none")
            selectedSeatsCount = 0;
            setTicketCount(0);
            selectedSeatsId = [];
            setSelectedSeats([])
        }
    }

    function removeSelected(){
        let updatedSeatData = [...seatData]
        updatedSeatData.forEach((rowItem)=>{
            rowItem.seats.forEach((seat)=>{
                if(seat.isSelected){
                    seat.isSelected = false;
                }
            })
        })

        setSeatData(updatedSeatData);
        selectedSeatsCount = 0;
        selectedSeatsId = [];
        setSelectedSeats([])
    }

    useEffect(()=>{
        removeSelected();
    },[ticketType, ticketCount])



    return (
        <div id="seat_booking">
            <div className="premium">
                <h2 className='ticket-type-heading'>Premium - Rs. 480</h2>

                <div className="row-wrapper">
                    {
                        seatData.map((rowitem, idx)=>(
                            <>
                                {
                                    idx < 2
                                    
                                    &&

                                    <div
                                    key={rowitem.row}
                                    className={(ticketType === "premium" && idx < 2) ? "row" : (ticketType === "standard" && idx > 1 ? "row" : "row row-disable")}>
                                        <h2 className='row-name'>{rowitem.row}</h2>
                                        {
                                            rowitem.seats.map((rowseat)=>(
                                                <Seat
                                                key={rowitem.row + rowseat.pos}
                                                idname={rowitem.row + rowseat.pos}
                                                clsname={(rowseat.isSelected && rowseat.status === "available") ? "selected" : rowseat.status}
                                                onclickfn={(!rowseat.isSelected && rowseat.status === "available" && rowseat.type === ticketType) ? onSeatClick : checkSeat}/>
                                            ))
                                        }
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
            </div>

            <div className="Standard">
                <h2 className='ticket-type-heading'>Standard - Rs. 280</h2>

                <div className="row-wrapper">
                    {
                        seatData.map((rowitem, idx)=>(
                            <>
                                {
                                    idx > 1
                                    
                                    &&

                                    <div
                                    key={rowitem.row}
                                    className={(ticketType === "premium" && idx < 2) ? "row" : (ticketType === "standard" && idx > 1 ? "row" : "row row-disable")}>
                                        <h2 className='row-name'>{rowitem.row}</h2>
                                        {
                                            rowitem.seats.map((rowseat)=>(
                                                <Seat
                                                key={rowitem.row + rowseat.pos}
                                                idname={rowitem.row + rowseat.pos}
                                                clsname={(rowseat.isSelected && rowseat.status === "available") ? "selected" : rowseat.status}
                                                onclickfn={(!rowseat.isSelected && rowseat.status === "available" && rowseat.type === ticketType) ? onSeatClick : checkSeat}/>
                                            ))
                                        }
                                    </div>
                                }
                            </>
                        ))
                    }
                </div>
            </div>

            <div className="screen-wrapper">
                <div className="screen"></div>
                <h2>All eyes this way please!</h2>

                <div className="button-wrapper">
                    <button 
                    className={(ticketCount !== 0 && selectedSeats.length !== 0 && ticketCount === selectedSeats.length) ? "active" : "disable"}
                    onClick={ticketCount === selectedSeats.length ? bookSeats : null}
                    >
                        {
                            ticketCount !== 0 && selectedSeats !== 0 && ticketCount === selectedSeats.length
                            ?
                            `Proceed - Rs. ${ticketType === "premium" ? 480*ticketCount : 280*ticketCount}.00`
                            :
                            "Select " + (ticketCount - selectedSeats.length) + " Seat"
                        }
                    </button>
                </div>
            </div>

        </div>
    )
}