import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/AppContainer.jsx'
import configureStore from './Store.js'
import {Provider} from 'react-redux'

let store = configureStore();

(function($) {
    $(document).ready(() => {
        $(".btn").mouseup(function() {
            $(this).blur();
        })
    })
})(jQuery);

//attach quicktree to jquery
(function($) {
    $.fn.quicktree = function() {
        function click(e) {
            var a = $(this);
            a.next('ul').children("li").toggle();
            e.preventDefault();
        }

        function child_inserted(e) {
            var new_child = $(e.target);
            if (new_child.parent().get(0) === this) {
                new_child.children('a').click(click);
                new_child.children('ul').quicktree()
            }
        }

        // Grab the LI's and iterate over them
        $(this).find("li").each(function(ind) {
            var t = $(this);
            t.children("a").click(click);
            t.children('ul').quicktree();

            //perform click to start with list closed
            t.children("a").click();
        });

        $(this).on("DOMNodeInserted", child_inserted);
        return this;
    };
}(jQuery));

ReactDOM.render(
    <Provider store={store}>
    <AppContainer/>
</Provider>, document.getElementById('app'));
