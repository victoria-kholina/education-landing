
jQuery(document).ready(function(){
    var winWidth = $(window).width();
    var winHeight = $(window).height();
    
    if (winWidth>768){ $.stellar(); };
    
    function toCenter(elem, elWidth, elHeight) { //Use this function for positioning elements in the centre of the screen
        var posX = winWidth/2;
        var posY = winHeight/2;
        elem.css({
            "width": elWidth,
            "height": elHeight,
            "top": posY-elHeight/2, 
            "left": posX-elWidth/2});
    }
    
    $("a").click(function () {
        var elemClick = $(this).attr("href");
        var blHeight = $(elemClick).height();    
        var elemPos = $(elemClick).offset().top-((winHeight-blHeight)/2);
        $("body,html").animate({scrollTop: elemPos }, 800);
        return false;
      });
      
        //OVERLAY FORM
    
    $("#header-button").click(function() {
         $(".overlay").fadeIn("fast" , function() {
            $(".overlay-form").animate({
                top: "10px",
                opacity: "1"
            }, 200);
        });
    });
    
    function hideOverlayForm() {
         $(".overlay-form").animate({
                top: "-250px",
                opacity: "0"
            }, 200, 'linear',
                function() {
                $(".overlay").fadeOut("fast");
            });
    };
    
    $(".overlay, .close").click(function() {
        hideOverlayForm();
    });
    
        //Preloader, overlay and modal window for the response text from the server
    
    function showOverlayMessage(text) {
        $(".overlay").removeClass("black-bg").addClass("white-bg").fadeIn("slow");
        if($(".status-show").hasClass("preloader")){
            $(".preloader").html(text); 
        } else {
             $(".status-show").css("display", "block");
            $(".status-show").addClass("message");
            toCenter($(".message"), 500, 200);
            $(".message").html("<div class='status-text'>"+ text + "<button type='button' class='orange-butt'> OK </button>" + "</div>");
        }
    };
    
    function stopOverlayMessage() {
        $(".status-show").children().remove();
        $(".status-show").removeClass("message");
        $(".status-show").css("display", "none");
        $(".overlay").removeClass("white-bg").addClass("black-bg").fadeOut("fast");
        hideOverlayForm();
    };
    
        // AJAX
        
    $('form').submit(function () {
        var formID = $(this).attr('id'); 
        var formNum = $('#' + formID);
        var data =  formNum.serialize();
        $.ajax({
            type: 'POST',
            url: '../php/function.php', 
            data: data,
            beforeSend: function(data) { 
               formNum.find('button').attr('disabled', true);  
               $(".status-show").addClass("preloader");
               toCenter($(".preloader"), 50, 50);
               showOverlayMessage("<img src='../images/preload.gif' >");
        },
            success: function (data) { 
                $(".status-show").removeClass("preloader");
                showOverlayMessage(data);
                formNum.trigger('reset');
        },    
            error: function (xhr, errorThrown) { 
                $(".status-show").removeClass("preloader");
                showOverlayMessage("<p>Sorry, an error occurred." + xhr.status + errorThrown + "</p>"); 
        },
            complete: function(data) { 
                $(".status-show button").click( function(){
                    stopOverlayMessage();
                });
                formNum.find('button').prop('disabled', false);
        }
        });
        return false;
    });
    
});//jQuery end



