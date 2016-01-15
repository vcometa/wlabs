/**
driving.fe v.05
author: virgilio cometa
date: Jan 2016
**/
var driving = driving ||{};
driving.fe =  driving.fe ||{};
driving.fe.quiz = driving.fe.quiz ||{};

driving.fe.quiz = (function(){
  var qRoot = new Object(),
    qHolder = null,
    
    processResult = function(){
        qRoot.score = 0;
        
        $.each(qRoot.tallyArr, function(i,val){
            qRoot.score += parseFloat(qRoot.tallyArr[i]);
        });
        
        var rTitle = '',
            rText = '',
            rImgSrc = '',
            shareURL = '';
        
        $.each(qRoot.rresults, function(i,result){
            var node = qRoot.rresults[i];
            if(qRoot.rtype == 'range'){
                if(qRoot.score >= node.min && qRoot.score <= node.max){
                    rTitle = node.title;
                    rText = node.text;
                    rImgSrc = node.imgsrc;
                    shareURL = qRoot.qurl+'?quizid='+qRoot.id+'&quiz-result='+node.sharetext;
                }
            }else{
                rTitle = qRoot.tresult.title+qRoot.score;
                rText = qRoot.tresult.text;
                rImgSrc = qRoot.tresult.imgsrc;
                shareURL = qRoot.qurl+'?quizid='+qRoot.id+'&quiz-result='+qRoot.score;
            }
        });
        
        qRoot.shareurl.text("SHARE: "+shareURL);
        
        var sHeader =  $('<h2>',{'class':'quiz-result-h2'}).text( rTitle ),
            sText = $('<p>', {'class':'quiz-result-p'}).text(rText),
            sImg = $('<img>',{'class':'quiz-result-img','src':rImgSrc});
        
        
        if( qRoot.score > 0){
            qRoot.result.addClass('active');
            qRoot.resultContent.prepend(sHeader,sImg,sText);
            qRoot.nav.removeClass('active');
            qRoot.retry.addClass('active');
            if( qRoot.ftype == 'list'){
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            }
        }else{
            qRoot.submit.removeClass('active');
            qRoot.retry.removeClass('active');
        }
    },
    
    moveList = function(d){
        var qWidth = qHolder.width();
            scrollLimit = (qRoot.length-1)*qWidth,
            xOffset = qWidth*d;
            
        qRoot.left = qRoot.left + xOffset;
        
        if(scrollLimit <= Math.abs(qRoot.left) ){
            if(d<0){
                xOffset = 0;
                qRoot.next.removeClass('active');
                qRoot.submit.addClass('active');
            }
        }else{
            qRoot.submit.removeClass('active');
            if(qRoot.left==0 && d>0){
                xOffset = 0;
                qRoot.previous.removeClass('active');
            }else{
                if(!qRoot.next.hasClass('active')){
                    qRoot.next.addClass('active');
                }
                if(!qRoot.previous.hasClass('active')){
                    qRoot.previous.addClass('active');
                }
            }
        }
        
        qRoot.list.css({
                '-webkit-transform':'translate3D('+qRoot.left+'px, 0px, 0px)',
                '-moz-transform':'translate3D('+qRoot.left+'px, 0px, 0px)',
                '-o-transform':'translate3D('+qRoot.left+'px, 0px, 0px)',
                'transform':'translate3D('+qRoot.left+'px, 0px, 0px)',
              });
    },
    
    retryQuiz = function(){
        qRoot.ctrls.prop('checked', false);
        qRoot.previous.removeClass('active');
        qRoot.submit.removeClass('active');
        qRoot.retry.removeClass('active');
        qRoot.result.removeClass('active');
        qRoot.optItems.removeClass('active');
        qRoot.nav.addClass('active');
        qRoot.next.addClass('active');
        qRoot.tallyArr = {};
        qRoot.score = 0;
        qRoot.left = 0;
        qRoot.resultContent.empty();
        qRoot.list.css({
                '-webkit-transform':'translate3D(0px, 0px, 0px)',
                '-moz-transform':'translate3D(0px, 0px, 0px)',
                '-o-transform':'translate3D(0px, 0px, 0px)',
                'transform':'translate3D(0px, 0px, 0px)',
              });
    },
    
    processClick = function(){
        
        qRoot.ctrls.on('click', function() {
            var ctrl = $(this),
                q = ctrl.data('question').toString(),
                ancestor = ctrl.parent().parent();
            qRoot.tallyArr[q] = ctrl.val();
            if(qRoot.itype=='radio'){
                ancestor.siblings().removeClass('active');
                ancestor.addClass('active');
            }else{
                if(ancestor.hasClass('active')){
                    ancestor.removeClass('active');
                }else{
                    ancestor.addClass('active');
                }
            }
            
        });
        qRoot.submit.on('click',function(){
            processResult();
        });
        qRoot.next.on('click',function(){
            moveList(-1);
        });
        qRoot.previous.on('click',function(){
            moveList(1);
        });
        qRoot.retry.on('click',function(){
            retryQuiz();
        });
    },
    
    InitializeVars = function(q){
        qHolder = $('.quiz');
        qRoot.id = q.quiz.id;
        qRoot.rresults = q.quiz.rangeresults;
        qRoot.ftype = q.quiz.formattype;
        qRoot.qtype = q.quiz.quiztype;
        qRoot.itype = q.quiz.inputtype;
        qRoot.rtype = q.quiz.resulttype;
        qRoot.titleTxt = q.quiz.title;
        qRoot.questiontype = q.quiz.questiontype;
        qRoot.tresult = q.quiz.tallyresult;
        qRoot.qurl = q.quiz.quizurl;
        qRoot.body = $('#'+qRoot.id);
        qRoot.title = $( qRoot.body.find('.quiz-title'));
        qRoot.list = $( qRoot.body.find('.quiz-list'));
        qRoot.optItems = $( qRoot.body.find('.option-list-item'));
        qRoot.nav = $( qRoot.body.find('.quiz-nav'));
        qRoot.ctrls = $( qRoot.body.find('input') );
        qRoot.result = $( qRoot.body.find('.quiz-result'));
        qRoot.resultContent = $( qRoot.body.find('.quiz-result-content'));
        qRoot.shareurl = $( qRoot.body.find('.share-url'));
        qRoot.submit = $( qRoot.body.find('.quiz-submit'));
        qRoot.retry = $( qRoot.body.find('.quiz-retry'));
        qRoot.next = $( qRoot.body.find('.quiz-next'));
        qRoot.previous = $( qRoot.body.find('.quiz-previous'));
        qRoot.tallyArr = {};
        qRoot.score = 0;
        qRoot.left = 0;
        qRoot.length = qRoot.list.children().length;
    },
    
    loadUI = function(){
        qRoot.body.addClass('format-'+qRoot.ftype)
    },
    Init = function(q){
        InitializeVars(q);
        loadUI();
        processClick();
  };
  return{
    Init:Init
  };
})();