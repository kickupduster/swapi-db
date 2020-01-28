import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";


export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    films: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }



  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person });
      });
  }

  // nameFilms() {
  //   const { filmsId } = this.props;

  //   this.swapiService
  //   .getFilms(filmsId)
  //   .then((films) => {
  //     this.setState({ films });
  //   });
  // }


  render() {

    const { person } = this.state;
    if (!person) {
      return <span>Select a person from a list</span>;
    }

    const { id, name, gender,
              birthYear, eyeColor, height, mass,
            homeworld, films, species, vehicles, starships } = person;

  

    return (
      <div className="person-details card">
        <img className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Height</span>
              <span>{height}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Mass</span>
              <span>{mass}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Films</span>
              <span>{films}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Species</span>
              <span>{species}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Vehicles</span>
              <span>{vehicles}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Starships</span>
              <span>{starships}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Homeworld</span>
              <span>{homeworld}</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
