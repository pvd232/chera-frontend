import React, { forwardRef, useMemo } from 'react';
import { Uniform, Vector2 } from 'three';
import { BlendFunction, Effect } from 'postprocessing';
// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from '!!@davcri/webpack-glsl-loader!./glsl/kawase2.frag';
// eslint-disable-next-line import/no-webpack-loader-syntax
// import vertexShader from '!!@davcri/webpack-glsl-loader!./glsl/kawase2.vert';
let _deltaX;
let _deltaY;

// Effect implementation
class MyCustomEffectImpl extends Effect {
  constructor({ deltaX = null, deltaY = null } = {}) {
    super('MyCustomEffect', fragmentShader, {
      uniforms: new Map([
        ['delta_x', new Uniform(deltaX)],
        ['delta_y', new Uniform(deltaY)],
      ]),
      blendFunction: BlendFunction.NORMAL,
    });

    _deltaX = deltaX;
    _deltaY = deltaY;
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('delta_x').value = _deltaX;
    this.uniforms.get('delta_y').value = _deltaY;
  }
}

// Effect component
const CustomKawaseBlurPass = forwardRef(({ props }, ref) => {
  console.log('props', props);
  const effect = useMemo(() => new MyCustomEffectImpl(props), [props]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
export default CustomKawaseBlurPass;
