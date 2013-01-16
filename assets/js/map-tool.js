$(document).ready(function(){

    window.students = [];
    window.rit_type = 'reading';

    $('.nav .nav-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');

    });


    /* Handles the major parts of inputting numbers and listening to changes */
    $('table').delegate('.rit-scores .rit','change', function(e){
        var closest_tr = $(this).closest('tr');
        var rit_fall = parseInt(closest_tr.find('.rit-fall').val(), 10);
        var rit_winter = parseInt(closest_tr.find('.rit-winter').val(), 10);
        var rit_spring = parseInt(closest_tr.find('.rit-spring').val(), 10);
        var grade = closest_tr.find('#grade').val();
        var likeli = 0;

        if( !isNaN(rit_fall)){

            var init_display = closest_tr.find('.initial-display');

            var grade_likeli_adj = grade_dictionary[grade].fall;
            if (rit_type == 'reading'){
                likeli = reading_likelihood(rit_fall);
            } else {
                likeli = math_likelihood(rit_fall);
            }

            init_display.html(likeli.toFixed(1) + '%');

            if (likeli < 20){
                init_display.css('color','red');
            } else if (likeli < 40){
                init_display.css('color','orange');
            } else if (likeli < 60){
                init_display.css('color','yellow');
            } else if (likeli < 80){
                init_display.css('color','lime');
            } else if (likeli <= 100){
                init_display.css('color','green');
            }
        }

        if (!isNaN(rit_winter)){

            var likeli_ele = closest_tr.find('#likeli-ftw');
            if (rit_type == 'reading'){
                likeli = reading_likelihood(rit_winter);
            } else {
                likeli = math_likelihood(rit_winter);
            }

            if (!isNaN(rit_fall)){
                actual_growth = (rit_winter - rit_fall);
                closest_tr.find('#act-gro-ftw').html( actual_growth );

                closest_tr.find('#rate-gro-ftw').html( (actual_growth / grade_dictionary[grade][rit_type].ftw).toFixed(1) );
            }

            likeli_ele.html(likeli.toFixed(1) + '%');

            if (likeli < 20){
                likeli_ele.css('color','red');
            } else if (likeli < 40){
                likeli_ele.css('color','orange');
            } else if (likeli < 60){
                likeli_ele.css('color','yellow');
            } else if (likeli < 80){
                likeli_ele.css('color','lime');
            } else if (likeli <= 100){
                likeli_ele.css('color','green');
            }

        }
        if (!isNaN(rit_spring)){

            var likeli_ele = closest_tr.find('#likeli-wts');
            if (rit_type == 'reading'){
                likeli = reading_likelihood(rit_spring);
            } else {
                likeli = math_likelihood(rit_spring);
            }

            if (!isNaN(rit_winter)){
                actual_growth = (rit_spring - rit_winter);
                closest_tr.find('#act-gro-wts').html( actual_growth );

                closest_tr.find('#rate-gro-wts').html( (actual_growth / grade_dictionary[grade][rit_type].wts).toFixed(1) );
            }

            likeli_ele.html(likeli.toFixed(1) + '%');

            if (likeli < 20){
                likeli_ele.css('color','red');
            } else if (likeli < 40){
                likeli_ele.css('color','orange');
            } else if (likeli < 60){
                likeli_ele.css('color','yellow');
            } else if (likeli < 80){
                likeli_ele.css('color','lime');
            } else if (likeli <= 100){
                likeli_ele.css('color','green');
            }
        }


    });

    $('table').delegate('#grade','change',function(){
        var close_tr = $(this).closest('tr');
        close_tr.find('#typ-gro-ftw').html( grade_dictionary[this.value].reading.ftw );
        close_tr.find('#typ-gro-wts').html( grade_dictionary[this.value].reading.wts );
        close_tr.find('#act-gro-ftw input').trigger('input');
        close_tr.find('#act-gro-wts input').trigger('input');

        calculations(this);
    });

    $('table').on('input', '#act-gro-ftw input', sc);
    $('table').on('input', '#act-gro-wts input', sc);

    $('#add-student').on('click', function(){
        var students = parseInt($('#add-student-select option:selected').text(), 10);
        for (var i = 1; i <= students; i++){
            $('tbody').append($('tbody').children().slice(-1).clone());
        }
    });

    $('.nav a#analytics-tab').click(function(e) {  create_d3_graph();  });

    /* Handles changing the RIT type of the chart */
    $('.rit-type').change(function(e){
        window.rit_type = this.value.toLowerCase();
        console.log('rit-type is now '+this.value.toLowerCase());

        if(window.rit_type == 'math'){
            $('table').find('th.plikelihood').html('% likelihood of meeting<br/>4th grade standards')
        } else {
            $('table').find('th.plikelihood').html('% likelihood of meeting<br/>3rd grade standards')
        }
    });

    /* Handle changing the school year */
    $('.school-year').change(function(e){

        var school_year = this.value.toLowerCase()
        window.school_year = school_year;
        console.log('school-year is now '+school_year);

        if(school_year.search('summer') != -1){
            $('div.rit-scores.controls').children().each(function(n){
                if($(this).attr('placeholder') == 'Fall'){
                    $(this).attr('placeholder', 'Spring');
                } else if ($(this).attr('placeholder') == 'Winter'){
                    $(this).attr('placeholder', 'Summer');
                } else if ($(this).attr('placeholder') == 'Fall'){
                    $(this).attr('placeholder', 'Fall');
                }
            });
        }
    });

});

