import './index.less';
import {
  offsetLazyLoading,
  boundingClientRect,
  observer,
} from './lib/image-lazy-loading ';

offsetLazyLoading({imageContentId: 'offset'});
// boundingClientRect({imageContentId: 'boundingClientRect'});
// observer({imageContentId: 'observer'});