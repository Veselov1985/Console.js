window.onload= function () {


    var consol = this.consol = this.$$$ = (function () {


        function Console() {
            this.count=0;
            this.id=[];
            this.hash={class:"cont",height:'350px'};
        }


        Console.prototype.Close=function (num) {
            var del=document.getElementById(this.id[num-1]);

           document.body.removeChild(del);
        };


        Console.prototype.CloseAll = function () {
             var alldel =this.id;
             for(var i=0;i<alldel.length;i++) {
                var del= document.getElementById(alldel[i]);
                try {  document.body.removeChild(del);
                } catch(e) {

                    console.log(e)
                }


             }

               this.count=0;
        };


        Console.prototype.Create = function () {

            function keyCreatorId () {

                    return ('_' + Math.random().toString(36).substr(2, 9));


            }


            var id =keyCreatorId ();
            this.id.push(id);

            var body = document.body;
            var elem = document.createElement('div');
            elem.setAttribute('id',id);
            elem.classList.add('cont');
            var div1 = document.createElement('div');
            div1.classList.add('header_consol');
            var text = document.createElement('span');
            text.textContent = 'Console '+(this.count+1);
            var buttonrefresh = document.createElement('button');
            buttonrefresh.classList.add('back_console');
            var buttonbuttom = document.createElement('button');
            buttonbuttom.classList.add('bottom_console');
            var buttonright = document.createElement('button');
            buttonright.classList.add('right_console');
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
            resizecont.classList.add('resizecont');
            conteiner.appendChild(resizecont);
            elem.appendChild(div1);
            elem.appendChild(conteiner);

            body.appendChild(elem);

            var self=this;

            goEvent(elem,self);



            function goEvent(elem) {

               function searchButton() {

                   var tree= elem.children[0].children;
                   var buttons=[].slice.call(tree).slice(1);
                   return buttons;

               }


               function searchContainer() {

                 return  elem.children[1];

               }

                function clearOtherClass() {

                    elem.className='';


                }



                function searchHeader() {
                   return elem.children[0];

                }


                function searchResizeElement () {
                 return  elem.children[1].children[1];

                }



               var buttons=searchButton();
               var container =searchContainer();
                var header = searchHeader();
                 var resizeElement= searchResizeElement();









                   //buttom right said

                buttons[2].onclick = function (e) {


                 // clear style
                 elem. style.cssText='zindex:100';
                 container.style.cssText='';

                 if(elem.classList.contains('contR')) return;

                 clearOtherClass(elem);

                 elem.classList.add('contR');

                 var heightContainer =ResizeWindow().height;

                 container.style.height= heightContainer-50+'px';


                 };


                //button buttom side


                buttons[1].onclick = function (e) {

                 elem. style.cssText='zindex:100';
                 container.style.cssText='';
                 if(elem.classList.contains('contbuttom')) return;
                 clearOtherClass(elem);
                 elem.classList.add('contbuttom');
                 var heightContainer =ResizeWindow().height/4;
                 container.style.height= heightContainer-50+'px';
                 elem.focus();
                 };



                //button back


                buttons[0].onclick = function (e) {



                 elem. style.cssText='zindex:100';
                container.style.cssText='';
                 if(elem.classList.contains('cont')) return;
                 clearOtherClass(elem);
                 elem.classList.add(self.hash.class);
                 container.style.height= self.hash.height;

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




                 header.onmousedown = function (e) {
                 if(e.target.tagName=='BUTTON') return ;

                 var coords = getCoords(elem);
                 var shiftX = e.pageX - coords.left;
                 var shiftY = e.pageY - coords.top;
                 elem.style.position = 'absolute';
                 document.body.appendChild(elem);
                 moveAt(e);

                 //  elem2.style.zIndex = 1000;

                 function moveAt(e) {
                 elem.style.left = e.pageX - shiftX + 'px';
                 elem.style.top = e.pageY - shiftY + 'px';
                 }

                 document.onmousemove = function (e) {
                 if(e.target.tagName=='BUTTON') return ;
                 magnet(e);
                 moveAt(e);
                 };
                 header.onmouseup = function (e) {
                 document.onmousemove = null;
                 header.onmouseup = null;
                 magnet(e);
                 };


                 header.ondragstart = function () {
                 return false;
                 };


                 };





                 // func-s  resize consol

                 function getWidthHeight(elem) {
                 return {
                 width:elem.offsetWidth,
                 heigth:elem.offsetHeight
                 }
                 }



                resizeElement.onmousedown = function (e) {
                 var count = getWidthHeight(elem);
                 var conta =getWidthHeight(container);
                 var oldPageY= e.pageY;
                 var oldPageX =e.pageX;




                 function moveAt(e) {

                 var controlWidth =   e.pageX -oldPageX+  count.width;
                 var controlHeight = e.pageY-oldPageY + count.heigth ;
                 if( controlHeight>90) elem.style.height = controlHeight+ 'px';
                 if(controlWidth>157) elem.style.width =controlWidth + 'px';
                 if( controlHeight>90)  conteiner.style.height = e.pageY-oldPageY + conta.heigth + 'px';
                 if(controlWidth>157)   container.style.width = e.pageX -oldPageX+ conta.width + 'px';
                 }





                 document.onmousemove = function (e) {

                 moveAt(e);
                 };

                    resizeElement.onmouseup = function (e) {
                   document.onmousemove = null;
                    resizeElement.onmouseup = null;


                 };



                 };



                function magnet  (e) {

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

                 buttons[2].click();

                 }


                 }  else if(heightWindow > +coord[1].toFixed() && +coord[1].toFixed() >heightWindow-5) {

                 body.style.background='red';

                 if(e.type=='mouseup')   {
                 body.style.background='white';
                 buttons[1].click();

                 }

                 } else {
                 body.style.background='white';
                 }



              }



               // activ window consol









                function activWindow(elem,self) {
                    console.log( elem.style.opacity=="");
                   if(elem.style.opacity==1) return;


                    //search  textarea

                    function searchTextarea(elem) {
                      return  elem.children[1].children[0];

                    }


                    console.log( searchTextarea(elem));
                   var textArea= searchTextarea(elem);

                    textArea.focus();

                   setTimeout(function () {
                    searchTextarea(elem).focus();
                   // console.log('time', searchTextarea(elem));
                   },100);




                    self.id.forEach(function (val) {
                        if (val == elem.getAttribute('id')) return;
                        var elems= document.getElementById(val);
                       if(elems.style.opacity==0.7) return;
                       elems.style.opacity=0.7;
                       elems.style.zIndex=-1;
                    });

                    elem.style.opacity=1;
                    elem.style.zIndex=1;

                }




               activWindow(elem,self);




                body.onmousedown =function (e) {

                    var target = e.target;

                    while(target!=body) {
                        if(target.classList.contains('cont') ||target.classList.contains('contR') || target.classList.contains('contbuttom') )   {
                            activWindow(target,self);
                            return;

                        }
                        target=target.parentNode;
                    }


                }

                 }











            this.count++;

        };

        var consol = new Console();

        return consol;


    })();
};









