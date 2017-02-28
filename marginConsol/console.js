window.onload= function () {


  function InitialStartState () {
var idBody = document.createElement('div');
idBody.setAttribute('id','scr_body');
document.body.appendChild(idBody);
return idBody;
  };

var startstate =    InitialStartState ();



    var consol = this.consol = this.$$$ = (function () {


        function Console() {
            this.count=0;
            this.id=[];
            this.body=startstate;

        }


        Console.prototype.Close=function (num) {
          var del=this.id[num-1];
          try{
            this.body.removeChild(del);
          } catch(e) {
            alert("no Console");
            return;
          }
           this.count--;
        };


        Console.prototype.CloseAll = function () {
             var alldel =this.id;
             for(var i=0;i<alldel.length;i++) {
                var del= alldel[i];
                try {   this.body.removeChild(del);
                } catch(e) {
                    console.log(e);
                    return;
                }


             }

               this.count=0;
        };


        Console.prototype.Create = function () {

              var self=this;

            function keyCreatorId () {

                    return ('_' + Math.random().toString(36).substr(2, 9));
            }


            var id =keyCreatorId ();






          function generateHtml(generateId) {




            function addDiv(elem) {
              return document.createElement(elem);
            }

            function addClass (elem,val) {
            elem.classList.add(val);

            }

            function addAttr (elem,name,val) {
              elem.setAttribute(name,val)

            }


            function appendEnd(father,children) {

                father.appendChild(children);

            }

            function createImg (url,alt,class1,class2) {

            var img = addDiv("img");
            addAttr(img,"src",url);
            addAttr(img,"alt",alt);
            addClass(img,class1);
             addClass(img,class2);
            return  img;

            }

            //create wrap div

            var div = addDiv("div");
            addClass(div,'win_sim');
            addAttr(div,"id",generateId);



            // create head console

            var win_head = addDiv("div");
            addClass(win_head,"win_head");
            win_head.textContent = "Console " +(self.count+1);



            //create icons content div
            var icons1 = addDiv("div");
            addClass(icons1,"icons1");



            // create icons1

            var img1 =createImg("icons/conp1.png","conp1","conp","norm1");

            appendEnd(icons1,img1);
            var img2 =createImg("icons/conp6.png","conp6","conp","down1");

            appendEnd(icons1,img2);
            var img3 =createImg("icons/conp4.png","conp4","conp","right1");

            appendEnd(icons1,img3);

            appendEnd(win_head, icons1);
            appendEnd(div,win_head);




            //create  console body

            var body = addDiv("div");
            addClass(body,"win_body");


            //create textarea


            var textarea = addDiv("textarea");
            addClass(textarea,"content_text");
            addAttr(textarea,"readonly","readonly");

            appendEnd(body,textarea);




            // create tabl

            var table =addDiv("table");
            addClass(table,"myTable");


            var tbody = addDiv("tbody");


            var tr = addDiv("tr");



            var td1 = addDiv("td");


            var input1 = addDiv("input");
            addAttr(input1,"type","text");
            addClass(input1,"inpLine");
            addAttr(input1,"value",">");
            addAttr(input1,"data-id",generateId);


            appendEnd(td1,input1);


            appendEnd(tr,td1);

            var td2 = addDiv("td");

            var divtable = addDiv("div");
            addClass(divtable,"enterBtn");

            appendEnd(td2,divtable);
            appendEnd(tr,td2);



            var td3 = addDiv("td");


            var divtable1 = addDiv("div");
            addClass(divtable1,"win_resize");

            appendEnd(td3,divtable1);
            appendEnd(tr,td3);
            appendEnd(tbody,tr);
            appendEnd(table,tbody);
             appendEnd(body,table);

             appendEnd(div,body);

             appendEnd (startstate,div);

             self.count++;

         self.id.push(div);

               return div;

             }


        var elem=generateHtml(id);



       function generateEvents (elem ) {

         var scr_b =startstate;
         var win = elem;
         var win_h =elem.children[0];
         var win_b = elem.children[1];
         var cont = elem.children[1].children[0];
         var win_inp = elem.children[1].children[1].children[0].children[0].children[0].children[0];
         var win_ok =elem.children[1].children[1].children[0].children[0].children[1].children[0];
         var size_changer = elem.children[1].children[1].children[0].children[0].children[2].children[0];
         var tabl = elem.children[1].children[1];
         var w_norm1 =elem.children[0].children[0].children[0];
         var w_right1 =elem.children[0].children[0].children[2];
         var w_down1 =elem.children[0].children[0].children[1];

         var CurrWinStyle = GetCurrStyle(win);
         var IsNorm = true,
             IsSided = false;

         WinCorrection();

         w_norm1.onclick = NormSide;
         w_down1.onclick = DownSide;
         w_right1.onclick = RightSide;

         function GetCurrStyle(from) {
             var tmp = {};

             tmp.top = from.getBoundingClientRect().top;
             tmp.left = from.getBoundingClientRect().left;
             tmp.height = from.getBoundingClientRect().height;
             tmp.width = from.getBoundingClientRect().width;

             return tmp;
         }

         function NormSide() {
             win.style.top = CurrWinStyle.top + 'px';
             win.style.left = CurrWinStyle.left + 'px';
             win.style.height = CurrWinStyle.height + 'px';
             win.style.width = CurrWinStyle.width + 'px';

             IsNorm = true;
             IsSided = false;

             WinCorrection();
         }

         function RightSide() {
             if (IsNorm) {
                 CurrWinStyle = GetCurrStyle(win);
                 IsNorm = false;
             }

             win.style.height = scr_b.offsetHeight + 'px';
             win.style.width = (scr_b.offsetWidth / 5) + 'px';
             win.style.left = (scr_b.offsetWidth - win.offsetWidth) + 'px';
             win.style.top = '0';
             win.style.right = '0';

             IsSided = true;
             IsNorm = false;

             WinCorrection();
         };

         function DownSide() {
             if (IsNorm) {
                 CurrWinStyle = GetCurrStyle(win);
                 IsNorm = false;
             }

             win.style.height = (scr_b.offsetHeight / 4) + 'px';
             win.style.top = (scr_b.offsetHeight - win.offsetHeight) + 'px';
             win.style.width = scr_b.offsetWidth + 'px';
             win.style.left = '0';

             IsSided = true;
             IsNorm = false;

             WinCorrection();
         }

         function FullSide() {
             if (IsNorm) {
                 CurrWinStyle = GetCurrStyle(win);
                 IsNorm = false;
             }

             win.style.top = '0';
             win.style.left = '0';
             win.style.height = scr_b.offsetHeight + 'px';
             win.style.width = scr_b.offsetWidth + 'px';

             IsSided = true;
             IsNorm = false;

             WinCorrection();
         }

         function WinCorrection() {
             win_b.style.width = win.offsetWidth + 'px';
             win_b.style.height = (win.offsetHeight - win_h.offsetHeight) + 'px';
             win_b.style.left = 0;
             win_inp.style.width = win_b.offsetWidth - (win_ok.offsetWidth + size_changer.offsetWidth) + 'px';
             cont.style.height = (win_b.offsetHeight - win_inp.offsetHeight) + 'px';
             cont.style.width = (win_b.offsetWidth - 4) + 'px';
         }

         win_h.onmousedown = function MouseWork(e) {
             var NewX, NewY;
             var maxX, maxY;
             var IsMove = false;
             var win_h_pos;

             FindXaY(e);

             document.ondragstart = function() {
                 return false;
             };

             function FindXaY(e) {
                 win_h_pos = win_h.getBoundingClientRect();
                 maxX = scr_b.getBoundingClientRect().width;
                 maxY = scr_b.getBoundingClientRect().height;

                 if (IsSided) {
                     NewX = Math.ceil(CurrWinStyle.width / 2);
                 } else NewX = e.pageX - win_h_pos.left;

                 NewY = e.pageY - win_h_pos.top;
             }

             function moveAt(e) {
                 win_h.style.cursor = 'move';

                 var newL = (e.pageX - NewX);
                 var newT = (e.pageY - NewY);

                 if (newL < 0) {
                     newL = 0;
                 } else if (newL > maxX - CurrWinStyle.width) {
                     newL = maxX - CurrWinStyle.width;
                 }

                 if (newT < 0) {
                     newT = 0;
                 } else if (newT > maxY - win.getBoundingClientRect().height) {
                     newT = maxY - win.getBoundingClientRect().height;
                 }

                 win.style.left = newL + 'px';
                 win.style.top = newT + 'px';

                 WinCorrection();
             }

             document.onmousemove = function(e) {
                 if (!IsMove) {
                     NormSide();
                     IsMove = false;
                 }
                 win_h.style.cursor = 'move';
                 moveAt(e);
             }

             document.onmouseup = function(e) {
                 document.onmousemove = null;
                 document.onmouseup = null;
                 win_h.style.cursor = 'default';

                 if (e.pageX >= scr_b.getBoundingClientRect().width - 3) {
                     IsNorm = false;
                     RightSide();
                 } else if (e.pageY >= scr_b.getBoundingClientRect().height - 3) {
                     IsNorm = false;
                     DownSide();
                 }

                 if (!IsSided) CurrWinStyle = GetCurrStyle(win);

                 IsMove = false;
             }
         }

         size_changer.onmousedown = function win_resize() {
             // -ms-user-select!!!

             if(IsSided) return;

             scr_b.style.cursor = 'se-resize';

             document.ondragstart = function() {
                 return false;
             };

             document.onmousemove = function(e) {
                 win.style.width = e.pageX - CurrWinStyle.left + Math.ceil(size_changer.offsetWidth / 2) + 'px';
                 win.style.height = e.pageY - CurrWinStyle.top + Math.ceil(size_changer.offsetHeight / 2) + 'px';

                 if (e.pageY >= scr_b.offsetHeight) win.style.height = scr_b.offsetHeight - GetCurrStyle(win).top + 'px';
                 if (e.pageX >= scr_b.offsetWidth) win.style.width = scr_b.offsetWidth - GetCurrStyle(win).left + 'px';

                 WinCorrection();
             }

             document.onmouseup = function(e) {
                 document.onmousemove = null;
                 document.onmouseup = null;

                 CurrWinStyle = GetCurrStyle(win);
                 scr_b.style.cursor = 'auto';
             }
         }




// -----------------------------------------------------------------------------------------

var outp =cont;
var inp = win_inp;
var acc = win_ok;

inp.onkeyup = function (e) {
	// e = e || window.event;
	if (e.keyCode === 13) {
		consWork(inp);
	}
	// Отменяем действие браузера
	return false;
}

acc.onclick = function() {
	consWork(inp);
}

function consWork(obj) {
	var command = obj.value;
	if(command===''||command===' ') return;
	else if(command === ">clc") outp.value = '';
	else outp.value+=(command + '\n');
	obj.value = '>';
}






//----------------------------------------------------------------------




       }


     generateEvents (elem) ;






        };

        var consol = new Console();

        return consol;


    })();
};
