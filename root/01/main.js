var demo;
var start = function() {

    demo = new Vue({
        el: '#demo',
        data: {
            title: 'todos',
            todos: [
                {
                    done: true,
                    content: 'Learn JavaScript'
                },
                {
                    done: false,
                    content: 'Learn Vue.js'
                }
            ],
            message :  'messageに表示させる',
            w: 200,
            h: 50,
            user: {
                firstName: 'yamada',
                lastName: 'taro'
            },
            isOwner: true
        },
        methods: {
            clickHandler : function() {
                alert("クリックされたよ！");
            },
            onClick: function() {
                console.log('クリックされた');
            },
            onKeydown: function() {
                console.log('キーが押された');
            },
            onKeyup: function() {
                console.log('キーが戻された');
            }
        }
    });


    // console.log(demo.$el);    // <div id="demo"></div>
    // console.log(demo.$data);  // Object {title:..., todos...}

    // 自動で値を書き換える
    // モデルのdata書き換えることで自動的にビューへ反映される
    var i = 0;
    var tmpTimer = setInterval(function() {
        var obj = {
            done: false,
            content: demo.$data.todos[1].content + 'から' + i + '番目の要素を自動追加'
        };
        demo.$data.todos.push(obj);
        demo.$data.w += 100;
        if(i === 2) {
            clearInterval(tmpTimer);
        }
        i++;

    },1000);



// ---------- END start
};

window.onload = function() {
    start();
};