var sc = function(){
        var suffix = this.parentElement.id.slice(-3);
        var ag = '#act-gro-'+suffix;
        var tg = '#typ-gro-'+suffix;
        var rg = '#rate-gro-'+suffix;
        var typical = $(this).closest('tr').find( tg ).html();
        var rate_gro_ftw = $(this).closest('tr').find( rg );
        if(!isNaN(parseInt(this.value, 10)) && this.value !== null){
            var calc = parseFloat(this.value) / parseFloat(typical);
            rate_gro_ftw.html(
                calc.toString().slice(0,4).concat('%')
            );
            if (calc > 1.50){
                rate_gro_ftw.css('color','green');
            } else if (calc > 1.00) {
                rate_gro_ftw.css('color','black');
            } else {
                rate_gro_ftw.css('color','red');
            }
        } else {
            $(this).closest('tr').find( rg ).html('');
        }
    };




function reading_success_eq(x){
    //return (-0.7076+x) * ((0.8679+x) * ((-0.0655+x) * ((0.0025+x) * ((-5.0*Math.pow(10,-6))+((-5.0*Math.pow(10,-7))+(4.0*Math.pow(10,-9))* x)*x))));
    return (-0.0346869 + 0.0398422*x)*(2.82867 + 0.0398422*x)*(12.2796 - 0.268556*x + 0.0015874*Math.pow(x,2)) * (0.587296 - 0.0411877*x + 0.0015874 * Math.pow(x,2));
}

window.reading_likelihood = function(x){

    if (x < 150){
        return 0;
    } else if (x > 230){
        return 100;
    } else {
    return Math.round((6604185957663787*Math.pow(x,9))/19662697690300065164400000000-(242182063706948999*Math.pow(x,8))/427449949789131851400000000+(8326725133062747458459*Math.pow(x,7))/19662697690300065164400000000-(275020711544219619319*Math.pow(x,6))/1494125964308515590000000+(1440204236813575717952861*Math.pow(x,5))/28089568129000093092000000-(5332013296131576666506449*Math.pow(x,4))/561791362580001861840000+(8440291253031360968481473*Math.pow(x,3))/7228932974375023957500-(2010877701481008702934460509*Math.pow(x,2))/21847441878111183516000+(4608918179064368416617800551*x)/1092372093905559175800-22999628744286233422832/268409281513971);
    }
};

