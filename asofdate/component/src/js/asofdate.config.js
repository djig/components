asOfDate.provider("appSetting", function () {
    var objArr = [];
    return {
        setObj: function (type, obj) {
            var objNew = { 'type': type, 'value': obj };
            objArr.push(objNew);
        } ,
        $get: function () {
            return {
                settings: objArr,
                colors: _.where(objArr, { type: "colors" })[0].value,
                months: _.where(objArr, { type: "months" })[0].value
            };
        }
    };
});
asOfDate.config(function (appSettingProvider) {
  var appcolors = [
               "Black",
                "RGBA(101,178,106,.99)",
                "RGBA(0, 123, 131, .99)",
                "RGBA(131, 159, 182, 1)",
                "RGBA(0,123,183,1)",
                "RGBA(94,181,184,1)",
                "RGBA(0,111,81,.99)",
                " RGBA(90, 124, 194, .9)",
                "RGBA(141, 182, 145, 1)",
                "RGBA(213,225,242,1)",
                  "RGBA(56,72,0,1)",
                  "RGBA(139, 69, 19, 1)",
                  "RGBA(30, 144, 255, .6)",
                  "RGBA(139, 34, 82, .6)",
                  "RGBA(18, 42, 76, .9)",
                  "RGBA(159,182,205,.6)",
                  "RGBA(190, 0, 50, .8)",
                  "RGBA(101,178,106,.99)",

                  " RGBA(0, 123, 131, .99)",
                  "RGBA(131, 159, 182, 1)",
                  "RGBA(0,123,183,1)",
                  "RGBA(94,181,184,1)",


                  "RGBA(0,111,81,.99)",


                  " RGBA(90, 124, 194, .9)",
                  "RGBA(141, 182, 145, 1)",
                  "RGBA(213,225,242,1)",
                  "RGBA(56,72,0,1)",
                  "RGBA(139, 69, 19, 1)",
                  "RGBA(30, 144, 255, .6)",
                  "RGBA(139, 34, 82, .6)",
                  "RGBA(18, 42, 76, .9)",
                  "RGBA(101,178,106,.99)",

                  " RGBA(0, 123, 131, .99)",
                  "RGBA(131, 159, 182, 1)",
                  "RGBA(0,123,183,1)",
                  "RGBA(94,181,184,1)",


                  "RGBA(0,111,81,.99)",


                  " RGBA(90, 124, 194, .9)",
                  "RGBA(141, 182, 145, 1)",
                  "RGBA(213,225,242,1)",
                  "RGBA(56,72,0,1)",
                  "RGBA(139, 69, 19, 1)",
                  "RGBA(30, 144, 255, .6)",
                  "RGBA(139, 34, 82, .6)",
                  "RGBA(18, 42, 76, .9)"
     ]
     appSettingProvider.setObj('colors', appcolors);


     var gmonth = new Array();
     gmonth[0] = "Jan";
     gmonth[1] = "Feb";
     gmonth[2] = "Mar";
     gmonth[3] = "Apr";
     gmonth[4] = "May";
     gmonth[5] = "Jun";
     gmonth[6] = "Jul";
     gmonth[7] = "Aug";
     gmonth[8] = "Sep";
     gmonth[9] = "Oct";
     gmonth[10] = "Nov";
     gmonth[11] = "Dec";

     appSettingProvider.setObj('months', gmonth);



});
