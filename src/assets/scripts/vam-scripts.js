// V&A front-end component scripts
import oicInit from '../../components/blocks/object-image-overlay/_object-image-overlay';
import contentWarningsInit from '../../components/blocks/object-card/_object-card';
import carouselInit from '../../components/blocks/carousel/_carousel';

require('../../components/services/imageload/_imageload');
require('../../components/blocks/accordion/_accordion');
require('../../components/blocks/background-video/_background-video');
require('../../components/groups/block-grid/_grid-reveal-more');
require('../../components/blocks/cookie-banner/_cookie-banner');
require('../../components/blocks/image-carousel/_image-carousel');
require('../../components/blocks/image-overlay-license-modal/_image-overlay-license-modal');
require('../../components/blocks/image-row/_image-row');
require('../../components/blocks/list-promo/_list-promo');
require('../../components/blocks/object-details/object-details');
require('../../components/blocks/object-shuffler/_object-shuffler');
require('../../components/blocks/modal/_modal');
require('../../components/blocks/newsletter-signup/_newsletter-signup');
require('../../components/blocks/search-form/_search-form');
require('../../components/blocks/search-result/_search-result');
require('../../components/blocks/site-nav/_site-nav');
require('../../components/blocks/toggle-set/_toggle-set');
require('../../components/blocks/video-thumbnail/_video-thumbnail');
require('../../components/blocks/video-trailer/_video-trailer');
require('../../components/blocks/events-featured/_events-featured');
require('../../components/groups/image-overlay/_image-overlay');
require('../../components/groups/story-box-container/_story-box-container');

contentWarningsInit();
oicInit();
Array.from(document.querySelectorAll('.b-carousel'), (carousel) => {
  carouselInit(carousel);
  return true;
});
