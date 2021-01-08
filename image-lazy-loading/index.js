import './index.less';
import observer from './lib/observer';
import boundingClientRect from './lib/boundingClientRect';
import offsetLazyLoading from './lib/offset';

function init(imageContentId) {
  if (IntersectionObserver) {
    observer({imageContentId});
  } else if (document && document.querySelector("body").getBoundingClientRect) {
    boundingClientRect({imageContentId});
  } else {
    offsetLazyLoading({imageContentId});
  }
}

init('image-loading')
