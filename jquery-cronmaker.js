$.fn.cronmaker = function () {
    init();

    $('#cronmaker').tabs({
        activate: function (event, ui) {
            reset();
        }
    });
    var secs, mins, hours, dayOfMonth, month, dayOfWeek, year;

    $("#btnGenCron").click(function () {
        var currTab = getCurrentTab();
        var rdoType;
        var chbType = [];
        var time;
        var txtday, txtmonth;
        var nth, selectWorkDay;

        if (currTab == "Minutes") {
            secs = 0;
            mins = $("#txtMin").val();
            hours = "*";
            dayOfMonth = "1/1";
            month = "*";
            dayOfWeek = "?";
            year = "*";

            if (mins == "" || mins == 0) {
                $("#lblValidation").html("Minimum minutes should be 1.");
            } else {
                $("#lblValidation").html("");
                printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
            }
        } else if (currTab == "Hourly") {
            rdoType = $("input[name='hour']:checked").val();

            if (rdoType == "frequence") {
                secs = 0;
                mins = 0;
                hours = "0/" + $("#txtEveryHours").val();
                dayOfMonth = "1/1";
                month = "*";
                dayOfWeek = "?";
                year = "*";

                if (hours == "0/") {
                    $("#lblValidation").html("Minimum hours should be 1.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            } else { //chose time
                time = $("#txtHourlyAtTime").val().split(":");
                secs = 0;
                mins = time[1];
                hours = time[0];
                dayOfMonth = "1/1";
                month = "*";
                dayOfWeek = "?";
                year = "*";
                printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
            }
        } else if (currTab == "Daily") {
            rdoType = $("input[name='daily']:checked").val();

            if (rdoType == "frequence") {
                time = $("#txtDailyAtTime").val().split(":");

                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = "1/" + $("#txtEveryDays").val();
                month = "*";
                dayOfWeek = "?";
                year = "*";

                if (dayOfMonth == "1/") {
                    $("#lblValidation").html("Minimum days should be 1.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            } else { //chose weekday
                time = $("#txtDailyAtTime").val().split(":");
                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = "?";
                month = "*";
                dayOfWeek = "MON-FRI";
                year = "*";

                if (dayOfMonth == "1/") {
                    $("#lblValidation").html("Minimum days should be 1.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            }
        } else if (currTab == "Weekly") {
            $("input[name='weekly']:checked").each(function () {
                chbType.push($(this).val());
            });

            time = $("#txtDailyAtTime").val().split(":");
            secs = 0;
            mins = Number(time[1]);
            hours = Number(time[0]);
            dayOfMonth = "?";
            month = "*";
            dayOfWeek = chbType.join(",");
            year = "*";

            if (dayOfWeek == "") {
                $("#lblValidation").html("Field 'Days selection' is required.");
            } else {
                printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
            }
        } else if (currTab == "Monthly") {
            rdoType = $("input[name='monthly']:checked").val();

            if (rdoType == "day") {
                txtday = $("#txtMonthlyDay").val();
                txtmonth = $("#txtMonthlyMonth").val();

                time = $("#txtMonthlyAtTime").val().split(":");
                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = txtday;
                month = "1/" + txtmonth;
                dayOfWeek = "?";
                year = "*";

                if (txtday == "" || txtmonth == "") {
                    $("#lblValidation").html("Field 'Day' and 'every month(s)' are required.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            } else {
                nth = $("#ddlMonthlyNth").val();
                selectWorkDay = $("#ddlMonthlyWeekDay").val();
                txtmonth = $("#txtMonthlyMonth2").val();

                time = $("#txtMonthlyAtTime").val().split(":");
                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = "?";
                month = "1/" + txtmonth;
                dayOfWeek = selectWorkDay + "#" + nth;
                year = "*";

                if (txtmonth == "") {
                    $("#lblValidation").html("Field 'every month(s)' is required.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            }
        } else if (currTab == "Yearly") {
            rdoType = $("input[name='yearly']:checked").val();

            if (rdoType == "everyDate") {
                txtday = $("#txtYearlyDay").val();
                txtmonth = $("#ddlYearlyMonth").val();

                time = $("#txtYearlyAtTime").val().split(":");
                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = txtday;
                month = txtmonth;
                dayOfWeek = "?";
                year = "*";

                if (txtday == "") {
                    $("#lblValidation").html("Field 'Day' is required.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            } else {
                nth = $("#ddlYearlyNth").val();
                selectWorkDay = $("#ddlYearlyWeekDay").val();
                txtmonth = $("#ddlYearlyMonth").val();

                time = $("#txtYearlyAtTime").val().split(":");
                secs = 0;
                mins = Number(time[1]);
                hours = Number(time[0]);
                dayOfMonth = "?";
                month = txtmonth;
                dayOfWeek = selectWorkDay + "#" + nth;
                year = "*";

                if (txtmonth == "") {
                    $("#lblValidation").html("Field 'every month(s)' is required.");
                } else {
                    printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year);
                }
            }
        }


    });
};

function createLayout() {
    return "<ul><li><a href='#tabs-Minutes'>Minutes</a></li><li><a href='#tabs-Hourly'>Hourly</a></li><li><a href='#tabs-Daily'>Daily</a></li><li><a href='#tabs-Weekly'>Weekly</a></li><li><a href='#tabs-Monthly'>Monthly</a></li><li><a href='#tabs-Yearly'>Yearly</a></li></ul><div id='tabs-Minutes'></div><div id='tabs-Hourly'></div><div id='tabs-Daily'></div><div id='tabs-Weekly'></div><div id='tabs-Monthly'></div><div id='tabs-Yearly'></div>"

        + "<div style='margin-top: 50px; padding-bottom: 30px; margin-left: 10px;'><button style='display: inline-block; position: relative;' id='btnGenCron'>Generated Cron Expression</button><label id='lblValidation' style='color: red; display: inline-block; float:right;'></label><div style='margin-top: 10px;'><input type='text' name='txtCronExpression' id='txtCronExpression' value='' style='width:400px;' /></div></div>";
}

function createMinutesTab() {
    return "<label class='light'>Every </label><input type='text' id='txtMin'/><label class='light'> minute(s)</label>";
}

function createHourlyTab() {
    return "<input type='radio' name='hour' value='frequence' checked /><label class='light'>Every </label><input type='text' id='txtEveryHours' /><label class='light'>hour(s)</label><br /><input type='radio' name='hour' value='time' /><label class='light'>At </label><input type='text' class='time' id='txtHourlyAtTime' />";
}

function createDailyTab() {
    return "<input type='radio' name='daily' value='frequence' checked /><label class='light'>Every </label><input type='text' id='txtEveryDays' /><label class='light'>day(s)</label><br /><input type='radio' name='daily' value='time' /><label class='light'>Every Week Day </label><br /><label class='light'>Start Time </label><input type='text' class='time' id='txtDailyAtTime' />";
}

function createWeeklyTab() {
    return "<input type='checkbox' name='weekly' value='MON' /><label class='light'>Monday</label><br /><input type='checkbox' name='weekly' value='TUE' /><label class='light'>Tuesday</label><br /><input type='checkbox' name='weekly' value='WED' /><label class='light'>Wednesday</label><br /><input type='checkbox' name='weekly' value='THU' /><label class='light'>Thursday</label><br /><input type='checkbox' name='weekly' value='FRI' /><label class='light'>Friday</label><br /><input type='checkbox' name='weekly' value='SAT' /><label class='light'>Saturday</label><br /><input type='checkbox' name='weekly' value='SUN' /><label class='light'>Sunday</label><br /><label class='light'>Start Time </label><input type='text' class='time' id='txtWeeklyAtTime' />";
}

function createMonthlyTab() {
    return " <input type='radio' name='monthly' value='day' checked /><label class='light'>Day </label><input type='text' id='txtMonthlyDay' /><label class='light'> of every </label><input type='text' id='txtMonthlyMonth' /><label class='light'> month(s)</label><br /><input type='radio' name='monthly' value='weekday' /><label class='light'>The </label><div id='divMonthlyNth'></div><div id='divMonthlyWeekField'></div><label class='light'> of every </label><input type='text' id='txtMonthlyMonth2' /><label class='light'> month(s)</label><br /><label class='light'>Start Time </label><input type='text' class='time' id='txtMonthlyAtTime' />";
}

function createYearlyTab() {
    return "<input type='radio' name='yearly' value='everyDate' checked /><label class='light'>Every </label><div id='divYearlyMonth'></div><input type='text' id='txtYearlyDay' /><br /><input type='radio' name='yearly' value='weekday' /><label class='light'>The </label><div id='divYearlyNth'></div><div id='divYearlyWeekField'></div><label class='light'> of </label><div id='divYearlyMonth2'></div><br /><label class='light'>Start Time </label><input type='text' class='time' id='txtYearlyAtTime' />";
}

function createWeekDropDownList(id) {
    var html;
    html = "<select id=" + id + "><option value='MON'>Monday</option><option value='TUE'>Tuesday</option><option value='WED'>Wednesday</option><option value='THU'>Thursday</option><option value='FRI'>Friday</option><option value='SAT'>Saturday</option><option value='SUN'>Sunday</option></select>";
    return html;
}

function createNthDropDownList(id) {
    return "<select id='" + id + "'><option value='1'>First</option><option value='2'>Second</option><option value='3'>Third</option><option value='4'>Fourth</option></select>";
}

function createMonthDropDownList(id) {
    return "<select id=" + id + "><option value='1'>January</option><option value='2'>February</option><option value='3'>March</option><option value='4'>April</option><option value='5'>May</option><option value='6'>June</option><option value='7'>July</option><option value='8'>August</option><option value='9'>September</option><option value='10'>October</option><option value='11'>November</option><option value='12'>December</option></select>";
}

function printResult(secs, mins, hours, dayOfMonth, month, dayOfWeek, year) {
    $("#lblValidation").html("");
    var generatedCron = [secs, mins, hours, dayOfMonth, month, dayOfWeek, year];
    $("#txtCronExpression").val(generatedCron.join(" "));
}

function init() {
    //initialize
    $("#cronmaker").html(createLayout());
    $("#tabs-Minutes").html(createMinutesTab());
    $("#tabs-Hourly").html(createHourlyTab());
    $("#tabs-Daily").html(createDailyTab());
    $("#tabs-Weekly").html(createWeeklyTab());
    $("#tabs-Monthly").html(createMonthlyTab());
    $("#tabs-Yearly").html(createYearlyTab());

    $("#divYearlyMonth2").html(createMonthDropDownList("ddlYearlyMonth2"));
    $("#divYearlyMonth").html(createMonthDropDownList("ddlYearlyMonth"));
    $("#divYearlyNth").html(createNthDropDownList("ddlYearlyNth"));
    $("#divMonthlyNth").html(createNthDropDownList("ddlMonthlyNth"));
    $("#divMonthlyWeekField").html(createWeekDropDownList("ddlMonthlyWeekDay"));
    $("#divYearlyWeekField").html(createWeekDropDownList("ddlYearlyWeekDay"));
    $("#lblValidation").html("");
}

function reset() {
    $("#txtCronExpression").val("");
    $(".time").timepicker();
    $(".time").timepicker('setTime', new Date());
}

function getCurrentTab() {
    var tabIndex = $("#cronmaker").tabs('option', 'active');
    var currentTab;

    switch (tabIndex) {
        case 0:
            currentTab = "Minutes";
            break;
        case 1:
            currentTab = "Hourly";
            break;
        case 2:
            currentTab = "Daily";
            break;
        case 3:
            currentTab = "Weekly";
            break;
        case 4:
            currentTab = "Monthly";
            break;
        case 5:
            currentTab = "Yearly";
            break;
        default:
            currentTab = "Minutes";
            break;
    }

    return currentTab;
}
