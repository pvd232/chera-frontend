import { Container, withFilters } from '@pixi/react';
import { KawaseBlurFilter } from '@pixi/filter-kawase-blur';
const KawaseBlurFilterImpl = withFilters(Container, {
  blur: KawaseBlurFilter,
});
export default KawaseBlurFilterImpl;
