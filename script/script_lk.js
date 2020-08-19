//Удаление группы

$(document).on('click', '.delete_btn', function(){
     var del_id = $(this).parents("tr").attr("id");

    if(confirm('Вы действительно хотите удалить группу?'))
        {
        $.ajax({
            url: "group_del.php",
            type: "POST",
            data: {del_id: del_id}, 
            success: function(response) {
                $('#group_res').children('tbody').html(response);
                alert("Группа успешно удалена!");
            }
        });
}});

//Добавление группы

$(document).on('click', '.add_group', function() {	
    $.ajax({
        url: "group_add.php",
        type: "POST",
        data: $('#group_form').serialize(), 
        success: function(response) {
            $('#group_res').children('tbody').html(response);
        }
    });
});





//Графики


$(document).on('click', '.show_charts', function(){
    var checked_box = [];
    var group_titles =[];
    var all_after_query = [];
    $('input:checkbox:checked').each(function() {
	checked_box.push($(this).val());
    group_titles.push($('label[for='+$(this).val()+']').text());
    });
    $.each(checked_box, function(index, value){
        $.ajax({
            url: "take_answ.php",
            type: "POST",
            async: false,
            data: {value: value}, 
            success: function(result) {
                result1=JSON.parse(result);
                all_after_query = all_after_query.concat(result1.filter(i=>all_after_query.indexOf(i)===-1));
            }
        });  
    })
    var b=0;
    $.each(all_after_query, function(index, value){
        var gr_title = $('label[for='+value['group_id']+']').attr('value');
        all_after_query[b].group_title=gr_title;
        var split_answ = value['answers'].split('');
        var D = Number(split_answ[1]) + Number(split_answ[5]) + Number(split_answ[11]) + Number(split_answ[13]) + Number(split_answ[18]) + Number(split_answ[20]) + Number(split_answ[26]) + Number(split_answ[27]) + Number(split_answ[31]) + Number(split_answ[35]) + Number(split_answ[38]) + Number(split_answ[40]) + Number(split_answ[44]) + Number(split_answ[48]) + Number(split_answ[51]) + Number(split_answ[54]) + Number(split_answ[58]) + Number(split_answ[62]) + Number(split_answ[64]) + Number(split_answ[68]) + Number(split_answ[71]);
        var N = Number(split_answ[2]) + Number(split_answ[7]) + Number(split_answ[9]) + Number(split_answ[15]) + Number(split_answ[17]) + Number(split_answ[22]) + Number(split_answ[24]) + Number(split_answ[29]) + Number(split_answ[33]) + Number(split_answ[37]) + Number(split_answ[41]) + Number(split_answ[43]) + Number(split_answ[45]) + Number(split_answ[49]) + Number(split_answ[52]) + Number(split_answ[55]) + Number(split_answ[60]) + Number(split_answ[63]) + Number(split_answ[67]) + Number(split_answ[70]) + Number(split_answ[72]);
        var O = Number(split_answ[4]) + Number(split_answ[6]) + Number(split_answ[8]) + Number(split_answ[10]) + Number(split_answ[14]) + Number(split_answ[16]) + Number(split_answ[21]) + Number(split_answ[23]) + Number(split_answ[25]) + Number(split_answ[34]) + Number(split_answ[36]) + Number(split_answ[39]) + Number(split_answ[42]) + Number(split_answ[47]) + Number(split_answ[50]) + Number(split_answ[53]) + Number(split_answ[57]) + Number(split_answ[59]) + Number(split_answ[61]) + Number(split_answ[65]) + Number(split_answ[69]);
        all_after_query[b].scaleD=D;
        all_after_query[b].scaleN=N;
        all_after_query[b].scaleO=O;
        if(D>16 && N>16 && O<8){
            all_after_query[b].danger=1;
        } else{
            all_after_query[b].danger=0;
        }
        b++;
        //console.log(all_after_query);

    })
    
    var tablesDIV = document.getElementsByClassName('tables')[0];
    $(".tables").empty();
    $(".charts").empty();
   // $('<details>', { id: 'details_for_table', class: 'mt-5 mb-5 det'}).appendTo('.tables');
   // $('<summary class=offset-5>Индивидуальная статистика</summary>').appendTo('#details_for_table');
    $('<button class="btn btn-primary" type="button" id="report">Создать отчет</button>').appendTo('.charts');
    $('<canvas>', { id: 'canvas1', class: 'mt-5 mb-5'}).appendTo('.charts');
    $('<canvas>', { id: 'canvas4', class: 'mt-5 mb-5'}).appendTo('.charts');
    $('<canvas>', { id: 'canvas2', class: 'mt-5 mb-5'}).appendTo('.charts');
    $('<canvas>', { id: 'canvas3', class: 'mt-5 mb-5'}).appendTo('.charts');
    
//Таблица
    
/*    
    
    $.each(checked_box, function(index, value){
        $.ajax({
            url: "tables_stat.php",
            type: "POST",
            async: false,
            data: {value: value}, 
            success: function(result) {
                $(result).appendTo("#details_for_table");
            }
        });  
    })
  */  
    
    
    
    var scale_title = ['Шкала депрессивности', 'Шкала невротизации', 'Шкала общительности'];
    var colors = ['rgb(99, 255, 105)', 'rgb(255, 25, 25)', 'rgb(0, 69, 255)', 'rgb(255, 159, 64)', 'rgb(255,192,203)', 'rgb(54, 162, 235)', 'rgb(255, 247, 0)', 'rgb(102,205,170)', 'rgb(75,0,130)', 'rgb(105, 54, 54)', 'rgb(95,158,160)', 'rgb(160,82,45)', 'rgb(173,255,47)', 'rgb(255,99,71)', 'rgb(128,0,0)', 'rgb(199,21,133)', 'rgb(139,0,0)', 'rgb(255,127,80)', 'rgb(85,107,47)', 'rgb(210,105,30)', 'rgb(255,222,173)', 'rgb(51,51,0)', 'rgb(120, 81, 107)', 'rgb(0,128,128)', 'rgb(0,0,0)']; 
    
    
    //CHART #1
    
    
    var config1 = {
			type: 'line',
			data: {
				labels: scale_title,
				datasets: []
			},
			options: {
				responsive: true,
                elements:{
				line: {
					tension: 0
                    }
                },
				title: {
					display: true,
					text: 'Общая выборка для групп: '+group_titles
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: false
						}
					}],
					yAxes: [{
						display: true,
                        ticks: {
                            beginAtZero: true
                        },
						scaleLabel: {
							display: true,
							labelString: 'Баллы'
						},
                        ticks: {
                            max: 21,
                            min: 0,
                            stepSize: 8
                        }
					}]
				}
			}
		};
    var c=0;
    var chart1 = document.getElementById('canvas1').getContext('2d');
    var joint_chart = new Chart(chart1, config1);
    
    var for_color =0;
    $.each(all_after_query, function(index, value){
        if(for_color==25){
            for_color=for_color-25;
        }
        var group_title_for_student = $('label[for='+all_after_query[c].group_id+']').text()
        var newDataset = {
            label: "Студент из "+group_title_for_student,
            backgroundColor: colors[for_color],
            borderColor: colors[for_color],
            data: [all_after_query[c].scaleD, all_after_query[c].scaleN, all_after_query[c].scaleO],
            fill: false
        }
        c++;
        for_color++;
        config1.data.datasets.push(newDataset);
        
    });
    joint_chart.update();
    
    
