<template>

    <div class="row">
        <div class="col-md-12" v-if="!analyzed">
            <div class="box box-primary box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">About the AFL Tool</h3>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool" data-widget="collapse">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body">
                    <p>
                        Everything we do is connected with futility: freedom, beauty, totality, awareness. All special spirits feel each other, only important believers have an awareness.</p>
                    <p>
                        Over there of uniqueness will esoterically absorb a calm self. Who can praise the justice and heaven of a sinner if he has the psychic freedom of the lord!</p>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <div class="box box-primary box-solid">
                <div class="box-header with-border">
                    <h3 class="box-title">Text to analyze</h3>
                    <div class="box-tools pull-right">
                        <button id="collapse_text" type="button" class="btn btn-box-tool" data-widget="collapse">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="box-body">
                    <h4 v-if="analyzed"> You can imagine that <span style="background-color: #FFFF00;">highlighted</span> words carry suggestions to improve readability (Too hard to implement)</h4>
                    <textarea id="text" v-model="text" class="form-control input-lg" rows="10"
                              placeholder="Paste the text you wish to analyze"></textarea>
                    <br>
                    <button class="btn btn-flat pull-right btn-primary btn-md" :disabled="text == ''"
                            @click="analyze()">Analyze

                    </button>
                    <button class="btn btn-flat pull-left btn-primary btn-md margin-r-5"
                            :disabled="text == ''"
                            @click="clear()" data-toggle="tooltip" title="Clear text">Clear


                    </button>
                    <button class="btn btn-flat pull-left btn-primary btn-md" :disabled="text != ''"
                            @click="autoFill()"
                            data-toggle="tooltip" title="Translated text from excerpt 2">Autofill



                    </button>
                </div>
            </div>
        </div>

        <template v-if="analyzed">
            <div class="col-md-12">
                <div class="box box-primary box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Desired level of complexity (Current: 3)</h3>
                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <h4><i class="fa fa-exclamation-triangle text-blue"></i>The higher the desired complexity level, the less readable it will be.









                            <small>Changing the value will automatically update the complexity metrics.</small>
                        </h4>
                        <br><br>
                        <vue-slider ref="slider" v-model="complexity.value" :data="complexity.data"
                                    :piecewise="complexity.piecewise" :piecewiseLabel="complexity.piecewiseLabel"
                                    :piecewiseStyle="complexity.piecewiseStyle"
                                    :piecewiseActiveStyle="complexity.piecewiseActiveStyle"
                                    :labelActiveStyle="complexity.labelActiveStyle" :width="complexity.width"
                                    :style="complexity.style" :refresh="getComplexityChart()"></vue-slider>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="box box-primary box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Complexity Metrics</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="complexity_chart_container" class="chart">
                            <canvas id="complexity_chart" style="height:230px"></canvas>
                            <button class="btn btn-primary btn-flat pull-right" @click="getComplexityChart()">
                                Refresh


                            </button>
                        </div>
                    </div>
                </div>
                <div class="box box-primary box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Percentage Metrics</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="percentage_chart_container" class="chart">
                            <canvas id="percentage_chart" style="height:230px"></canvas>
                            <button class="btn btn-primary btn-flat pull-right" @click="getPercentageChart()">Refresh


                            </button>
                        </div>
                        <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #f56954" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Nouns



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #00a65a" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Pronouns


                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #f39c12" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Verbs



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #00c0ef" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Adjectives



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #3c8dbc" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Adverbs



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #d2d6de" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Other parts of speech



                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="box box-primary box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">General Metrics</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <div id="metrics_chart_container" class="chart">
                            <canvas id="metrics_chart" style="height:230px"></canvas>
                            <button class="btn btn-primary btn-flat pull-right" @click="getMetricsChart()">Refresh


                            </button>
                        </div>
                        <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #f56954" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Open Class Tokens



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #00a65a" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Types


                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #f39c12" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Morphemes



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #00c0ef" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Characters



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #3c8dbc" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Diacritics



                                </li>
                            </ul>
                            <ul class="fc-color-picker col-md-6">
                                <li>
                                    <a style="color: #d2d6de" href="javascript:void(0)"> <i
                                            class="fa fa-square"></i></a> Tokens



                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="box box-primary box-solid">
                    <div class="box-header with-border">
                        <h3 class="box-title">Other statistics</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse"><i
                                    class="fa fa-minus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="box-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="2">Averages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Average sentence length in tokens</td>
                                    <td>3.9</td>
                                </tr>
                                <tr>
                                    <td>Average sentence length in morphemes </td>
                                    <td>7.4</td>
                                </tr>
                                <tr>
                                    <td>Average sentence length in characters </td>
                                    <td>9.7</td>
                                </tr>
                                <tr>
                                    <td>Total ambiguous types per document</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>Total frequent types per document </td>
                                    <td>32</td>
                                </tr>
                                <tr>
                                    <td>Total frequency of tokens</td>
                                    <td>24</td>
                                </tr>
                                <tr>
                                    <td>Total closed-class tokens</td>
                                    <td>17</td>
                                </tr>
                            </tbody>
                            <thead>
                                <tr>
                                    <th colspan="2">Timings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Reading time</td>
                                    <td>3:25</td>
                                </tr>
                                <tr>
                                    <td>Speaking time</td>
                                    <td>4:15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
    </div>

