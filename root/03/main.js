window.onload = function() {
    /* データバインディングして画面に表示してみる --------------------------------- */
    var vm1 = new Vue({
        el: '#sample01',
        data: {
            bind1: '111',
            bind2: '222',
            bind3: '333'
        }
    });


    /* methodsを使ったデータ・アクセス --------------------------------- */
    var vm2 = new Vue({
        el: '#sample02',
        data: {
            firstName: 'taro',
            lastName: 'yamada'
        },
        methods: {
            fullName: function() {
                // thisはビューモデル自身を指す
                return this.firstName + ' ' + this.lastName;
            }
        }
    });


    /* computedを使ったデータ・アクセス --------------------------------- */
    var vm3 = new Vue({
        el: '#sample03',
        data: {
            firstName: 'jiro',
            lastName: 'sato'
        },
        computed: {
            fullName: {
                get: function() {
                    return this.firstName + ' ' + this.lastName;
                }
                // setの定義もできる
            }
        }
    });


    /* el要素のstyle属性にアクセス --------------------------------- */
    var vm4 = new Vue({
        el: '#sample04',
        paramAttributes: ['style'],
        data: {
            text: ''
        }
    });
    vm4.$data.text = vm4.style; // vm4.style -> font-size: 30px; margin-bottom: 20px;


    /* テンプレートを使う --------------------------------- */
    var vm5 = new Vue({
        el: '#sample05',
        template: '<p>p要素を追加</p>',
        replace: true  // trueでel要素自体が書き換わる。つまり<p id="sample05">となる
    });


    /* イベントフックな関数定義 --------------------------------- */
    var vm6 = new Vue({
        el: '#sample06',
        data: {
            value: 'hello',
            log: ''
        },
        // ビューモデルの初期化時、データバインド前に実行される
        created: function() {
            console.log('この段階では... ' + this.value);  // hello
            // データバインド時にコールバック関数（ここでは無名関数）が実行される
            this.$watch('value', function(newValue, oldValue) {
                console.log('この段階では... ' + this.value); // こんにちわ
                this.log = oldValue + ' から ' + newValue + 'に変わりました';
            });
        }
    });
    vm6.$data.value = 'こんにちわ'; // $watchメソッドに渡した関数が実行される


    /* カスタムディレクティブv-consolelogの実装 --------------------------------- */
    var vm7 = new Vue({
        el: '#sample07',
        data: {
            foo: 'CustomDirective'
        },
        directives: {
            consolelog: function(value) {
                console.log(value);  // CustomDirectiveが出力
            }
        }
    });


    /* カスタムフィルタ実装 --------------------------------- */
    var vm8 = new Vue({
        el: '#sample08',
        data: {
            foo: [4, 2, 3, 1, 5]
        },
        filters: {
            mysort: function(value) {
                return value.sort();  // 1, 2, 3, 4, 5で出力される
            }
        }
    });


    /* partialsオプション実装 --------------------------------- */
    var vm9 = new Vue({
        el: '#sample09',
        partials: {
            foo: '#other'  // #otherの中のコンテキストをそのままfooに追加できる
        }
    });


};