//CHART #2  
    
    
    var config2 = {
			type: 'bar',
			data: {
                labels: scale_title,
                datasets: []
            },
			options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
						scaleLabel: {
							display: true,
							labelString: 'Количество, чел.'
						},
                        ticks: {
                            min:0,
                            stepSize: 1
                        }
					}]
				},
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Количество высоких значений в шкалах. Выборка для групп: '+group_titles
                },
                
				}
		};
    
    
    var chart2 = document.getElementById('canvas2').getContext('2d');
    var risk_chart = new Chart(chart2, config2);
    
    var for_scales = Array();
    
    $.each(checked_box, function(index, value){
        var for_scaleN=0;
        var for_scaleD=0;
        var for_scaleO=0;
        $.each(all_after_query, function(ind, val){
            if(Number(value)==Number(val['group_id']) && Number(val['scaleD'])>16){
                for_scaleD++;
            }
            if(Number(value)==Number(val['group_id']) && Number(val['scaleN'])>16){
                for_scaleN++;
            }
            if(Number(value)==Number(val['group_id']) && Number(val['scaleO'])<8){
                for_scaleO++;
            }
        })
        var add_gr_title2 = $('label[for='+value+']').attr('value'); 
        for_scales.push({title:add_gr_title2, for_D:for_scaleD, for_N:for_scaleO, for_O:for_scaleO});
    })
    var for_color2 =0;
    $.each(for_scales,function(index,value){
        
        if(for_color2==25){
            for_color2=for_color2-25;
        }
        var dataSets2 = {
            label: value['title'],
            backgroundColor: colors[for_color2],
            borderColor: colors[for_color2],
            borderWidth: 1,
            data: [value['for_D'], value['for_N'], value['for_O']]
        }
        config2.data.datasets.push(dataSets2);
        for_color2++;
    })
    risk_chart.update();
    
    
