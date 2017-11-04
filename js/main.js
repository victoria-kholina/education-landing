jQuery(document).ready(function(){
    
getDropdown();  
$(window).resize(getDropdown); 
    
    var mySwiper = new Swiper ('.swiper-container', {
      loop: false,
      pagination: '.swiper-pagination',
      paginationClickable: true,
    
      paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 5
    }); 

    function getDropdown(){
        var winWidth = $(window).width();
        if(winWidth<='768'){ 
            $('.main-menu button').removeClass("hidden").addClass("show");
            $('.main-menu').addClass("dropdown btn-group");
            $('.main-menu ul').addClass("dropdown-menu");
        } else { 
            $('.main-menu button').removeClass("show").addClass("hidden");
            $('.main-menu').removeClass("dropdown");
            $('.main-menu ul').removeClass("dropdown-menu");     
        };
        };
    
    
        
});//end jQuery
                    