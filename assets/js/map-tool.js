$(function(){

    // Atts

    window.students = [];
    window.rit_type = 'reading';

    map_tool = {};

    map_tool.students = [];
    map_tool.rit_type = 'reading'; // Alternates between this and 'math'
    map_tool.time_period = 'school-year'; // Alternates between this and 'summer'
    map_tool.map_table = $('table#map-tool'); //This jQuery selector is used so much that it would probably be bad to not have a shortcut for it.

    // Functions

    map_tool.likeli_color = function(value){
        // Function takes a value and returns a color based on value

        if (value < 20){
                return 'red';
            } else if (value < 40){
                return 'orange';
            } else if (value < 60){
                return '#b53e2e';
            } else if (value < 80){
                return 'lime';
            } else if (value <= 100){
                return 'green';
            }
    };

    map_tool.likeli_label = function(value){

        value_frmt = value.toFixed(1)+'%'

        if (value < 20){
                return '<span class="label label-important">'+value_frmt+'</span>'
            } else if (value < 40){
                return '<span class="label label-warning">'+value_frmt+'</span>'
                // return 'orange';
            } else if (value < 60){
                return '<span class="label" style="background-color:#ffc629; color:#F5F5F5; text-shadow:1px 1px 4px grey;">'+value_frmt+'</span>'
                // return 'yellow';
            } else if (value < 80){
                return '<span class="label" style="background-color:#75D654; color:#F5F5F5">'+value_frmt+'</span>'
                // return 'lime';
            } else if (value <= 100){
                return '<span class="label label-success">'+value_frmt+'</span>'
                // return 'green';
            }
    }

    map_tool.reading_likelihood = function(x){
        if (x < 150){
            return 0;
        } else if (x > 230){
            return 100;
        } else {
        return Math.round((6604185957663787*Math.pow(x,9))/19662697690300065164400000000-(242182063706948999*Math.pow(x,8))/427449949789131851400000000+(8326725133062747458459*Math.pow(x,7))/19662697690300065164400000000-(275020711544219619319*Math.pow(x,6))/1494125964308515590000000+(1440204236813575717952861*Math.pow(x,5))/28089568129000093092000000-(5332013296131576666506449*Math.pow(x,4))/561791362580001861840000+(8440291253031360968481473*Math.pow(x,3))/7228932974375023957500-(2010877701481008702934460509*Math.pow(x,2))/21847441878111183516000+(4608918179064368416617800551*x)/1092372093905559175800-22999628744286233422832/268409281513971);
        }
    };

    map_tool.math_likelihood = function(x){
       if(x < 152){
        return 0;
       } else if (x > 242){
        return 100;
       } else {
       return Math.round((125704921*Math.pow(x,9))/290264343642000000000-(167988925213*Math.pow(x,8))/217698257731500000000+(35385155641937*Math.pow(x,7))/58052868728400000000-(46463971827161*Math.pow(x,6))/165865339224000000+(870312671689*Math.pow(x,5))/10543182000000-(134134273303733171*Math.pow(x,4))/8293266961200000+(12232440686412709153*Math.pow(x,3))/5805286872840000-(3831695778134478017*Math.pow(x,2))/21769825773150+(124143572577667376833*x)/14513217182100-971432498157073/5271591);
        }
    };

    map_tool.likelihood_calculator = function(type, rit_score){
        if (type == 'reading'){
            return map_tool.reading_likelihood(rit_score);
        } else if (type == 'math'){
            return map_tool.math_likelihood(rit_score);
        }

    };

    map_tool.adjust_scores = function(e){
        /* Handles the major parts of inputting numbers and listening to changes */

        var closest_tr = $(this).closest('tr');
        var rit_fall = parseInt(closest_tr.find('.rit-fall').val(), 10);
        var rit_winter = parseInt(closest_tr.find('.rit-winter').val(), 10);
        var rit_spring = parseInt(closest_tr.find('.rit-spring').val(), 10);

        //Check if the values are blank, if so, blank all the cores
        // if (isNaN(rit_fall) && isNaN(rit_winter) && isNaN(rit_spring)){
        //     $('.initial-display,td#act-gro-ftw,td#rate-gro-ftw,td#likeli-ftw,td#act-gro-wts,td#rate-gro-wts,td#likeli-wts').html('');
        // }

        var grade = closest_tr.find('#grade').val();


        var likeli = 0;

        if( !isNaN(rit_fall)){

            var init_display = closest_tr.find('.initial-display');

            //Check if type is math or reading and return appropriate percentage
            likeli = map_tool.likelihood_calculator(map_tool.rit_type, rit_fall);

            init_display.html(map_tool.likeli_label(likeli));
        } else {
            closest_tr.find('.initial-display').html('');
            closest_tr.find('#act-gro-ftw').html('');
            closest_tr.find('#rate-gro-ftw').html('');
            closest_tr.find('#likeli-ftw').html('');
        }


        if (!isNaN(rit_winter)){

            var likeli_ele = closest_tr.find('#likeli-ftw');

            //Check if type is math or reading and return appropriate percentage
            likeli = map_tool.likelihood_calculator(map_tool.rit_type, rit_winter);

            if (!isNaN(rit_fall)){
                actual_growth = (rit_winter - rit_fall);
                closest_tr.find('#act-gro-ftw').html( actual_growth );

                closest_tr.find('#rate-gro-ftw').html( (actual_growth / map_tool.grade_dictionary[grade][map_tool.rit_type].ftw).toFixed(1) );
            }

            likeli_ele.html(map_tool.likeli_label(likeli));
        } else {
            closest_tr.find('#act-gro-wts').html('');
            closest_tr.find('#rate-gro-wts').html('');
            closest_tr.find('#likeli-wts').html('');
        }


        if (!isNaN(rit_spring)){

            var likeli_ele = closest_tr.find('#likeli-wts');

            //Check if type is math or reading and return appropriate percentage
            likeli = map_tool.likelihood_calculator(map_tool.rit_type, rit_spring);

            if (!isNaN(rit_winter)){
                actual_growth = (rit_spring - rit_winter);
                closest_tr.find('#act-gro-wts').html( actual_growth );

                closest_tr.find('#rate-gro-wts').html( (actual_growth / map_tool.grade_dictionary[grade][map_tool.rit_type].wts).toFixed(1) );
            }

            likeli_ele.html(map_tool.likeli_label(likeli));
        } else {
            closest_tr.find('#act-gro-wts').html('');
            closest_tr.find('#rate-gro-wts').html('');
            closest_tr.find('#likeli-wts').html('');
        }

        //If fourth or fifth grade, grey out the likelihood percentages to denote that they don't apply as much. Since the testing ends in 4th grade.
        // If statement captures if the rit_type is math and grade is 4th or 5th or if rit_type is reading and grade is 4th or 5th.

        if ( (map_tool.rit_type == 'math' && (grade == '4th' || grade == '5th')) || (map_tool.rit_type == 'reading' && (grade == '4th' || grade == '5th') )) {
            $('.initial-display,#likeli-ftw,#likeli-wts').each(function(d){
                $(this).find('span').removeClass('label-important label-success label-info label-warning');
            });
        }

    };

    map_tool.add_student = function(e){

        var students = parseInt($('#add-student-select option:selected').text(), 10);
        for (var i = 1; i <= students; i++){
            var child_copy = map_tool.map_table.find('tbody').children().slice(-1).clone();
            map_tool.map_table.find('tbody').append(child_copy);
        }
    };

    map_tool.remove_student = function(e){
        var students = map_tool.map_table.find('tbody').children();
        if (students.length > 1) {
            students.slice(-1).remove();
        }

    };

    map_tool.change_rit = function(e){
        console.log("Changing the rit_type");
        map_tool.rit_type = this.value.toLowerCase();
        console.log('rit-type is now '+map_tool.rit_type);

        if(map_tool.rit_type == 'math'){
            $('table').find('th.plikelihood').html('% likelihood of meeting<br/>4th grade standards');
        } else {
            $('table').find('th.plikelihood').html('% likelihood of meeting<br/>3rd grade standards');
        }

        map_tool.map_table.find('div.rit-scores > input.rit:first').trigger('change');
    };

    $('table').delegate('#grade','change',function(){
        console.log(this.value)
        var close_tr = $(this).closest('tr');

        close_tr.find('#typ-gro-ftw').html( map_tool.grade_dictionary[this.value][map_tool.rit_type].ftw );
        close_tr.find('#typ-gro-wts').html( map_tool.grade_dictionary[this.value][map_tool.rit_type].wts );
        close_tr.find('#act-gro-ftw input').trigger('input');
        close_tr.find('#act-gro-wts input').trigger('input');

        map_tool.map_table.find('div.rit-scores > input.rit:first').trigger('change');
    });

    map_tool.change_school_year = function(e){

        var school_year = this.value.toLowerCase();
        map_tool.school_year = school_year;

        /*Check if 'spring' is at the beginning of the string*/
        if(school_year.search('summer') === 0 && map_tool.time_period !== 'summer'){
            console.log('switching to summer!')
            map_tool.map_table.find('div.rit-scores.controls').children().each(function(n){
                if($(this).attr('placeholder') == 'Fall'){
                    $(this).attr('placeholder', 'Spring');
                } else if ($(this).attr('placeholder') == 'Winter'){
                    $(this).attr('placeholder', 'Spring');
                } else if ($(this).attr('placeholder') == 'Spring'){
                    $(this).attr('placeholder', 'Fall');
                }
            });
            map_tool.map_table.find('th.semester').each(function(){
                if ($(this).html() == 'Winter'){
                    $(this).html('Spring');
                } else if ($(this).html() == 'Spring'){
                    $(this).html('Fall');
                }
            });
            $('div#map-tool-results td.row-title').each(function(){
                if($(this).html() =='Fall to Winter'){
                    $(this).html('Spring to Summer');
                } else {
                    $(this).html('Spring to Fall');
                }

            });
            map_tool_res = $('div#map-tool-results');

            map_tool_res.find('.school-year').css('display','none');
            // map_tool_res.find('.summer').css('display','table');


            map_tool.map_table.find('td:nth-child(4)').hide()
            trs = map_tool.map_table.find('tr')
            $($(trs[0]).find('th')[1]).hide()
            $($(trs[1]).find('th')[3]).hide()


            map_tool.map_table.find('.rit-fall').hide()

            //Flip master toggle
            map_tool.time_period = 'summer';


        } else if (school_year.search(/[\d]{4}/i) === 0 && map_tool.time_period !== 'school-year'){
            console.log('switching to year!')
            map_tool.map_table.find('div.rit-scores.controls').children().each(function(n){
                if($(this).attr('placeholder') == 'Spring'){
                    $(this).attr('placeholder', 'Fall');
                } else if ($(this).attr('placeholder') == 'Summer'){
                    $(this).attr('placeholder', 'Winter');
                } else if ($(this).attr('placeholder') == 'Fall'){
                    $(this).attr('placeholder', 'Spring');
                }
            });

            map_tool.map_table.find('th.semester').each(function(){
                if ($(this).html() == 'Spring'){
                    $(this).html('Winter');
                } else if ($(this).html() == 'Fall'){
                    $(this).html('Spring');
                }
            });

            var a = [
                    'Fall to Winter',
                    'Winter to Spring',
                    'Students with Incomplete Data'
                ];
            var x = 0
            $('div#map-tool-results td.row-title').each(function(){

                $(this).html(a[x]);
                x+=1;

            });

            map_tool.map_table.find('td:nth-child(4)').show()
            trs = map_tool.map_table.find('tr')
            $($(trs[0]).find('th')[1]).show()
            $($(trs[1]).find('th')[3]).show()

            map_tool_res = $('div#map-tool-results');

            map_tool_res.find('.school-year').css('display','table');
            map_tool_res.find('.summer').css('display','none');

            map_tool.map_table.find('.rit-fall').show()

            //Flip master toggle
            map_tool.time_period = 'school-year';

        }
    };

    map_tool.sc = function(e){
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

    map_tool.clear_table = function(){
        var inputs = map_tool.map_table.find('.rit-scores input.rit');
        inputs.each(function(){
            $(this).val('');
        });

        map_tool.map_table.find('div.rit-scores > input.rit:first').trigger('change');
    };


    map_tool.calculate_total = function(){
        console.log('Calculating Total');

        //If the current time period is school-year and not summer calculation.
        if (map_tool.time_period == 'school-year'){
            var total = {
                'first':{ //For the first time period to time period (Fall to Winter)
                    'below':0,
                    'meet':0,
                    'aspir':0,
                    'incomplete':0,
                    'total':0
                },
                'second':{ //For the second time period to time period (Winter to Spring)
                    'below':0,
                    'meet':0,
                    'aspir':0,
                    'incomplete':0, //students without total data
                    'total':0 // Total students
                },
                'dict':{
                    1:'below',
                    2:'meet',
                    3:'aspir',
                    4:'incomplete'
                },
                'html': {
                    1:'<span class="label label-important">!</span>',
                    2:'<span class="label label-info">!</span>',
                    3:'<span class="label label-success">!</span>',
                    4:'<span class="label label-inverse">!</span>'
                }

            };

            //Go through each student (row) and calculate the totals
            students = map_tool.map_table.find('tbody > tr');
            // console.log('students array - '+students.length)
            // console.log(students)
            students.each(function(s){

                //IF there is no value in the fall input field then the student data for the first section
                // is incomplete, otherwise need to calculate where the student is at for this section
                // and categorize him/her in below, meeting, or aspiring.
                if ( $(this).find('.rit.rit-fall').val() === ""){
                    total.first.incomplete++;
                } else {
                    f_result = parseFloat($(this).find('td#rate-gro-ftw').html(), 10);
                    console.log('f ' + f_result);
                    if (!isNaN(f_result)){
                        if (f_result < 1.0){
                            total.first.below++;
                        } else if (f_result >= 1.0 && f_result < 1.50 ){
                            total.first.meet++;
                        } else {
                            total.first.aspir++;
                        }
                    }
                    //Increment total number
                    total.first.total++;
                }

                //IF there is no value in the winter AND spring input fields then the student data for the second section
                // is incomplete, otherwise need to calculate where the student is at for this section
                // and categorize him/her in below, meeting, or aspiring.
                if ( $(this).find('.rit.rit-winter').val() === "" || $(this).find('.rit.rit-spring').val() === "" ){
                    total.second.incomplete++;
                } else {
                    s_result = parseFloat($(this).find('td#rate-gro-wts').html(), 10);
                    console.log('s '+ s_result);
                    if (!isNaN(s_result)){
                        if (s_result < 1.0){
                            total.second.below++;
                        } else if (s_result >= 1.0 && s_result < 1.50 ){
                            total.second.meet++;
                        } else {
                            total.second.aspir++;
                        }
                    }
                    //Increment total number
                    total.second.total++;
                }

            });

            total_rows = $('div#map-tool-results > table > tbody > tr');


            $('#map-tool-results .n1').html(total.total);

            $(total_rows[0]).children().each(function(d){
                if (d === 4){
                    new_html = total.html[d].replace('!', total.first.incomplete.toString() );
                    $(this).html(new_html);
                } else if (d !== 0){
                    new_html = total.html[d].replace('!', total.first[total.dict[d]].toString() );
                    new_html += '<br>';
                    new_html += total.html[d].replace('!', (total.first[total.dict[d]] / total.first.total).toFixed(2) * 100 + '%' );

                    $(this).html(new_html);
                }
            });

            $('#map-tool-results .n2').html(total.total);

            $(total_rows[1]).children().each(function(d){
                if (d === 4){
                    new_html = total.html[d].replace('!', total.second.incomplete.toString() );
                    $(this).html(new_html);
                } else if (d !== 0){

                    new_html = total.html[d].replace('!',total.second[total.dict[d]].toString() );
                    new_html += '<br>';
                    new_html += total.html[d].replace('!', (total.second[total.dict[d]] / total.second.total).toFixed(2) * 100 + '%');

                    $(this).html(new_html);
                }
            });

            // $($(total_rows[2]).children()[1]).html(
            //     total.html[2].replace('!', total.incomplete.toString())
            // );


        } else if( map_tool.time_period == 'summer' ){

            var total = {
                'summer':{ //For the first time period to time period (Fall to Winter)
                    'loss':0,
                    'retain':0,
                    'growth':0
                },
                'total':0, // Total students
                'dict':{
                    1:'loss',
                    2:'retain',
                    3:'growth'
                }
            };

            students = map_tool.map_table.find('tbody > tr');
            console.log(students);
            students.each(function(s){
                console.log(s);
            });
        }
        // console.log(total);
    };

    // Listeners

    /* Handle changing the school year */
    $('select.school-year').change(map_tool.change_school_year);

    $('table#map-tool').delegate('.rit-scores > .rit','change', map_tool.adjust_scores);

    // Listener for adding students rows
    $('.map-tool-buttons #add-student').on('click', map_tool.add_student);

    //Listener for removing student rows
    $('.map-tool-buttons #remove-student').on('click', map_tool.remove_student);

    //Clearing all data on table
    $('.map-tool-buttons #clear-table').on('click', map_tool.clear_table);

    //Bind to changing of inputs and addition of students so that the total
    // results section can be properly calculated.
    $('.map-tool-buttons #add-student,#remove-student').on('click', map_tool.calculate_total);
    $('table#map-tool').delegate('.rit-scores > .rit','change', map_tool.calculate_total);
    $('.rit_type').change(map_tool.calculate_total);

    // Make sure that when inputting new data that the student calculations happen
    map_tool.map_table.find('table').on('input', '#act-gro-ftw input', map_tool.sc);
    map_tool.map_table.find('table').on('input', '#act-gro-wts input', map_tool.sc);

    // $('.nav a#analytics-tab').click(function(e) {  create_d3_graph();  });

    /* Handles changing the RIT type of the chart */
    $('.rit-type').change(map_tool.change_rit);

    map_tool.grade_dictionary = {

        "K" : {  //Kindergarten
            "math" : { //Math
                "ftw"   :7.0, //Fall to Winter
                "wts"   :8.4, //Winter to Spring
                "fall"  :69,  //Fall
                "winter":62,  //Winter
                "spring":53   //Spring
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
            }
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
            }
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
        },
        "5th" : {
            "math" : {
                "ftw"   :4.9,
                "wts"   :3.2,
                "fall"  :0,
                "winter":0,
                "spring":0
            },
            "reading" : {
                "ftw"   :2.7,
                "wts"   :2.5,
                "fall"  :0,
                "winter":0,
                "spring":0
            }
        }
    };

    window.map_tool = map_tool;

});


function reading_success_eq(x){
    //return (-0.7076+x) * ((0.8679+x) * ((-0.0655+x) * ((0.0025+x) * ((-5.0*Math.pow(10,-6))+((-5.0*Math.pow(10,-7))+(4.0*Math.pow(10,-9))* x)*x))));
    return (-0.0346869 + 0.0398422*x)*(2.82867 + 0.0398422*x)*(12.2796 - 0.268556*x + 0.0015874*Math.pow(x,2)) * (0.587296 - 0.0411877*x + 0.0015874 * Math.pow(x,2));
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

