import 'element-closest-polyfill';
import LazyLoad from 'vanilla-lazyload';
import svg4everybody from 'svg4everybody';
import oicInit from '../../components/blocks/object-image-overlay/_object-image-overlay';
import contentWarningsInit from '../../components/blocks/object-card/_object-card';

require('../../components/services/object_fit_polyfill/_poly-object-fit.js');
require('../../components/blocks/background-video/_background-video.js');
require('../../components/groups/block-grid/_grid-reveal-more.js');
require('../../components/blocks/cookie-banner/_cookie-banner.js');
require('../../components/blocks/facet-box/_facet-box.js');
require('../../components/blocks/image-carousel/_image-carousel.js');
require('../../components/blocks/image-overlay-license-modal/_image-overlay-license-modal.js');
require('../../components/blocks/object-details/object-details.js');
require('../../components/blocks/object-shuffler/_object-shuffler.js');
require('../../components/blocks/modal/_modal.js');
require('../../components/blocks/newsletter-signup/_newsletter-signup.js');
require('../../components/blocks/search-form/_search-form.js');
require('../../components/blocks/search-pagination/_search-pagination.js');
require('../../components/blocks/search-result/_search-result.js');
require('../../components/blocks/search-results/_search-results.js');
require('../../components/blocks/site-nav/_site-nav.js');
require('../../components/blocks/toggle-nav/_toggle-nav.js');
require('../../components/blocks/video-thumbnail/_video-thumbnail.js');
require('../../components/blocks/video-trailer/_video-trailer.js');
require('../../components/groups/facet-box-modal/_facet-box-modal.js');
require('../../components/groups/image-overlay/_image-overlay.js');
require('../../components/groups/story-box-container/_story-box-container.js');

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