</template>

<script>
    import swal from 'sweetalert2'
    import vueSlider from 'vue-slider-component'

    export default{

        components: {vueSlider},

        data() {
            return {
                text: '',
                analyzed: false,
                complexity: {
                    value: 3,
                    tooltip: 'always',
                    piecewise: true,
                    piecewiseLabel: true,
                    data: [0, 1, 2, 3, 4, 5],
                    piecewiseStyle: {
                        'backgroundColor': '#ccc',
                        'visibility': 'visible',
                        'width': '12px',
                        'height': '12px'
                    },
                    piecewiseActiveStyle: {
                        'backgroundColor': '#3498db'
                    },
                    labelActiveStyle: {
                        'color': '#3498db'
                    },
                    width: '80%',
                    style: {
                        'marginLeft': '10%'
                    }

                }
            }
        },
        methods: {
            autoFill(){
                $('#text').css({'direction': 'rtl'});
                this.text = "ذهب الأمير الصغير أن ننظر إلى الورود مرة أخرى. أنت لست على الإطلاق مثل ردتي. أنت لا شيء على الإطلاق حتى الآن، وقال لهم. وترويض لك لا أحد وأنت لم تروض أي شخص. أنت الطريق كان لي الثعلب، وكان مجرد ثعلب مثل مئات آلاف آخرين، ولكن لقد جعلته صديقي، والآن هو الثعلب الوحيد في كل العالم. وكانت خاشعة الورود. كنت جميلة، ولكن هل إعادة فارغة، وذهب واحد لا يمكن أن يموت من أجل لكم. وبطبيعة الحال، والمارة العادية أعتقد ردتي بدت مثلك، ولكن وردتي، كل في بلدها، هو أكثر أهمية من كل واحد منكم معا، منذ انها واحدة لقد الماء. وبما أنها هي واحدة وضعت تحت الزجاج. بما أنها واحدة وأنا محمية وراء حجاب. بما أنها واحدة لأعطيه قتل اليرقات (باستثناء اثنين أو ثلاثة لالفراشات). بما أنها ل واحد استمعت إلى عندما اشتكت، أو عندما تفاخر، أو حتى في بعض الأحيان عندما قالت لا شيء على الإطلاق. بما أنها وردتي."
            },

            analyze(){
                swal({
                    title: 'Analysis Complete',
                    text: 'Your text has been successfully analyzed.',
                    type: 'success',
                    timer: 3000,
                    showConfirmButton: false,
                });
                this.analyzed = true;
                window.text = this.text;
                $(function () {
//                    $('#collapse_text').click();
                    var text = window.text;
                    var words = window.text.split(' ');

                    var random = [];
                    for (var i = 0; i < 6; i++) {
                        var rn = Math.floor(Math.random() * words.length);
                        random.push(words[rn]);
                        words.splice(rn, 1);
                    }

                    $('textarea').highlightTextarea({
                        words: random
                    });
                });
                this.getComplexityChart();
                this.getMetricsChart();
                this.getPercentageChart();
            },

            clear(){
                $('#text').css({'direction': 'ltr'});
                this.text = '';
                this.analyzed = false;
            },

            getComplexityChart(){
                window.complexity = this.complexity;
                $(function () {
                    $("#complexity_chart").remove();
                    $("#complexity_chart_container").append("<canvas id='complexity_chart' style='height:230px'></canvas>");
                    let barChartCanvas = $("#complexity_chart").get(0).getContext("2d");
                    let barChart = new Chart(barChartCanvas);
                    let barChartData = {
                        labels: ["Complexity Level", "Text Quality", "Readability Score"],
                        datasets: [
                            {
                                label: "Desired",
                                fillColor: "rgba(210, 214, 222, 1)",
                                strokeColor: "rgba(210, 214, 222, 1)",
                                pointColor: "rgba(210, 214, 222, 1)",
                                pointStrokeColor: "#c1c7d1",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(220,220,220,1)",
                                data: [(window.complexity.value + 1) * 15, (window.complexity.value + 1) * 7, (window.complexity.value + 1) * 9]
                            },
                            {
                                label: "Actual",
                                fillColor: "rgba(60,141,188,0.9)",
                                strokeColor: "rgba(60,141,188,0.8)",
                                pointColor: "#3b8bba",
                                pointStrokeColor: "rgba(60,141,188,1)",
                                pointHighlightFill: "#fff",
                                pointHighlightStroke: "rgba(60,141,188,1)",
                                data: [28, 48, 40]
                            }
                        ]
                    };
                    barChartData.datasets[1].fillColor = "#3C8DBC";
                    barChartData.datasets[1].strokeColor = "#3C8DBC";
                    barChartData.datasets[1].pointColor = "#3C8DBC";
                    let barChartOptions = {
                        scaleBeginAtZero: true,
                        scaleShowGridLines: true,
                        scaleGridLineColor: "rgba(0,0,0,.05)",
                        scaleGridLineWidth: 1,
                        scaleShowHorizontalLines: true,
                        scaleShowVerticalLines: true,
                        barShowStroke: true,
                        barStrokeWidth: 2,
                        barValueSpacing: 5,
                        barDatasetSpacing: 1,
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
                        responsive: true,
                        maintainAspectRatio: true
                    };

                    barChartOptions.datasetFill = false;
                    barChart.Bar(barChartData, barChartOptions);
                });
            },

            getMetricsChart(){
                $(function () {
                    $("#metrics_chart").remove();
                    $("#metrics_chart_container").append("<canvas id='metrics_chart' style='height:230px'></canvas>");
                    let pieChartCanvas = $("#metrics_chart").get(0).getContext("2d");
                    let pieChart = new Chart(pieChartCanvas);
                    let PieData = [
                        {
                            value: 700,
                            color: "#f56954",
                            highlight: "#f56954",
                            label: "Open Class Tokens"
                        },
                        {
                            value: 500,
                            color: "#00a65a",
                            highlight: "#00a65a",
                            label: "Types"
                        },
                        {
                            value: 400,
                            color: "#f39c12",
                            highlight: "#f39c12",
                            label: "Morphemes"
                        },
                        {
                            value: 600,
                            color: "#00c0ef",
                            highlight: "#00c0ef",
                            label: "Characters"
                        },
                        {
                            value: 300,
                            color: "#3c8dbc",
                            highlight: "#3c8dbc",
                            label: "Diacritics"
                        },
                        {
                            value: 1200,
                            color: "#d2d6de",
                            highlight: "#d2d6de",
                            label: "Tokens"
                        }
                    ];
                    let pieOptions = {
                        segmentShowStroke: true,
                        segmentStrokeColor: "#fff",
                        segmentStrokeWidth: 2,
                        percentageInnerCutout: 50,
                        animationSteps: 100,
                        animationEasing: "easeOutBounce",
                        animateRotate: true,
                        animateScale: false,
                        responsive: true,
                        maintainAspectRatio: true,
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    };
                    pieChart.Pie(PieData, pieOptions);
                });
            },

            getPercentageChart(){
                $(function () {
                    $("#percentage_chart").remove();
                    $("#percentage_chart_container").append("<canvas id='percentage_chart' style='height:230px'></canvas>");
                    let pieChartCanvas = $("#percentage_chart").get(0).getContext("2d");
                    let pieChart = new Chart(pieChartCanvas);
                    let PieData = [
                        {
                            value: 13.1,
                            color: "#f56954",
                            highlight: "#f56954",
                            label: "Nouns"
                        },
                        {
                            value: 20.7,
                            color: "#00a65a",
                            highlight: "#00a65a",
                            label: "Pronouns"
                        },
                        {
                            value: 22.5,
                            color: "#f39c12",
                            highlight: "#f39c12",
                            label: "Verbs"
                        },
                        {
                            value: 4.2,
                            color: "#00c0ef",
                            highlight: "#00c0ef",
                            label: "Adjectives"
                        },
                        {
                            value: 7,
                            color: "#3c8dbc",
                            highlight: "#3c8dbc",
                            label: "Adverbs"
                        },
                        {
                            value: 37.5,
                            color: "#d2d6de",
                            highlight: "#d2d6de",
                            label: "Other parts of speech"
                        }
                    ];
                    let pieOptions = {
                        segmentShowStroke: true,
                        segmentStrokeColor: "#fff",
                        segmentStrokeWidth: 2,
                        percentageInnerCutout: 50,
                        animationSteps: 100,
                        animationEasing: "easeOutBounce",
                        animateRotate: true,
                        animateScale: false,
                        responsive: true,
                        maintainAspectRatio: true,
                        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
                    };
                    pieChart.Pie(PieData, pieOptions);
                });
            },

            highlights(){
                $(function () {

                });
            }
        }

    }
</script>

<style>
    textarea {
        resize: none;
    }

    .fc-color-picker li {
        font-size: 16px;
    }

    th {
        text-align: center;
    }
</style>