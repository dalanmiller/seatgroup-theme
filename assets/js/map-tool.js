



window.onload = function(){


}

$(document).ready(function(){

    $('table').delegate('#grade','change',function(){
        var close_tr = $(this).closest('tr');
        close_tr.find('#typ-gro-ftw').html( grade_dictionary[this.value].reading.ftw )
        close_tr.find('#typ-gro-wts').html( grade_dictionary[this.value].reading.wts )
        close_tr.find('#act-gro-ftw input').trigger('input');
        close_tr.find('#act-gro-wts input').trigger('input');
    });

    // $('table').delegate( '#act-gro-ftw input','input', sc);
    // $('table').delegate( '#act-gro-wts input','input', sc);
    $('table').on('input', '#act-gro-ftw input', sc);
    $('table').on('input', '#act-gro-wts input', sc);

    $('#add-student').on('click', function(){
        $('tbody').append($('tbody').children().slice(-1).clone());
    });

});

var sc = function(){
    var suffix = this.parentElement.id.slice(-3)
    var ag = '#act-gro-'+suffix;
    var tg = '#typ-gro-'+suffix;
    var rg = '#rate-gro-'+suffix;
    var typical = $(this).closest('tr').find( tg ).html();
    var rate_gro_ftw = $(this).closest('tr').find( rg );
    if(!isNaN(parseInt(this.value)) && this.value != null){
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
}


function reading_success_eq(x){
    //return (-0.7076+x) * ((0.8679+x) * ((-0.0655+x) * ((0.0025+x) * ((-5.0*Math.pow(10,-6))+((-5.0*Math.pow(10,-7))+(4.0*Math.pow(10,-9))* x)*x))));
    return (-0.0346869 + 0.0398422*x)*(2.82867 + 0.0398422*x)*(12.2796 - 0.268556*x + 0.0015874*Math.pow(x,2)) * (0.587296 - 0.0411877*x + 0.0015874 * Math.pow(x,2))
}

var grade_dictionary = {

    "K" : {
        "math" : {"ftw" : 7.0, "wts" : 8.4},
        "reading" : {"ftw" : 8.5, "wts" : 6.7}
        },
    "1st"  : {
        "math" : {"ftw" : 7.0, "wts" : 8.4},
        "reading" : {"ftw" : 10.4, "wts" : 6.2}
    },
    "2nd" : {
        "math" : {"ftw" : 7.0, "wts" : 8.4},
        "reading" : {"ftw" : 7.7, "wts" : 6.0}
    },
    "3rd" : {
        "math" : {"ftw" : 7.0, "wts" : 8.4},
        "reading" : {"ftw" : 4.7, "wts" : 4.6}
    },
    "4th" : {
        "math" : {"ftw" : 7.0, "wts" : 8.4},
        "reading" : {"ftw" : 3.4, "wts" : 3.5}
    }
}

// #Outcome Statements generated after all the student info has been inputted.
// #Target Statements, modeled potentially after district generated target statements ~10% higher than baseline schools with timeframes

// ID          Summer (optional)       Fall to Winter
// Student Grade               Fall RIT    Winter RIT  Actual Growth   Typical Growth  Growth Rate     Precent of Likelihood for 3rd Grade Standard

