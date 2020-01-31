import React, { Component } from 'react';
import './item-list.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";

export default class ItemList extends Component {

  swapiService = new SwapiService();

  state = {
    peopleList: null
  };

  componentDidMount() {
    this.swapiService.getAllPeople()
      .then((res) => {
        this.setState({
          peopleList: res,
        });
      });
  }

  fetchNextPage = (url) => {
    const page = url.slice(url.length - 1)
    this.swapiService.getPages(page).then(res => console.log(232323, res))
  }

  renderItems(data) {
    const arr = data.results.map(i => this.swapiService._transformPerson(i))
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }

  render() {
    const { peopleList } = this.state;
    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItems(peopleList);
    return (
      <ul className="item-list list-group">
        {items}
        <button onClick={() => this.fetchNextPage(peopleList.next)}>Next Page</button>
      </ul>
    );
  }
}