window.math_likelihood = function(x){
   if(x < 152){
    return 0;
   } else if (x > 242){
    return 100;
   } else {
   return Math.round((125704921*Math.pow(x,9))/290264343642000000000-(167988925213*Math.pow(x,8))/217698257731500000000+(35385155641937*Math.pow(x,7))/58052868728400000000-(46463971827161*Math.pow(x,6))/165865339224000000+(870312671689*Math.pow(x,5))/10543182000000-(134134273303733171*Math.pow(x,4))/8293266961200000+(12232440686412709153*Math.pow(x,3))/5805286872840000-(3831695778134478017*Math.pow(x,2))/21769825773150+(124143572577667376833*x)/14513217182100-971432498157073/5271591);
    }
};

window.grade_dictionary = {

        "K" : {
            "math" : {
                "ftw"   :7.0,
                "wts"   :8.4,
                "fall"  :69,
                "winter":62,
                "spring":53
            },
            "reading" : {
                "ftw"   :8.5,
                "wts"   :6.7,
                "fall"  :57,
                "winter":48,
                "spring":42
             }
        },
        "1st"  : {
            "math" : {
                "ftw"   :7.0,
                "wts"   :8.4,
                "fall"  :50,
                "winter":40,
                "spring":34
            },
            "reading" : {
                "ftw"   :10.4,
                "wts"   :6.2,
                "fall"  :39,
                "winter":29,
                "spring":22
        },
        "2nd" : {
            "math" : {
                "ftw"   :7.0,
                "wts"   :8.4,
                "fall"  :34,
                "winter":27,
                "spring":21
            },
            "reading" : {
                "ftw"   :7.7,
                "wts"   :6.0,
                "fall"  :23,
                "winter":16,
                "spring":10
        },
        "3rd" : {
            "math" : {
                "ftw"   :7.0,
                "wts"   :8.4,
                "fall"  :20,
                "winter":14,
                "spring":9
            },
            "reading" : {
                "ftw"   :4.7,
                "wts"   :4.6,
                "fall"  :9,
                "winter":5,
                "spring":0
            }
        },
        "4th" : {
            "math" : {
                "ftw"   :7.0,
                "wts"   :8.4,
                "fall"  :9,
                "winter":4,
                "spring":0
            },
            "reading" : {
                "ftw"   :3.4,
                "wts"   :3.5,
                "fall"  :0,
                "winter":0,
                "spring":0
            }
        }
    }}
}

jQuery.fn.toCSV = function() {
  var data = $(this).first(); //Only one table
  var csvData = [];
  var tmpArr = [];
  var tmpStr = '';
  data.find("tr").each(function() {
      if($(this).find("th").length) {
          $(this).find("th").each(function() {
            tmpStr = $(this).text().replace(/"/g, '""');
            tmpArr.push('"' + tmpStr + '"');
          });
          csvData.push(tmpArr);
      } else {
          tmpArr = [];
          $(this).find("td").each(function() {
             $(this).find("td").each(function() {
                if($(this).text().match(/^-{0,1}\d*\.{0,1}\d+$/)) {
                    tmpArr.push(parseFloat($(this).text()));
                } else {
                    tmpStr = $(this).text().replace(/"/g, '""');
                    tmpArr.push('"' + tmpStr + '"');
                }
            });
          });
          csvData.push(tmpArr.join(','));
      }
  });
  var output = csvData.join('\n');
  var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(output);
  window.open(uri);
}



// // #Outcome Statements generated after all the student info has been inputted.
// // #Target Statements, modeled potentially after district generated target statements ~10% higher than baseline schools with timeframes

// // ID          Summer (optional)       Fall to Winter
// // Student Grade               Fall RIT    Winter RIT  Actual Growth   Typical Growth  Growth Rate     Precent of Likelihood for 3rd Grade Standard

