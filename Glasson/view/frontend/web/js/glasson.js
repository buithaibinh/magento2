define(['jquery', 'Magento_Ui/js/modal/modal'], function($, modal) {
  'use strict';

  /**
   * this function clone from glassOn admin
   */
  function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone';
    }
    if (/android/i.test(userAgent)) {
      return 'Android';
    }
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS';
    }
    return 'unknown';
  }

  return function(config, element) {
    const {userId, glassProId} = config;
    $(element).click(function() {
      // console.log(config);
      const os = getMobileOperatingSystem();
      // openWin(url);
      // return false;
      if (os === 'unknown') {
        // open iframe show tryon.
        var options = {
          type: 'popup',
          responsive: true,
          innerScroll: true,
          buttons: [],
          modalClass: 'try-on-modal',
        };
        
        var $iframePopup = $(document.createElement('div')); 
        $iframePopup.html(`
          <div class = "loading-iframe">
              <iframe id="iframe_glasson" width="100%" src="https://glasson.sk-global.biz/try-on/?s=${userId}&g=${glassProId}" height="510" frameborder="0" allow="camera" allowfullscreen></iframe>
          </div>
        `);

        var popup = modal(options, $iframePopup);
        var mg = $iframePopup.modal('openModal');
        mg.on('modalclosed', function() {
          // destroy iframe
          $iframePopup.remove();
        });
      } else {
        const url  = `https://glasson.sk-global.biz/app?s=${userId}&g=${glassProId}`;
        window.open(url, '_blank');
      }
      return false;
    });
  };
});
