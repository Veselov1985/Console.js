window.onload= function () {


    var consol = this.consol = this.$$$ = (function () {


        function Console() {
            this.count=0;
            this.hash={class:"cont",height:'350px'};
        }


        Console.prototype.Close=function (num) {
            var del=document.getElementsByClassName('id'+(num-1))[0];

            del.parentNode.removeChild(del);
        };


        Console.prototype.CloseAll = function () {
             var numdel =this.count;
             for(var i=0;i<numdel;i++) {
                var del= document.getElementsByClassName('id'+i)[0];
                 del.parentNode.removeChild(del);

             }

               this.count=0;
        };


        Console.prototype.Create = function () {

            var body = document.getElementsByTagName('body')[0];

            var elem = document.createElement('div');
            elem.classList.add('id' + this.count);
            elem.classList.add('cont');

            var div1 = document.createElement('div');
            div1.classList.add('header');
            div1.classList.add('header'+this.count);
            var text = document.createElement('span');
            text.textContent = 'Console';


            var buttonrefresh = document.createElement('button');
            buttonrefresh.classList.add('back'+this.count);
            var buttonbuttom = document.createElement('button');
            buttonbuttom.classList.add('bottom'+this.count);
            var buttonright = document.createElement('button');
            buttonright.classList.add('right'+this.count);
            div1.appendChild(text);
            div1.appendChild(buttonrefresh);
            div1.appendChild(buttonbuttom);
            div1.appendChild(buttonright);

            var conteiner = document.createElement('div');
            conteiner.classList.add('container');
            conteiner.classList.add('container'+this.count);

            var textfield = document.createElement('textarea');
            conteiner.appendChild(textfield);

            var resizecont=document.createElement('div');
            resizecont.classList.add('resizecont'+this.count);
            resizecont.classList.add('resizecont');
            conteiner.appendChild(resizecont);
            elem.appendChild(div1);
            elem.appendChild(conteiner);


            body.appendChild(elem);

            var self=this;

            goEvent(self);





            function goEvent(self) {


                var buttons = document.getElementsByTagName('button');

                function getButtonClass(name, collection) {
                    var res = [].slice.call(collection).filter(function (val) {
                        return val.classList.contains(name);
                    });
                    return res[0];
                }



                function searchNumElemByClass(e) {
                    var target=e.target;
                    var cl = target.className;
                    cl = cl.replace(/\D/g, '');
                  return cl;


                };


                function clearOtherClass(val) {

                   var cont = document.getElementsByClassName('id'+val)[0];
                   cont.className='';
                   cont.className='id'+val


                };





                getButtonClass('right'+self.count, buttons).onclick = function (e) {


                  var numClass = searchNumElemByClass(e);

                  var target = document.getElementsByClassName('id'+numClass)[0];


                  // clear style
                    target. style.cssText='';
                    document.getElementsByClassName('container'+numClass)[0].style.cssText='';


                    if(target.classList.contains('contR')) return;

                    clearOtherClass(numClass);

                       target.classList.add('contR');

                    var heightContainer =ResizeWindow().height;
                    var z=document.querySelector('div.container.container'+numClass );

                    z.style.height= heightContainer-50+'px';


                };


                getButtonClass('bottom'+self.count, buttons).onclick = function (e) {
                    var numClass = searchNumElemByClass(e);

                    var target = document.getElementsByClassName('id'+numClass)[0];
                    target. style.cssText='';
                    document.getElementsByClassName('container'+numClass)[0].style.cssText='';
                    if(target.classList.contains('contbuttom')) return;

                    clearOtherClass(numClass);



                    target.classList.add('contbuttom');


                    var heightContainer =ResizeWindow().height/4;

                    var z=document.querySelector('div.container.container'+numClass );
                    z.style.height= heightContainer-50+'px';
                };


                getButtonClass('back'+self.count, buttons).onclick = function (e) {

                    var numClass = searchNumElemByClass(e);

                    var target = document.getElementsByClassName('id'+numClass)[0];
                    target. style.cssText='';
                    document.getElementsByClassName('container'+numClass)[0].style.cssText='';
                    if(target.classList.contains('cont')) return;

                    clearOtherClass(numClass);

                    target.classList.add(self.hash.class);
                   var z=document.querySelector('div.container.container'+numClass );
                 z.style.height= self.hash.height;

                };

                function ResizeWindow() {
                    return {
                        width:document.documentElement.clientWidth,
                        height:document.documentElement.clientHeight
                    }

                }




                // drag-n-drop




                function getCoords(elem) {
                    var box = elem.getBoundingClientRect();

                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    };


                }


                var elem1 = document.getElementsByClassName('header' + self.count)[0];
                var elem2 = document.getElementsByClassName('id' + self.count)[0];







                elem1.onmousedown = function (e) {
                    if(e.target.tagName=='BUTTON') return ;

                    var coords = getCoords(elem2);
                    var shiftX = e.pageX - coords.left;
                    var shiftY = e.pageY - coords.top;

                    elem2.style.position = 'absolute';
                    document.body.appendChild(elem2);
                    moveAt(e);

                    //  elem2.style.zIndex = 1000;

                    function moveAt(e) {
                        elem2.style.left = e.pageX - shiftX + 'px';
                        elem2.style.top = e.pageY - shiftY + 'px';
                    }

                    document.onmousemove = function (e) {
                        if(e.target.tagName=='BUTTON') return ;
                        magnet(elem2,e);
                        moveAt(e);
                    };

                    elem1.onmouseup = function (e) {
                        document.onmousemove = null;
                        elem1.onmouseup = null;
                        magnet(elem2,e);
                    };


                    elem1.ondragstart = function () {
                        return false;
                    };


                };





                // func  resize consol

                function getWidthHeight(elem) {
                    return {
                        width:elem.offsetWidth,
                        heigth:elem.offsetHeight

                    }

                }





                var resizeElem= document.getElementsByClassName('resizecont'+self.count)[0];
                var con =  document.getElementsByClassName('container'+self.count)[0];



                resizeElem.onmousedown = function (e) {
                    var count = getWidthHeight(elem2);
                    var container =getWidthHeight(con);
                    var oldPageY= e.pageY;
                    var oldPageX =e.pageX;




                    function moveAt(e) {

                        var controlWidth =   e.pageX -oldPageX+  count.width;
                        var controlHeight = e.pageY-oldPageY + count.heigth ;
                        if( controlHeight>90) elem2.style.height = controlHeight+ 'px';
                        if(controlWidth>150) elem2.style.width =controlWidth + 'px';
                        if( controlHeight>90)  con.style.height = e.pageY-oldPageY + container.heigth + 'px';
                        if(controlWidth>150)   con.style.width = e.pageX -oldPageX+ container.width + 'px';
                    }





                    document.onmousemove = function (e) {

                        moveAt(e);
                    };

                    resizeElem.onmouseup = function (e) {
                        var keyOnmouseup=true;
                        document.onmousemove = null;
                        resizeElem.onmouseup = null;


                    };



                };


                function magnet  (elem,e, getButtonClass) {

                    var widthWindow=ResizeWindow().width;
                    var heightWindow=Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                    );

                    var coords = elem.getBoundingClientRect();
                    var coord = [coords.right, coords.bottom];



                    if(widthWindow > +coord[0].toFixed() && +coord[0].toFixed() > widthWindow-5 ){
                        body.style.background='red';
                        if(e.type=='mouseup')   {
                            body.style.background='white';

                         document.getElementsByClassName('right'+searchNumElemByClass(e))[0].click();

                        }


                    }  else if(heightWindow > +coord[1].toFixed() && +coord[1].toFixed() >heightWindow-5) {

                        body.style.background='red';

                        if(e.type=='mouseup')   {
                            body.style.background='white';
                            document.getElementsByClassName('bottom'+searchNumElemByClass(e))[0].click();

                        }

                    } else {
                        body.style.background='white';
                    }




                }






            }






            this.count++;

        };

        var consol = new Console();

        return consol;


    })();
};





