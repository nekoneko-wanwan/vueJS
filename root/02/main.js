var start = function() {


   var vm = new Vue({
        el: '#demo',
        data: {
        }
    });


    /**
     * ajaxで取得したデータをdataプロパティに追加する
     * 複数処理を行う必要がなければ、getJsonToAct(PATH, function(){};) で記述していった方がシンプル
     *
     * @_addFn: item_list[]を追加し、データをpushしていく処理
     * @_test   : 適当な処理（ここでは複数の関数を処理するのが目的のため作成）
     * @_allFn  : getJsonToActで実行したい関数を配列にまとめる（正確には処理にjsonデータが必要となるもの）
     * @init    : getJsonToActにPATHと_allFnを渡して実行する
     */
    var addItems = {
        _addFn : function(jsonData) {
            var i, l, arr = [];
            // dataにitem_list[]を追加
            vm.$data.$add('item_list', arr);

            // jsonDataの数だけオブジェクトとして配列に追加していく
            for (i = 0, l = jsonData.length; i < l; i++) {
                vm.$data.item_list[i] = {
                    itemName  : jsonData[i].name,
                    itemId    : jsonData[i]._id,
                    itemAbout : jsonData[i].about
                };
            }
        },
        _test: function(jsonData) {
            // 書き換えてみる
            vm.$data.item_list[0].itemId = 'HOGEHOGEHGOE';
        },
        _allFn: function() {
            var arr = [
                this._addFn,
                this._test
            ];
            return arr;
        },
        init: function() {
            getJsonToAct('./dmy.json', this._allFn());
        }
    };


    /**
     * ajaxデータをシンプルに利用するサンプル
     */
     getJsonToAct('./dmy.json', function(jsonData) {
        var jd = jsonData;
        console.log(jd);
     });


    /**
     * 初期化
     */
    addItems.init();


    // ここでitem_listの値を書き換えるには、$ajaxの非同期処理が終わってから出ないとダメ
    // setTimeout(function() {
    //     console.log(vm.$data.item_list);
    //     vm.$data.item_list[0].itemId = 'HOGEHOGEHGOE';
    // }, 1000);


// ---------- END start
};


/**
 * jsonデータを取得して何かしらの処理を行う汎用的な関数
 *
 * @param1  {string}   PATH 取得先のURL
 * @param2  {array}    fn 処理したい関数をまとめた配列（各関数は引数ごと渡している）
 * @param2  {function} fn 複数の場合は↑arrayだが、単一の場合はfunctionとなる
 * @return  {function} 渡された関数（各関数）に、jsonデータを設定して処理する
 */
function getJsonToAct(PATH, fn) {
    $.ajax({
        url      : PATH,
        type     : 'get',
        // async     : false,
        dataType : 'json'
    })
    .done(function(data, status) {
        var i, l;
        if(status === 'success') {
            // fnが複数かどうかチェックし（配列かどうか）、各関数もしくは単体関数を実行する
            if ($.isArray(fn)) {
                // 配列の場合
                for (i = 0, l = fn.length; i < l; i++) {
                    fn[i](data);
                }
            } else {
                fn(data);
            }
        }
    })
    .fail(function(data, status) {
        // console.log("error");
    })
    .always(function() {
        // console.log("complete");
    });
}


window.onload = function() {
    start();
};