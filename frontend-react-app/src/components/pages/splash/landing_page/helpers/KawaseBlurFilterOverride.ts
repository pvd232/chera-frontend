import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';

export default class KawaseOverride extends KawaseBlurFilter {
    constructor(blur:number, quality:number, clamp:boolean) {
      super(blur, quality, true);
    }
  }