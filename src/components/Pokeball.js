import { Container, Sprite, Text } from 'pixi.js';
import gsap from 'gsap';

/**
 * Class representing a Pokeball
 * @extends Container
 */
export default class Pokeball extends Container {
  constructor() {
    super();

    this.name = 'pokeball';
    this.text = new Text('temp', {
      fontSize: 224,
      fontStyle: 'bold',
      fill: 0xffffff,
    });

    this.top = new Sprite.from('ballTop');
    this.bottom = new Sprite.from('ballBottom');
    this.isOpened = false;

    // eslint-disable-next-line max-len
    this.pokemonsList = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon', 'Charizard', 'Squirtle', 'Wartortle', 'Blastoise', 'Caterpie', 'Metapod', 'Butterfree', 'Weedle', 'Kakuna', 'Beedrill', 'Pidgey', 'Pidgeotto', 'Pidgeot', 'Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Arbok', 'Pikachu', 'Raichu', 'Sandshrew', 'Sandslash', 'Nidoran', 'Nidorina', 'Nidoqueen', 'Nidorino', 'Nidoking', 'Clefairy', 'Clefable', 'Vulpix', 'Ninetales', 'Jigglypuff', 'Wigglytuff', 'Zubat', 'Golbat', 'Oddish', 'Gloom', 'Vileplume', 'Paras', 'Parasect', 'Venonat', 'Venomoth', 'Diglett', 'Dugtrio', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Mankey', 'Primeape', 'Growlithe', 'Arcanine', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Abra', 'Kadabra', 'Alakazam', 'Machop', 'Machoke', 'Machamp', 'Bellsprout', 'Weepinbell', 'Victreebel', 'Tentacool', 'Tentacruel', 'Geodude', 'Graveler', 'Golem', 'Ponyta', 'Rapidash', 'Slowpoke', 'Slowbro', 'Magnemite', 'Magneton', 'Farfetch’d', 'Doduo', 'Dodrio', 'Seel', 'Dewgong', 'Grimer', 'Muk', 'Shellder', 'Cloyster', 'Gastly', 'Haunter', 'Gengar', 'Onix', 'Drowzee', 'Hypno', 'Krabby', 'Kingler', 'Voltorb', 'Electrode', 'Exeggcute', 'Exeggutor', 'Cubone', 'Marowak', 'Hitmonlee', 'Hitmonchan', 'Lickitung', 'Koffing', 'Weezing', 'Rhyhorn', 'Rhydon', 'Chansey', 'Tangela', 'Kangaskhan', 'Horsea', 'Seadra', 'Goldeen', 'Seaking', 'Staryu', 'Starmie', 'Mr. Mime', 'Scyther', 'Jynx', 'Electabuzz', 'Magmar', 'Pinsir', 'Tauros', 'Magikarp', 'Gyarados', 'Lapras', 'Ditto', 'Eevee', 'Vaporeon', 'Jolteon', 'Flareon', 'Porygon', 'Omanyte', 'Omastar', 'Kabuto', 'Kabutops', 'Aerodactyl', 'Snorlax', 'Articuno', 'Zapdos', 'Moltres', 'Dratini', 'Dragonair', 'Dragonite', 'Mewtwo', 'Mew'];

    this._addPokeball();
  }

  /**
   * @returns {Object}
   */
  static get events() {
    return {
      OPEN_END: 'open_end',
      OPEN_START: 'open_start',
      CLOSE_END: 'cose_end',
      CLOSE_START: 'close_start',
    };
  }

  _addPokeball() {
    this.bottom.anchor.set(0.5);
    this.bottom.x = 0;
    this.bottom.y = 190;
    this.addChild(this.bottom);

    this.top.anchor.set(0.5);
    this.top.x = 0;
    this.top.y = 0;
    this.addChild(this.top);

    this.text.alpha = 0;
    this.text.y = 50;
    this.text.anchor.set(0.5);
    this.addChild(this.text);
  }

  _setRandomText() {
    this.text.text = this.pokemonsList[Math.floor(Math.random() * this.pokemonsList.length)];
  }

  /**
   * @returns {Promise}
   */
  async open() {
    this.isOpened = true;
    this.emit(Pokeball.events.OPEN_START);

    gsap.to(this.top, { y: -200, ease: 'elastic', duration: 1 });
    gsap.to(this.bottom, { y: 300, ease: 'elastic', duration: 1 });

    this.text.alpha = 1;
    await this._shuffle();
    this.text.alpha = 0;
  }

  close() {
    this.isOpened = false;
    this.emit(Pokeball.events.CLOSE_START);

    gsap.to(this.top, { y: 0, ease: 'elastic', duration: 1 });
    gsap.to(this.bottom, { y: 190, ease: 'elastic', duration: 1 });
  }

  /**
   * @returns {Promise}
   * @private
   */
  async _shuffle() {
    let prev = 0;

    const dummy = { value: 0 };
    const steps = gsap.to(dummy, {
      duration: 1,
      ease: 'steps(100)',
      value: 100,
      paused: true,
      onUpdate: () => {
        if (dummy.value !== prev) this._setRandomText();
        prev = dummy.value;
      },
    });

    await gsap.to(steps, { duration: 5, progress: 1, ease: 'circ.out'});
  }
}