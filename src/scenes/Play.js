import { Sprite } from 'pixi.js';
import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Pokeball from '../components/Pokeball';

export default class Play extends Scene {
  async onCreated() {

    const footer = new Footer();
    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    const pokeball = new Pokeball();
    pokeball.y = -100;

    const button = new Button(-100, 300);
    button.on('click', async () => {
      button.hide();
      await pokeball.open();
      pokeball.close();
      button.show();
    });

    this.addChild(pokeball);
    this.addChild(button);
  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}
