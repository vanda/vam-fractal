import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import oicInit from '../../components/blocks/object-image-overlay/_object-image-overlay';
import contentWarningsInit from '../../components/blocks/object-card/_object-card';

require('../../components/blocks/background-video/_background-video');
require('../../components/groups/block-grid/_grid-reveal-more');
require('../../components/blocks/cookie-banner/_cookie-banner');
require('../../components/blocks/facet-box/_facet-box');
require('../../components/blocks/image-carousel/_image-carousel');
require('../../components/blocks/image-overlay-license-modal/_image-overlay-license-modal');
require('../../components/blocks/object-details/object-details');
require('../../components/blocks/object-shuffler/_object-shuffler');
require('../../components/blocks/modal/_modal');
require('../../components/blocks/newsletter-signup/_newsletter-signup');
require('../../components/blocks/search-form/_search-form');
require('../../components/blocks/search-pagination/_search-pagination');
require('../../components/blocks/search-result/_search-result');
require('../../components/blocks/search-results/_search-results');
require('../../components/blocks/site-nav/_site-nav');
require('../../components/blocks/toggle-nav/_toggle-nav');
require('../../components/blocks/video-thumbnail/_video-thumbnail');
require('../../components/blocks/video-trailer/_video-trailer');
require('../../components/groups/facet-box-modal/_facet-box-modal');
require('../../components/groups/image-overlay/_image-overlay');
require('../../components/groups/story-box-container/_story-box-container');

/* eslint-disable no-new */
new LazyLoad({
  elements_selector: 'img[data-srcset]',
  cancel_on_exit: false,
  class_loading: 's-lazyload--blur',
  class_error: 's-lazyload--error',
  callback_error: (el) => {
    // required for safari which won't apply pseudo elements to replaced elements like IMG
    el.parentNode.insertBefore(document.createElement('div'), el).className = el.className;
    el.parentNode.removeChild(el);
  }
});

contentWarningsInit();
oicInit();

svg4everybody();
