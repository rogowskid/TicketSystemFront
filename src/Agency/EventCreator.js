import React from "react";
import { useState } from "react";

const EventCreator = () => {

    const [capacityEvent, setCapacityEvent] = useState("");
    const [dateTimeEvent, setDateTimeEvent] = useState("");
    const [locationEvent, setLocationEvent] = useState("");
    const [nameEvent, setNameEvent] = useState("");
    const [priceEvent, setPriceEvent] = useState("");
    const [typeEvent, setTypeEvent] = useState("");


    const handleSubmit = (event) => {
        const axios = require('axios').default;
        event.preventDefault();
        
        axios.post('http://localhost:8080/addevent', {
        
        'nameEvent': nameEvent,
        'dateTimeEvent': dateTimeEvent,
        'locationEvent': locationEvent,
        'priceEvent': priceEvent,
        'capacityEvent': capacityEvent

        })
        .then(function (response) {
          console.log(response);
          console.log('zwycienstwo')
        })
        .catch(function (error) {
          console.log(error);
          console.log('error :<')
        });
    
        setCapacityEvent("");
        setDateTimeEvent("");
        setLocationEvent("");
        setNameEvent("");
      };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"  id="nameEvent" placeholder="Nazwa wydarzenia" value={nameEvent} required onChange={(e) => setNameEvent(e.target.value)}/><br/>
          <input type="number"  id="capacityEvent" placeholder="Ilość miejsc" value={capacityEvent} required onChange={(e) => setCapacityEvent(e.target.value)}/><br/>
          <input type="date"  id="dateTimeEvent" placeholder="Dzień wydarzenia" value={dateTimeEvent} required onChange={(e) => setDateTimeEvent(e.target.value)}/><br/>
          <input type="text"  id="locationEvent" placeholder="Miejsce wydarzenia" value={locationEvent} required onChange={(e) => setLocationEvent(e.target.value)}/><br/>
          <input type="number" step="any" id="priceEvent" placeholder="Koszt wydarzenia" value={priceEvent} required onChange={(e) => setPriceEvent(e.target.value)}/><br/>
          <label>Wybierz rodzaj wydarzenia <br />
              <select value={typeEvent} required onChange={(e) => setTypeEvent(e.target.value)}>

            <option value="Koncert">Koncert</option>
            <option value="WydarzenieSportowe">Wydarzenie Sportowe</option>
            <option value="StandUp">Stand Up</option>
            <option value="Kabaret">Kabaret</option>

              </select>
              
          </label>
         <br />
         <br />
          <input type="submit" value="Utworz wydarzenie" />
        </form>
      );
    


}

export default EventCreator