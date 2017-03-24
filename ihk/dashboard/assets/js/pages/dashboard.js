$(document).ready(function () {

    // CounterUp Plugin
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // setTimeout(function() {
    //     toastr.options = {
    //         closeButton: true,
    //         progressBar: true,
    //         showMethod: 'fadeIn',
    //         hideMethod: 'fadeOut',
    //         timeOut: 5000
    //     };
    //     toastr.success('Checkout settings menu on left!', 'Welcome to Modern!');
    // }, 1800);

    var flot2 = function () {

        // We use an inline data source in the example, usually data would
        // be fetched from a server

        var memory = [], cpu = [],
            totalPoints = 100;

        function getRandomMemory() {

            if (memory.length > 0)
                memory = memory.slice(1);

            // Do a random walk

            while (memory.length < totalPoints) {

                var prev = memory.length > 0 ? memory[memory.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }

                memory.push(y);
            }

            // Zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < memory.length; ++i) {
                res.push([i, memory[i]])
            }

            return res;
        }

        function getRandomCPU() {

            if (cpu.length > 0)
                cpu = cpu.slice(1);

            // Do a random walk

            while (cpu.length < totalPoints) {

                var prev = cpu.length > 0 ? cpu[cpu.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;

                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }

                cpu.push(y);
            }

            // Zip the generated y values with the x values

            var res = [];
            for (var i = 0; i < cpu.length; ++i) {
                res.push([i, cpu[i]])
            }

            return res;
        }

        var plot2 = $.plot("#flotchart2", [getRandomMemory()], {
            series: {
                shadowSize: 0	// Drawing is faster without shadows
            },
            yaxis: {
                min: 0,
                max: 100
            },
            xaxis: {
                show: false
            },
            colors: ["#22BAA0", "#F46F6F"],
            legend: {
                show: true
            },
            grid: {
                color: "#AFAFAF",
                hoverable: true,
                borderWidth: 0,
                backgroundColor: '#FFF'
            },
            tooltip: true,
            tooltipOpts: {
                content: "%y%",
                defaultTheme: false
            }
        });

        function update() {
            plot2.setData([getRandomMemory(), getRandomCPU()]);
            console.log(plot2.getData());
            plot2.draw();
            setTimeout(update, 30);
        }

        update();

    };

    flot2();
    var flot1 = function () {
        var data = [[0, 65], [1, 59], [2, 80], [3, 81], [4, 56], [5, 55], [6, 40]];
        var data2 = [[0, 92], [1, 74], [2, 40], [3, 61]];
        var dataset = [
            {
                label: 'Thursday, March 23',
                data: data,
                color: "#828282",
                lines: {
                    show: true,
                    fill: 0.2
                },
                shadowSize: 0
            },
            {
                data: data,
                color: "#fff",
                lines: {
                    show: false
                },
                points: {
                    show: true,
                    fill: 0.2,
                    radius: 4,
                    fillColor: "#828282",
                    lineWidth: 2
                },
                curvedLines: {
                    apply: false
                },
                shadowSize: 0
            },
            {
                label: 'Friday, March 24',
                data: data2,
                color: "#22BAA0",
                lines: {
                    show: true,
                    fill: 0.2
                },
                shadowSize: 0
            },
            {
                data: data2,
                color: "#fff",
                lines: {
                    show: false
                },
                curvedLines: {
                    apply: false
                },
                points: {
                    show: true,
                    fill: true,
                    radius: 4,
                    fillColor: "#22BAA0",
                    lineWidth: 2
                },
                shadowSize: 0
            }
        ];

        var ticks = [[0, "8 am"], [1, "10 am"], [2, "12 pm"], [3, "2 pm"], [4, "4 pm"], [5, "6 pm"], [6, "8 pm"]];

        var plot1 = $.plot("#flotchart1", dataset, {
            series: {
                color: "#14D1BD",
                lines: {
                    show: true,
                    fill: 0.2
                },
                shadowSize: 0,
                curvedLines: {
                    apply: true,
                    active: true
                }
            },
            xaxis: {
                ticks: ticks
            },
            legend: {
                show: true,
                noColumns: 2,
                container: $("#legend1")
            },
            grid: {
                color: "#AFAFAF",
                hoverable: true,
                borderWidth: 0,
                backgroundColor: '#FFF'
            },
            tooltip: true,
            tooltipOpts: {
                content: "%y%",
                defaultTheme: false
            },
            colors: [ "#faa732", "#da4f49"]
        });

    };

    flot1();

    $(".live-tile").liveTile();

});