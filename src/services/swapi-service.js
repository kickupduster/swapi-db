export default class SwapiService {
  
  _apiBase = 'https://swapi.co/api';
  _apiPage = 'https://swapi.co/api/people/?page=';
  // _apiPage = 'https://swapi.co/api/people/';


  getPage = async (n) => {
    const num = await fetch(`${this._apiPage}${n}`);
    return await num.json();
  };

  

  nextPage = async () => {
    const next = await fetch('https://swapi.co/api/people/');
    return await next.json();
  };

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` +
        `, received ${res.status}`)
    }
    return await res.json();
  };


  getAllPeople = async () => {
    const res = await this.getResource(`/people/`);
    return res.results
      .map(this._transformPerson)
      
  };

  getPages = async (n) => {
    n = 3;
    const page = await this.getResource(`/people/?page=${n}`);
    return page.results.map(this._transformPerson)
  }

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results
      .map(this._transformPlanet)
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results
      .map(this._transformStarship)
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  };


  getAllFilms = async () => {
    const res = await this.getResource(`/films/`);
    return res.results
      .map(this._transformFilms)
  };

  getFilms = async (id) => {
    const films = await this.getResource(`/films/${id}/`);
    return this._transformFilms(films);
  };




  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformFilms = (films) => {
    return {
      id: this._extractId(films),
      name: films.name,
    };
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      diameter: planet.diameter,
      gravity: planet.gravity,
      orbitalPeriod: planet.orbital_period,
      population: planet.population,
      terrain: planet.terrain,
      climate: planet.climate,
      rotationPeriod: planet.rotation_period,
    };
  };

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity
    }
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      height: person.height,
      mass: person.mass,
      homeworld: person.homeworld,
      films: person.films,
      species: person.species,
      vehicles: person.vehicles,
      starships: person.starships,
    }
  }
}
