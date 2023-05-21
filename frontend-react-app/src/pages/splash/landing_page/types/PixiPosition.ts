import { Graphics } from '@pixi/react';
type PixiGraphics = typeof Graphics;
export default interface PixiPosition extends PixiGraphics {
  position: {
    x: number;
    y: number;
  };
  scale: {
    x: number;
    y: number;
  };
}
