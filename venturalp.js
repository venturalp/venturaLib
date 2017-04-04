$.fn.venturaTabs = function (obj, stayOpened, accordion) {

    //EXEMPLO DE USO

    //    $.fn.venturaTabs({
    //        classButtons: "btnsCliente",
    //        classOpen: "btnsClienteOpen",
    //        classBox: "boxClientes"
    //    });

    //<div [CONTAINER DAS TABS]>
    //    <div [LINHA DE TABS]>
    //        <div [BOTÕES DA LINHA DE TABS]>
    //            <div [AQUI É USADA A PROPRIEDADE "classButtons"]>content</div>
    //            <div [AQUI É USADA A PROPRIEDADE "classButtons"]>content</div>
    //            <div [AQUI É USADA A PROPRIEDADE "classButtons"]>content</div>
    //            <div [AQUI É USADA A PROPRIEDADE "classButtons"]>content</div>            
    //        </div>
    //            
    //        [CONTEÚDO DAS TABS, SEGUEM A ORDEM CORRESPONDENTE DAS TABS]    
    //        <div [aqui é usada a propriedade "classBox"]></div>
    //        <div [aqui é usada a propriedade "classBox"]></div>
    //        <div [aqui é usada a propriedade "classBox"]></div>
    //        <div [aqui é usada a propriedade "classBox"]></div>        
    //    </div>
    //</div>

    $("." + obj.classButtons).each(function ($index) {
        if ($index == 0 && stayOpened) {
            $("." + obj.classBox).eq($(this).index()).slideToggle(100);
            $(this).toggleClass(obj.classOpen);
        }

        $(this).click(function () {

            //IDENTIFICA SE A TAB CLICADA JÁ ESTÁ ABERTA
            var aux = $(this).hasClass(obj.classOpen);

            //TROCA O ESTILO DE TODAS AS DEMAIS TABS        
            $("." + obj.classButtons).removeClass(obj.classOpen);
            //COLOCA A CLASSE ATIVA PARA A TAB CLICADA
            $(this).toggleClass(obj.classOpen);
            //FECHA O CONTEÚDO DE TODAS AS DEMAIS TABS
            $("." + obj.classBox).each(function () {
                if ($(this).css("display") != "none") {
                    if (accordion)
                        $(this).slideToggle(100);
                    else
                        $(this).hide();
                }
            });

            //ABRE O CONTEÚDO DA TAB CLICADA
            if (!aux)
                $("." + obj.classBox).eq($index).slideToggle(100);

            //CASO A TAB CLICADA JÁ ESTEJA ABERTA, FECHA ELA E REMOVE A CLASSE ATIVA
            if (aux && !stayOpened) {
                $(this).removeClass(obj.classOpen);
            }
        });
    });
};


jQuery.fn.slideClick = function (obj, spanOver, fade) {
    //Deixa apenas o texto da tecnologia 1 visÃ­vel
    $(obj.divInfo).each(function (index) {
        if (index != 0) $(this).hide();
    });

    $(obj.divOver).each(function (index) {
        if (index == 0) {
            $(this).addClass(obj.active);
            if (spanOver) $(this).find("span").hide();
        }

        //Muda de tecnologia quando o mouse passa em cima
        $(this).click(function () {
            $(obj.divOver).each(function (j) {
                if (j == index) {
                    if (spanOver) {
                        if (fade)
                            $(this).find("span").fadeOut(300);
                        else
                            $(this).find("span").hide();
                    }
                    $(this).addClass(obj.active);
                } else {
                    if (spanOver) {
                        if (fade)
                            $(this).find("span").fadeIn(300);
                        else
                            $(this).find("span").hide();
                    }
                    $(this).removeClass(obj.active);
                }
            });
            $(obj.divInfo).each(function (i) {
                if (i == index) {
                    if (obj.display) {
                        if (fade)
                            $(this).fadeIn(300).css("display", obj.display);
                        else
                            $(this).show().css("display", obj.display);
                    } else {
                        if (fade)
                            $(this).fadeIn(300);
                        else
                            $(this).show();
                    }
                } else {
                    $(this).hide();
                }
            });
        });
    });
};

//Verifica se um elemento está interamente visível na viewport
$.fn.isFullVisible = function () {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight() + $(this).height();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - ($(this).height() < $(window).height() ? $(this).height() : 0);

    return elementBottom > viewportTop && elementTop < viewportBottom;
};


//Plugin para parallax de backgrounds
$.fn.parallaxBg = function (settings) {
    var $lastScroll = $(window).scrollTop();
    var $initScroll = $(window).scrollTop();

    if (settings == undefined)
        settings = Object;

    //Define se o elemento precisa estar totalmente visível em tela ou não para começar a scrollar
    if (settings.visible == undefined)
        settings.visible = false;

    //Define a direção do movimento do BG, quando true imagem sobe
    if (settings.naturalFlow == undefined)
        settings.naturalFlow = true;

    //Define a velocidade de movimentação do BG
    if (settings.speed == undefined)
        settings.speed = 25;

    var $obj = $(this);
    var yOri = parseInt($obj.css("background-position-y").replace("px", ""));

    $(window).scroll(function () {
        //Calcula a posição Y atual do BG
        var yAux = parseInt($obj.css("background-position-y").replace("px", ""));
        //Verifica a direção em que a tela está scrollando
        var direct = 0;
        if (settings.naturalFlow)
            direct = ($lastScroll - $(window).scrollTop()) > 0 ? -1 : 1;
        else
            direct = ($lastScroll - $(window).scrollTop()) > 0 ? 1 : -1;


        var flagMove = false
        //Aqui é onde a movimentação acontece, para objetos menores é possível seta se quer que ocorra apenas quando totalmente visívels (settings.visible)
        if (settings.visible) {
            if ($obj.isFullVisible())
                flagMove = true;
        } else {
            flagMove = true;
        }

        if (flagMove && (yAux - (direct * settings.speed) <= 0))
            $obj.css("background-position-y", (yAux - (direct * settings.speed) + "px"));

        $lastScroll = $(window).scrollTop();
        //Verifica se voltou para a posição inicial e reposiciona
        if ($lastScroll == $initScroll)
            $obj.css("background-position-y", yOri + "px");
    });
}
