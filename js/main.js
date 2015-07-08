/**
 * Main JS for the open twin cities site.
 */

function insertExpandArrow(el){
  el.children(':header').append('<i class="fi-plus"></i>');
}

function removeExpandArrow(el){
  el.children(':header').find('i').remove();
}

(function(w, $, undefined) {
  $(document).foundation();
  $('dl.toggling dd').toggle();
  insertExpandArrow($('dl.toggling dt'));
  $(function() {
    $('dl').find('dt').on('click', function() {
      $(this).next().toggle('350', function(){
        if ($(this).is(':visible')){
          removeExpandArrow($(this).prev());
        } else {
          insertExpandArrow($(this).prev());
        }
      });  
    });
  });
})(window, jQuery);
