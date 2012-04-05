/**
 *
 * Calls a given callback when the user scrolls to the bottom of the page. 
 * This will use the throttle-debounce plugin if it is available.
 * 
 * @author Shiki
 * @see http://benalman.com/projects/jquery-throttle-debounce-plugin/ 
 * 
 */

;(function(document, window, $) {
  
  var listeners = 0,
      $window   = $(window),
      $document = $(document);
  
  /**
   * Handler for $(window).scroll
   */
  var windowDidScroll = function() {
    var scrolled = $window.height() + $window.scrollTop(),
        offset   = $document.height() - scrolled; 
    if (offset <= $.nearbottom.options.offset)
      $window.trigger('nearbottom', offset);
  };
  
  $.nearbottom = function(callback) {
    $window.bind('nearbottom', callback);
    listeners += 1;
    
    if (listeners == 1) {      
      var didScroll = windowDidScroll;
      if ($["throttle"]) { // use throttle-debounce plugin if it's available        
        didScroll = $.throttle(500, didScroll);
      }
      $window.scroll(didScroll);
    }
    
    // fire immediately in case we're already in the bottom
    $window.trigger('scroll');
  };
  
  $.nearbottom.unbind = function(callback) {    
    if (typeof callback == "undefined") {
      $window.unbind('nearbottom');
      listeners = 0;
    } else {
      $window.unbind('nearbottom', callback);
      listeners -= 1;
    }
    
    if (listeners == 0)
      $window.unbind('scroll', windowDidScroll);
  };
  
  $.nearbottom.options = {
    offset: 40
  };
  
 
  
})(document, window, jQuery);