//CHART #2.1  
    
    
    var question_num = Array();
    for(var h=1; h<=74;h++){
        question_num.push(h);
    }
    
    var array_individ = [];
    var k=0;
    $.each(checked_box, function(index, value){
        var take_gr=$('label[for='+value+']').attr('value');
        array_individ.push({title:take_gr});
        var q1=0, q2=0, q3=0, q4=0, q5=0, q6=0, q7=0, q8=0, q9=0, q10=0, q11=0, q12=0, q13=0, q14=0, q15=0, q16=0, q17=0, q18=0, q19=0, q20=0, q21=0, q22=0, q23=0, q24=0, q25=0, q26=0, q27=0, q28=0, q29=0, q30=0, q31=0, q32=0, q33=0, q34=0, q35=0, q36=0, q37=0, q38=0, q39=0, q40=0, q41=0, q42=0, q43=0, q44=0, q45=0, q46=0, q47=0, q48=0, q49=0, q50=0, q51=0, q52=0, q53=0, q54=0, q55=0, q56=0, q57=0, q58=0, q59=0, q60=0, q61=0, q62=0, q63=0, q64=0, q65=0, q66=0, q67=0, q68=0, q69=0, q70=0, q71=0, q72=0, q73=0, q74=0;
        $.each(all_after_query, function(ind, val){
            var split_answ = val['answers'].split('');
            if(val['group_id']==value){
                if(split_answ[0]==1){q1++}; if(split_answ[1]==1){q2++}; if(split_answ[2]==1){q3++}; if(split_answ[3]==1){q4++}; if(split_answ[4]==1){q5++}; if(split_answ[5]==1){q6++}; if(split_answ[6]==1){q7++}; if(split_answ[7]==1){q8++}; if(split_answ[8]==1){q9++}; if(split_answ[9]==1){q10++}; if(split_answ[10]==1){q11++}; if(split_answ[11]==1){q12++}; if(split_answ[12]==1){q13++}; if(split_answ[13]==1){q14++}; if(split_answ[14]==1){q15++}; if(split_answ[15]==1){q16++}; if(split_answ[16]==1){q17++}; if(split_answ[17]==1){q18++}; if(split_answ[18]==1){q19++}; if(split_answ[19]==1){q20++}; if(split_answ[20]==1){q21++}; if(split_answ[21]==1){q22++}; if(split_answ[22]==1){q23++}; if(split_answ[23]==1){q24++}; if(split_answ[24]==1){q25++}; if(split_answ[25]==1){q26++}; if(split_answ[26]==1){q27++}; if(split_answ[27]==1){q28++}; if(split_answ[28]==1){q29++}; if(split_answ[29]==1){q30++}; if(split_answ[30]==1){q31++}; if(split_answ[31]==1){q32++}; if(split_answ[32]==1){q33++}; if(split_answ[33]==1){q34++}; if(split_answ[34]==1){q35++}; if(split_answ[35]==1){q36++}; if(split_answ[36]==1){q37++}; if(split_answ[37]==1){q38++}; if(split_answ[38]==1){q39++}; if(split_answ[39]==1){q40++}; if(split_answ[40]==1){q41++}; if(split_answ[41]==1){q42++}; if(split_answ[42]==1){q43++}; if(split_answ[43]==1){q44++}; if(split_answ[44]==1){q45++}; if(split_answ[45]==1){q46++}; if(split_answ[46]==1){q47++}; if(split_answ[47]==1){q48++}; if(split_answ[48]==1){q49++}; if(split_answ[49]==1){q50++}; if(split_answ[50]==1){q51++}; if(split_answ[51]==1){q52++}; if(split_answ[52]==1){q53++}; if(split_answ[53]==1){q54++}; if(split_answ[54]==1){q55++}; if(split_answ[55]==1){q56++}; if(split_answ[56]==1){q57++}; if(split_answ[57]==1){q58++}; if(split_answ[58]==1){q59++}; if(split_answ[59]==1){q60++}; if(split_answ[60]==1){q61++}; if(split_answ[61]==1){q62++}; if(split_answ[62]==1){q63++}; if(split_answ[63]==1){q64++}; if(split_answ[64]==1){q65++}; if(split_answ[65]==1){q66++}; if(split_answ[66]==1){q67++}; if(split_answ[67]==1){q68++}; if(split_answ[68]==1){q69++}; if(split_answ[69]==1){q70++}; if(split_answ[70]==1){q71++}; if(split_answ[71]==1){q72++}; if(split_answ[72]==1){q73++}; if(split_answ[73]==1){q74++}; 
            }
            
            })
        array_individ[index].q1 = q1;
        array_individ[index].q2 = q2;
        array_individ[index].q3 = q3;
        array_individ[index].q4 = q4;
        array_individ[index].q5 = q5;
        array_individ[index].q6 = q6;
        array_individ[index].q7 = q7;
        array_individ[index].q8 = q8;
        array_individ[index].q9 = q9;
        array_individ[index].q10 = q10;
        array_individ[index].q11 = q11;
        array_individ[index].q12 = q12;
        array_individ[index].q13 = q13;
        array_individ[index].q14 = q14;
        array_individ[index].q15 = q15;
        array_individ[index].q16 = q16;
        array_individ[index].q17 = q17;
        array_individ[index].q18 = q18;
        array_individ[index].q19 = q19;
        array_individ[index].q20 = q20;
        array_individ[index].q21 = q21;
        array_individ[index].q22 = q22;
        array_individ[index].q23 = q23;
        array_individ[index].q24 = q24;
        array_individ[index].q25 = q25;
        array_individ[index].q26 = q26;
        array_individ[index].q27 = q27;
        array_individ[index].q28 = q28;
        array_individ[index].q29 = q29;
        array_individ[index].q30 = q30;
        array_individ[index].q31 = q31;
        array_individ[index].q32 = q32;
        array_individ[index].q33 = q33;
        array_individ[index].q34 = q34;
        array_individ[index].q35 = q35;
        array_individ[index].q36 = q36;
        array_individ[index].q37 = q37;
        array_individ[index].q38 = q38;
        array_individ[index].q39 = q39;
        array_individ[index].q40 = q40;
        array_individ[index].q41 = q41;
        array_individ[index].q42 = q42;
        array_individ[index].q43 = q43;
        array_individ[index].q44 = q44;
        array_individ[index].q45 = q45;
        array_individ[index].q46 = q46;
        array_individ[index].q47 = q47;
        array_individ[index].q48 = q48;
        array_individ[index].q49 = q49;
        array_individ[index].q50 = q50;
        array_individ[index].q51 = q51;
        array_individ[index].q52 = q52;
        array_individ[index].q53 = q53;
        array_individ[index].q54 = q54;
        array_individ[index].q55 = q55;
        array_individ[index].q56 = q56;
        array_individ[index].q57 = q57;
        array_individ[index].q58 = q58;
        array_individ[index].q59 = q59;
        array_individ[index].q60 = q60;
        array_individ[index].q61 = q61;
        array_individ[index].q62 = q62;
        array_individ[index].q63 = q63;
        array_individ[index].q64 = q64;
        array_individ[index].q65 = q65;
        array_individ[index].q66 = q66;
        array_individ[index].q67 = q67;
        array_individ[index].q68 = q68;
        array_individ[index].q69 = q69;
        array_individ[index].q70 = q70;
        array_individ[index].q71 = q71;
        array_individ[index].q72 = q72;
        array_individ[index].q73 = q73;
        array_individ[index].q74 = q74; //сократить
    })
    
    var individ_chart_data = {
			labels: question_num,
			datasets: []

		};
    
    var for_individ = Array();
    
    var for_color4 =0;
    
       $.each(array_individ, function(ind,val){
           var some_num=ind+1;
        if(for_color4==25){
            for_color4=for_color4-25;
        }
        var dataSets4 = {
            label: val['title'],
            backgroundColor: colors[for_color4],
            borderColor: colors[for_color4],
            borderWidth: 1,
            data: []
        }
        
        //config3.data.labels.push(value['title']);
        
        $.each(question_num,function(index,value){
                dataSets4.data.push(val['q'+value]);
            
        })
           individ_chart_data.datasets.push(dataSets4);
        for_color4++;
    }) 
    console.log(individ_chart_data);
    var config4 = {
			type: 'bar',
			data: individ_chart_data,
			options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
						scaleLabel: {
							display: true,
							labelString: 'Количество ответов, чел.'
						},
                        ticks: {
                            min:0,
                            stepSize: 1
                        }
					}]
				},
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Количество положительных ответов на вопросы. Выборка для групп: '+group_titles
                },
                
				}
		};
    
   
    var chart4 = document.getElementById('canvas4').getContext('2d');
    var individ_chart = new Chart(chart4, config4);
    
    
    
    
