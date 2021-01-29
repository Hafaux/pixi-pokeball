import { Container, Graphics, Text } from 'pixi.js';
import gsap from 'gsap';

/**
 * Class representing a button.
 * @extends Container
 * @param {number} x
 * @param {number} y
 */
export default class Button extends Container {
  constructor(x, y) {
    super();

    this.interactive = true;
    this.buttonMode = true;
    
    this.name = 'button';
    this.height = 70;
    this.width = 150;

    this.x = x;
    this.y = y;

    this._addBg();
    this.buttonText = this._addText();
  }
  
  /**
   * @private
   */
  _addBg() {
    const bg = new Graphics();
    bg.beginFill(0xE8343A);
    bg.drawRect(0, 0, 200, 70);
    bg.endFill();
    this.addChild(bg);
  }

  /**
   * @private
   */
  _addText() {
    const text = new Text('THROW BALL', {
      fontSize: 20,
      fontStyle: 'bold',
      fill: 0xffffff,
    });

    text.anchor.set(0.5);
    text.x = this.width / 2;
    text.y = this.height / 2;
    this.addChild(text);

    return text;
  }

  show() {
    gsap.to(this, { alpha: 1, duration: 0.5 });
  }

  hide() {
    gsap.to(this, { alpha: 0, duration: 0.5 });
  }
}