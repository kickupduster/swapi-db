import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './next-button.css';



export default class NextButton extends Component {
swapiService = new SwapiService();
  state = {
    n: 1,
  };

  componentDidMount() {
    this.nextPage();
  }



  nextPage = () => {
    this.getAllPeople = async () => {
      const res = await this.getResource(`/people/?page=4`);
      return res.results
        .map(this._transformPerson)
    };
  }



  render() {




    return (
      <button
        className="error-button btn btn-danger btn-lg"
        onClick={() => (
          this.nextPage()
        )}>
        Next Page
      </button>
    );
  }
}
