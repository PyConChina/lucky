$(function(){

    var read_file = function(file, load_data_function){
        if(!file) return;
        var reader = new FileReader();
        var filename = file.name;
        if (/text\/\w+/.test(file.type)) {
            reader.onload = function() {
                load_data_function(this.result);
            };
            reader.readAsText(file);
            console.log("processed " + filename);
        }
    };

    var load_donators = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "姓名,邮件,昵称"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        var donator_emails = []
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var email = parts[1] && parts[1].trim();
            if(email && email != ""){
                donator_emails.push(email);
            }
        }
        store.set("checkin_donator_emails", donator_emails.join("|"));
    };

    var load_sponsors = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "手机号,来源,计划参会城市"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var ticket = {
                'number' : parts[0], // phone number as check-in number
                'tickets' : "1 x 赞助商赠票",
                'name' : parts[1],  // 来源作为用户名
                'email' : parts[0], // phone number as email
                'type' : 'sponsor',
                'checked' : 0,
            };
            var number = ticket['number'] && ticket['number'].trim();
            if(number && number != ""){
                store.set("checkin_ticket_" + number, ticket);
            }
        }
    };

    var load_tickets = function(text_content){
        var lines = text_content.split("\r\n");
        var FORMAT = "签到码,门票,姓名,Email"; // 数据格式
        if(lines.length < 1 || lines[0].trim() != FORMAT){
            console.error("文件格式错误");
        }
        for(var i = 1; i < lines.length; i++){
            var parts = lines[i].trim().split(",");
            var ticket = {
                'number' : parts[0],
                'tickets' : parts[1],
                'name' : parts[2],
                'email' : parts[3],
                'type' : 'normal',
                'checked' : 0,
            };
            var number = ticket['number'] && ticket['number'].trim();
            if(number && number != ""){
                store.set("checkin_ticket_" + number, ticket);
            }
        }
    };

    var export_checked = function() {
        var length = store.size();
        var lines = ["签到码,门票,姓名,Email"];
        for(var i = 0; i < length; i++){
            var key = store.key(i);
            if(key.search("checkin_ticket_") != 0){
                continue;
            }
            var ticket = store.get(key);
            if(ticket['checked'] == 0) {
                continue;
            }
            var name = ticket['name'] && ticket['name'].trim();
            var email = ticket['email'] && ticket['email'].trim();
            var number = ticket['number'] || "number";
            var tickets = ticket["tickets"] || "tickets";
            if(name && email){
                // 数据格式为`签到码,门票,姓名,Email`
                lines.push([number, tickets, name, email].join(","));
            }
        }
        console.log(lines);
        var blob = new Blob([lines.join("\r\n")], {
            "type" : "text/plain;charset=utf-8",
        });
        var url = URL.createObjectURL(blob);
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false);
        $("<a>").attr("href", url).attr("download",
            "checked.txt")[0].dispatchEvent(event);
        URL.revokeObjectURL(url);
    };

    var load_checked = function(text_content){

    };

    $("#import-donators").change(function() { read_file(this.files[0], load_donators); });
    $("#import-tickets").change(function() { read_file(this.files[0], load_tickets); });
    $("#import-sponsors").change(function() { read_file(this.files[0], load_sponsors); });
    $(".fake-import-btn").click(function() { $($(this).attr("data-target")).click(); });
    $("#export-checked").click(function() { export_checked() });
});