//CHART #3
    
    
    var config3 = {
			type: 'bar',
			data: {
                labels: ['Группа'],
                datasets: []
            },
			options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true
                        },
						scaleLabel: {
							display: true,
							labelString: 'Количество, чел.'
						},
                        ticks: {
                            min:0,
                            stepSize: 1
                        }
					}]
				},
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Количество человек в зоне риска. Выборка для групп: '+group_titles
                },
                
				}
		};
    
   
    var chart3 = document.getElementById('canvas3').getContext('2d');
    var danger_chart = new Chart(chart3, config3);
    
    var for_new_datasets = Array();
    
    $.each(checked_box, function(index, value){
        var count_people = 0;
        $.each(all_after_query, function(ind, val){
            if(Number(value)==Number(val['group_id']) && Number(val['danger'])==1){
                count_people++;
            }
        })
        var add_gr_title = $('label[for='+value+']').attr('value'); 
        for_new_datasets.push({title:add_gr_title, count:count_people});
    })
    
    var for_color3 =0;
    $.each(for_new_datasets,function(index,value){
        
        if(for_color3==25){
            for_color3=for_color3-25;
        }
        var dataSets3 = {
            label: value['title'],
            backgroundColor: colors[for_color3],
            borderColor: colors[for_color3],
            borderWidth: 1,
            data: [value['count']]
        }
        //config3.data.labels.push(value['title']);
        config3.data.datasets.push(dataSets3);
        for_color3++;
    })
    danger_chart.update();
});


