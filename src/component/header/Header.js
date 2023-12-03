import React from "react";
import "./Header.css";
import { context } from "../../App";
import { useContext } from "react";

export default function Header() {
  const { setTicketType, ticketType, ticketCount, setTicketCount } =
    useContext(context);

  return (
    <div id="header">
      <div className="title-wrapper">
        <h1>Animal</h1>
        <h2>Galexy : Asansol | Today, 03 Nov, 06:00 PM</h2>
      </div>

      <div className="dropdown-wrapper">
        <span style={{ fontSize:"18px" }}>Ticket Type </span>
        <select
          name="ticket_type"
          id="ticket_type"
          defaultValue="none"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="none" disabled hidden>
            Ticket Type
          </option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <span style={{ fontSize:"18px" }}>Ticket Quantity </span>
        <select
          name="ticket_count"
          id="ticket_count"
          defaultValue="0"
          value={String(ticketCount)}
          onChange={(e) => setTicketCount(Number(e.target.value))}
        >
          <option value="0" disabled hidden>
            Qty
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    </div>
  );
}
