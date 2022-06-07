var biasArr = [0, 0, 0, 0, 0];
//정치 경제 사회 생활 과학

localStorage.getItem("biasArr") ? biasArr = JSON.parse(localStorage.getItem("biasArr")) : biasArr = [0, 0, 0, 0, 0];
localStorage.getItem("biasDegree") ? $('#biasScore').text(Math.round(localStorage.getItem("biasDegree")) + '점') : $('#biasScore').text('읽은 기사 없음');

//네이버 뉴스
$.ajax({
    url: 'http://localhost:5000/search/news?query=정치',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < data.items.length; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(0);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

$.ajax({
    url: 'http://localhost:5000/search/news?query=경제',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < data.items.length; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(1);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

$.ajax({
    url: 'http://localhost:5000/search/news?query=사회',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < data.items.length; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(2);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

$.ajax({
    url: 'http://localhost:5000/search/news?query=생활',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < data.items.length; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(3);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

$.ajax({
    url: 'http://localhost:5000/search/news?query=IT',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < 5; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(4);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

$.ajax({
    url: 'http://localhost:5000/search/news?query=기술',
    dataType: 'json',
    success: function (data) {
        console.log(data.items);
        for (var i = 0; i < 5; i++) {
            var title = data.items[i].title;
            var link = data.items[i].link;
            var description = data.items[i].description;
            var pubDate = data.items[i].pubDate;
            var news = '<a class="item" href="javascript:openArticle(4);window.open(\'' + link + '\')"><div class="card"><span class="title">' + title + '</span><br><span class="date">' + moment(pubDate).format('YYYY년 MM월 DD일 hh시 mm분') + '</span></div></a>';
            $('#news-result').append(news);
        }
        shuffle();
    }
});

//기사 섞기
function shuffle() {
    var $items = $('#news-result').children('.item');
    var items = $items.get();
    for (var i = items.length; i--;) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = items[i];
        items[i] = items[j];
        items[j] = temp;
    }
    $items = $(items);
    $('#news-result').empty().append($items);
}


function openArticle(category) {
    biasArr[category] += 1;
    localStorage.setItem("biasArr", JSON.stringify(biasArr));
    drawBiasChart();
    calculateBias();

}

$.ajax({
    url: 'http://localhost:5000/trend',
    dataType: 'json',
    success: function (data) {
        const words = [];

        for (var i = 0; i < 30; i++) {
            words.push({ "x": data.categoryKeyword[i].NAMED_ENTITY, "value": data.categoryKeyword[i].NAMED_ENTITY_COUNT, category: 'keyword' });
        }

        drawTrendChart(words);
    }
});


function calculateBias() {
    var arrSum = 0;
    for (var i = 0; i < biasArr.length; i++) {
        arrSum += biasArr[i];
    }

    var mean = arrSum / biasArr.length;   /* 평균값 구하기 */
    var devTotal = 0;   /* 편차값의 합계 구하기 */
    for (var i = 0; i < biasArr.length; i++) {
        var dev = biasArr[i] - mean;
        devTotal += dev * dev;
    }

    var variance = devTotal / biasArr.length;   /* 모분산값 구하기 */
    var sVariance = devTotal / (biasArr.length - 1);   /* 표본분산값 구하기 */
    var stdDev = Math.sqrt(devTotal / biasArr.length);   /* 모표준편차값 구하기 */
    var sStdDev = Math.sqrt(devTotal / (biasArr.length - 1));   /* 표본표준편차값 구하기 */

    console.log(variance, sVariance);

    localStorage.setItem("biasDegree", variance);
    $('#biasScore').text(Math.round(variance) + '점');

    if (variance >= 10) {
        $('.alert').fadeIn();
    }
}


function drawTrendChart(words) {
    anychart.onDocumentReady(function () {
        var chart = anychart.tagCloud(words);
        chart.angles([0]);
        chart.container("container");
        chart.draw();
    });
}

drawBiasChart();
function drawBiasChart() {
    anychart.onDocumentReady(function () {
        $('#bias-container').empty();

        var chart = anychart.pie([
            ['정치', biasArr[0]],
            ['경제', biasArr[1]],
            ['사회', biasArr[2]],
            ['생활', biasArr[3]],
            ['과학', biasArr[4]],
        ]);

        // set container id for the chart
        chart.container('bias-container');
        // initiate chart drawing
        chart.draw();
    });
}



function toggleChart() {
    if ($('#chart-section').is(':visible')) {
        $('#chart-section').fadeOut();
        $('.toggleBtn').html(`<ion-icon name="chevron-down-circle-outline"></ion-icon> 분석&nbsp;&nbsp;<ion-icon name="analytics-outline">
        </ion-icon>`);
    } else {
        $('#chart-section').fadeIn();
        $('.toggleBtn').html(`<ion-icon name="chevron-up-circle-outline"></ion-icon> 분석&nbsp;&nbsp;<ion-icon name="analytics-outline">
        </ion-icon>`);
    }
}