$(document).on('click', '#report', function(){
    var now = new Date();
    var groups = Array();
    var chb = [];
    $('input:checkbox:checked').each(function() {
	chb.push($(this).val());
    })
    $.each(chb, function(index, value){
        var tg=$('label[for='+value+']').attr('value');
        groups.push(tg);
    })
    //console.log(groups);
    var ctp1 = document.getElementById('canvas1');
    var ctp2 = document.getElementById('canvas2');
    var ctp3 = document.getElementById('canvas3');
    var ctp4 = document.getElementById('canvas4');
    var quality = 1;
    var chart_img1 = {
        data: ctp1.toDataURL('image/png', quality),
        height: ctp1.height,
        width: ctp1.width
    };
    var chart_img2 = {
        data: ctp2.toDataURL('image/png', quality),
        height: ctp2.height,
        width: ctp2.width
    };
    var chart_img3 = {
        data: ctp3.toDataURL('image/png', quality),
        height: ctp3.height,
        width: ctp3.width
    };
    var chart_img4 = {
        data: ctp4.toDataURL('image/png', quality),
        height: ctp4.height,
        width: ctp4.width
    };
    
    var PDFdoc = new jsPDF();
    PDFdoc.addFont("../fonts/arial.ttf", "Arial", "normal");
    PDFdoc.setFont("Arial");
    PDFdoc.setFontSize(14);
    PDFdoc.text("КГАПОУ «Пермский авиационный техникум им. А.Д. Швецова»", 35, 10);
    PDFdoc.text("Психологическое тестирование", 73, 20);
    PDFdoc.text("Отчет от "+now.toLocaleString(), 75, 30);
    PDFdoc.text("Выборка для групп: "+groups, 15, 40);
    //PDFdoc.text("Отчет от "+now.toLocaleDateString(), 10, 10);
    PDFdoc.addImage(chart_img1.data, 'PNG', 10, 45, 195, 120);
    PDFdoc.addImage(chart_img3.data, 'PNG', 10, 170, 195, 120);
    PDFdoc.addPage("a4", "l");
    PDFdoc.addImage(chart_img4.data, 'PNG', 10, 10, 275, 185);
    PDFdoc.addPage("a4", "p");
    PDFdoc.addImage(chart_img2.data, 'PNG', 10, 10, 195, 120);
    PDFdoc.output('save', 'Отчет.pdf');
})
