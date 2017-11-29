Mura.DisplayObject.toc = Mura.UI.extend({

    // Mura invokes this method by default
    render: function() {
        var container = this.context.targetEl;
        var title = this.context.title;
        if (title === undefined)
            title = "Table of Contents";
        var listType = this.context.listtype || "ul";
        var maxDepth = this.context.maxdepth || 5;
        var hElements = this.getHeaderElements(maxDepth);
        container.innerHtml = '';
        if (hElements.length > 0) {
            var div = document.createElement('div');
            div.classList.add('pageTOC');
            if (title != '') {
                var h2 = document.createElement('h2');
                h2.appendChild(document.createTextNode(title));
                div.appendChild(h2);
            }
            var list = this.createList(hElements, listType);
            div.appendChild(list);
            container.appendChild(div);
        } else {
            var p = document.createElement('p');
            p.appendChild(document.createTextNode("No heading element found in the page."));
            container.appendChild(p);
        }
    },

    getHeaderElements: function(maxDepth) {
        var selectString = '';
        for (var i=2; i<=maxDepth; i++) {
            if (i > 2)
                selectString += ', ';
            selectString += 'h' + i;
        }
        var nodeList = document.querySelectorAll(selectString);
        // filter out elements inside an aside, .mura-sidebar-container, .pageTOC, header or footer
        var elements = [];
        for (var i=0; i<nodeList.length; i++) {
            var h = nodeList[i];
            var skip = false;
            var p = h.parentElement;
            while (p != null) {
                if (p.nodeName == 'ASIDE' || p.nodeName == 'HEADER' || p.nodeName == 'FOOTER' ||
                        p.id == 'mura-sidebar-container' || p.classList.contains('pageTOC')) {
                    skip = true;
                    break;
                }
                p = p.parentElement;
            }
            if (!skip)
                elements.push(h);
        }
        return elements;
    },

    createList: function(hElements, listNodeName) {
        var list = document.createElement(listNodeName);
        var currentList = list;
        var level = 2;
        var addClickHandler = function(item, h) {
            item.addEventListener('click', function(e) {
                h.scrollIntoView();
                e.preventDefault();
            }, false);
        }
        for (var i=0; i < hElements.length; i++) {
            var h = hElements[i];
            var hLevel = Number.parseInt(h.nodeName.substring(1, 2));
            if (hLevel > level) {
                var lastItem = currentList.lastChild;
                if (lastItem != null) {
                    var subList = document.createElement(listNodeName);
                    lastItem.appendChild(subList);
                    currentList = subList;
                    level++;
                }
                for (var j=0; j < hLevel - level; j++) {
                    var item = document.createElement('li');
                    var subList = document.createElement(listNodeName);
                    item.appendChild(subList);
                    currentList.appendChild(item);
                    currentList = subList;
                }
            } else if (hLevel < level) {
                for (var j=0; j < level - hLevel; j++) {
                    currentList = currentList.parentElement.parentElement;
                }
            }
            level = hLevel;
            var item = document.createElement('li');
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.appendChild(document.createTextNode(h.textContent));
            addClickHandler(link, h);
            item.appendChild(link);
            currentList.appendChild(item);
        }
        return list;
    }

});
