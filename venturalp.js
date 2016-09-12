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
                    if (spanOver){
                        if (fade)
                            $(this).find("span").fadeOut(300);
                        else
                            $(this).find("span").hide();
                    }
                    $(this).addClass(obj.active);
                } else {
                    if (spanOver){
                        if(fade)
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
                    }
                    else {
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