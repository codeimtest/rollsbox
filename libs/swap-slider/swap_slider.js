(function ( $ ) {

    $.swapSlider = function(selector,params = {center_width:50,step_width:8,step_pos:8,time:400}){
        let CENTER_WIDTH = params.center_width ?? 50;
        let STEP_WIDTH = params.step_width ?? 8;
        let STEP_POS = params.step_pos ?? 8;
        let CENTER_POS = (100 - CENTER_WIDTH) / 2;
        let ANIM_TIME = params.time ?? 400;
        $(selector).addClass("swap-slider_wrapper");
        let $sliders = $(selector+" > *");
        $sliders.addClass("swap-slider_slide");
        let sliders_count = $sliders.length;
        if(sliders_count % 2 != 1){
            $sliders.last().remove();
            sliders_count--;
        }
        let center_index = parseInt(sliders_count / 2);
        $sliders.eq(center_index).css({
            'width':CENTER_WIDTH + '%',
            'z-index':1000,
            'left':CENTER_POS + '%'
        });


        for(let i = 1; i <= sliders_count / 2; i++){
            $sliders.eq(center_index - i).css({
                'width':CENTER_WIDTH - i*STEP_WIDTH + '%',
                'z-index':1000 - i,
                'left':CENTER_POS - i*STEP_POS + '%'
            });
            $sliders.eq(center_index + i).css({
                'width':CENTER_WIDTH - i*STEP_WIDTH + '%',
                'z-index':1000 - i,
                'left':(100 - (CENTER_POS - i*STEP_POS) - (CENTER_WIDTH - i*STEP_WIDTH)) + '%'
            });
        }
        $sliders.each(function(i){
            $(this).attr("data-index",i);
        })
        $(selector).css({'height':$sliders.eq(center_index).height()});
        setTimeout(function (){
            $(selector).css({'height':$sliders.eq(center_index).height()});
        },150);
        $(window).resize(function(){
            $(selector).css({'height':$(selector+" > [data-index="+center_index+"]").height()});
        });

        $sliders.click(function(e){
            let clicked_index = $(this).attr("data-index");
            let center_dist = Math.abs(clicked_index - center_index);
            if(center_dist == 0)return;
            $(this).css('z-index',1005);
            $(this).animate({
                'width':CENTER_WIDTH + '%',
                'left':[CENTER_POS + '%',$.bez([0,-2.5/center_dist,1,.78])],
                'z-index':1000
            },ANIM_TIME*1.2);
            $(selector+" > [data-index="+center_index+"]").animate({'z-index':1000 - center_dist},{duration:ANIM_TIME*center_dist / 4,queue: false});
            if(clicked_index > center_index){
                $(selector+" > [data-index="+center_index+"]").animate({
                    'width':CENTER_WIDTH - center_dist*STEP_WIDTH + '%',
                    'left':(100 - (CENTER_POS - center_dist*STEP_POS) - (CENTER_WIDTH - center_dist*STEP_WIDTH)) + '%',
                    'z-index':1000 - center_dist
                },ANIM_TIME*center_dist);
            }else{

                $(selector+" > [data-index="+center_index+"]").animate({
                    'width':CENTER_WIDTH - center_dist*STEP_WIDTH + '%',
                    'left':CENTER_POS - center_dist*STEP_POS + '%',
                    'z-index':1000 - center_dist
                },ANIM_TIME*center_dist);
            }
            $(selector+" > [data-index="+center_index+"]").attr('data-index',clicked_index);
            $(this).attr('data-index',center_index);




        })

    }


}( jQuery ));



/*!
 * Bez @VERSION
 * http://github.com/rdallasgray/bez
 *
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 *
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 *
 * Copyright @YEAR Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
 */
(function(factory) {
    if (typeof exports === "object") {
        factory(require("jquery"));
    } else if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function($) {
    $.extend({ bez: function(encodedFuncName, coOrdArray) {
            if ($.isArray(encodedFuncName)) {
                coOrdArray = encodedFuncName;
                encodedFuncName = 'bez_' + coOrdArray.join('_').replace(/\./g, 'p');
            }
            if (typeof $.easing[encodedFuncName] !== "function") {
                var polyBez = function(p1, p2) {
                    var A = [null, null], B = [null, null], C = [null, null],
                        bezCoOrd = function(t, ax) {
                            C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
                            return t * (C[ax] + t * (B[ax] + t * A[ax]));
                        },
                        xDeriv = function(t) {
                            return C[0] + t * (2 * B[0] + 3 * A[0] * t);
                        },
                        xForT = function(t) {
                            var x = t, i = 0, z;
                            while (++i < 14) {
                                z = bezCoOrd(x, 0) - t;
                                if (Math.abs(z) < 1e-3) break;
                                x -= z / xDeriv(x);
                            }
                            return x;
                        };
                    return function(t) {
                        return bezCoOrd(xForT(t), 1);
                    }
                };
                $.easing[encodedFuncName] = function(x, t, b, c, d) {
                    return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t/d) + b;
                }
            }
            return encodedFuncName;
        }});
}));