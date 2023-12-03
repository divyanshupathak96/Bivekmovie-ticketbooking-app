import './App.css';
import Header from './component/header/Header';
import Seatbooking from './component/seatbooking/Seatbooking';
// import Status from './component/status/Status';
import { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const context = createContext("");

function error(msg){
  toast.error("Please select " + msg, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}

function success(seats){
  toast.success("Congratulation tickets has been booked successfully " + seats, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
}


function App() {
  const [ticketType, setTicketType] = useState("none");
  const [ticketCount, setTicketCount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);


  return (
    <context.Provider value={{ticketType, setTicketType, ticketCount, setTicketCount, error, success, selectedSeats, setSelectedSeats}}>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>

        <main>
          <Seatbooking />
          {/* <Status /> */}
        </main>

        <ToastContainer progressClassName="toastProgress" bodyClassName="toastBody"/>
      </div>
    </context.Provider>
  );
}

export default App;
