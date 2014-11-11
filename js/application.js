var Status = {
  // just a normal guy
  NORMAL: 0,
  // lucky guy
  LUCKY: 1,
  // lucky guy, but he has leaved
  LUCKY_BUT_LEAVED: 2,
};

var status_to_string = function(status){
  switch (status) {
  case Status.NORMAL:
    return '-';
  case Status.LUCKY:
    return '中奖';
  case Status.LUCKY_BUT_LEAVED:
    return '离开';
  }
}

var lucky = (function(){

    this.speed = 50;
    this.intervalID;
    this.localdata = "";

    this.luckyindex = 0;
    this.luckyname = "开始抽奖";

    this.init = function(data){
        this.localdata = data;
        $("#lucky-name").text(this.luckyname);

<<<<<<< HEAD
  this.import_data = function(tickets) {
    db.transaction(function (tx) {
      for (i=0; i< tickets.length; i++)
        tx.executeSql('REPLACE INTO names (name, status) VALUES (?, 0)', [ tickets[i] ]);
    });
  }

  this.showAllTickets = function(){
    $('#tickets').empty();
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM names ORDER BY status ASC', [], function (tx, results) {
        var len = results.rows.length, i, ticket;
        for (i = 0; i < len; i++){
          ticket = results.rows.item(i);
          $('#tickets').append('<tr><td>'+ticket.name+'</td><td>'+ status_to_string(ticket.status)+'</td></tr>');
        }
      });
    });
  }

  this.showLuckyNames = function(){
    $('#lucky-names').empty();
    db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM names WHERE status = 1', [], function (tx, results) {
        var len = results.rows.length, i;
        $('#lucky-count').text('(' + len + ')');
        for (i = 0; i < len; i++)
          $('#lucky-names').append('<li>'+results.rows.item(i).name+'</li>');
      });
    });
  }

  this.rolling = function(){
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM names WHERE status = 0', [], function (tx, results) {
        var i = rand(results.rows.length+1);
        var name = results.rows.item(i-1).name;
        $('#random').text(name);
      });
    });
  }
=======
        this._bindUI();
    };
>>>>>>> 55b7af18009f5bb10a746096d5820c84c4188e6d

    this.rolling = function(){

<<<<<<< HEAD
  this.stopRolling = function() {
    clearInterval(this.intervalID);

    var name = $('#random').text();

    var status = Status.LUCKY;

    $('#lucky-confirm-name').text(name);
    $('#simplemodal-container').css({'height':'auto', 'width': 'auto'});
    $('#lucky-confirm-popup').modal({appendTo:'body'});
  };
  
  this.setNameStatus = function(name, status) {
    db.transaction(function(tx) {
      tx.executeSql("UPDATE names SET status=? WHERE name = ?", [status, name], function (tx, results) {
        this.showLuckyNames();
        this.showAllTickets();
      });
    });
  }
=======
            var i = rand(this.localdata.length+1);
            var name = this.localdata[i-1];

            this.luckyindex = i-1;
            this.luckyname = name;
>>>>>>> 55b7af18009f5bb10a746096d5820c84c4188e6d

            $("#lucky-name").text(name);
    };

    this.startRolling = function(){
        
        this.intervalID = setInterval(this.rolling, this.speed);
    };

<<<<<<< HEAD
  $('#lucky-draw').height(Math.max($(window).height(), $('#lucky-draw').height()));

  lucky.initDB();
  lucky.showLuckyNames();
  lucky.showAllTickets();

  //点击body时，隐藏日期控件
  $('body').bind('keydown', function(e){
    var k = e.which || e.keyCode;
    if(k == 32){
      $('#lucky-button').click();
      return false;
    }
  });

  $('body').delegate('#import-button', 'click', function(event){
    var list_str = $('#data-source').val();
    var names = [];
    var list_lines = list_str.split("\n");
    for (var i = 0; i < list_lines.length; i++) {
      var name = $.trim(list_lines[i]);
      if (name != "") names.push(name);
    }
    lucky.import_data(names);
    lucky.showAllTickets();
  });

  $('body').delegate('#clear-data-button', 'click', function(event){
    lucky.clearDB();
    lucky.showLuckyNames();
    lucky.showAllTickets();
  });

  $('#lucky-button').toggle(
    function(){
      $(this).val('停 止');
      lucky.startRolling();
    },
    function(){
      $(this).val('开 始');
      lucky.stopRolling();
    }
  );
  
  $('#lucky-confirm-yes').click(function(event) {
    var name = $('#lucky-confirm-name').text();
    lucky.setNameStatus(name, Status.LUCKY);
  });

  $('#lucky-confirm-no').click(function(event) {
    var name = $('#lucky-confirm-name').text();
    lucky.setNameStatus(name, Status.LUCKY_BUT_LEAVED);
  });

});
=======
    this.stopRolling = function(){
        clearInterval(this.intervalID);
        this.showLucky();
    };

    this.showLucky = function(){
        var luckyname = $("#lucky-name").text();
        $("#lucky-list").append('<span>'+luckyname+"</span>");

        this.localdata.splice(this.luckyindex, 1);
    };

    this._bindUI = function(){

        // bind button
        var trigger = document.querySelector('#go');
        trigger.innerHTML = trigger.getAttribute('data-text-start');
        trigger.addEventListener('click', go, false);

        function go() {
            if (trigger.getAttribute('data-action') === 'start') {
              trigger.setAttribute('data-action', 'stop');
              trigger.innerHTML = trigger.getAttribute('data-text-stop');
              startRolling();
            }
            else {
              trigger.setAttribute('data-action', 'start');
              trigger.innerHTML = trigger.getAttribute('data-text-start');
              stopRolling();
            }
        }

        // bind keydown
        document.addEventListener('keydown', function(ev) {
            if (ev.keyCode == '32') {
              go();
            }
            else if (ev.keyCode == '27') {
              that.moveLucky();
            }
        }, false);
    };

    return this;
})();

$(function(){
    lucky.init(data);
	$(".sponsors .unslider").unslider({
        speed: 500,
        delay: 3000
    });
	//点击变色
	$("#lucky-list").on("click" ,"span", function(){
		var $self = $(this);
		$(this).addClass("red")
/*				.siblings().removeClass("red");*/
	});
    $("#lucky-list").on("dblclick", "span", function(){
        var $self = $(this);
        $(this).removeClass("red");
    });
    /*$("#diamond").unslider({
		complete: function(){
		}
	});
    $("#platinum").unslider();
    $("#gold").unslider();
    $("#silver").unslider();
    $("#bronze").unslider();
    $("#partner").unslider();*/
    
    

});
/*$('#gold').carousel({
        showSurrounding: true 
        //是否显示周围的区域，不设置则默认为false，个别需要显示旁边元素显示美化效果的需求时用到，如百度相册首页就有这样的效果
        ,reverse:true //自动动画方向，不设置则默认为向右（false），设置为true则相反
        ,interval: 1 //自动播放的间隔时间（秒），不设置则默认是5（秒）
        ,speed: 0.2 //滚动一次需要的时间(秒)，不设置则默认是0.6（秒）
        ,indicatorPosition: 'top' //指示器（小圆点）的位置（top，bottom），不设置则默认是bottom
        ,indicatorAlign: 'right' //指示器水平位置（left，center，right），不设置则默认是center
    });*/
>>>>>>> 55b7af18009f5bb10a746096d5820c84c4188e6d
