// import './index.less';
import {
  offsetLazyLoading,
  boundingClientRect,
  observer,
} from './lib/image-lazy-loading';

export function init(imageContentId) {
  if (IntersectionObserver) {
    observer({imageContentId});
  } else if (document && document.querySelector("body").getBoundingClientRect) {
    boundingClientRect({imageContentId});
  } else {
    offsetLazyLoading({imageContentId});
  }
}
