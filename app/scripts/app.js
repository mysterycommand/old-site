/** ================================================================================================================ **/
/**
 * @fileOverview
 *
 * @author Matt Hayes <matt@mysterycommand.com>
 * @version 0.0.1
 */
/** ================================================================================================================ **/

/* jshint bitwise: false */

define([
    'jquery'
], function (
    $
) {
    'use strict';

    var NS_SVG = 'http://www.w3.org/2000/svg';
    var NS_XLINK = 'http://www.w3.org/1999/xlink';
    var NS_XMLNS = 'http://www.w3.org/2000/xmlns/';

    var TO_RADS = Math.PI / 180;
    var TO_DEGS = 180 / Math.PI;
    var TAN_30 = Math.tan(30 * TO_RADS);

    var PHI = (1 + Math.sqrt(5)) / 2;
    var G = 1 / (PHI * PHI);

    var G_RADS = (2 * Math.PI) * G;
    var G_DEGS = 360 * G;

    function diamondStr(size) {
        var rx = Math.sqrt(size / (2 * TAN_30));
        var ry = rx * TAN_30;
        return [
            'M' + [0,-ry].join(','),
            'L' + [rx,0].join(','),
            [0,ry].join(','),
            [-rx,0].join(','),
            'Z'
        ].join(' ');
    }

    return function() {
        var svg = document.createElementNS(NS_SVG, 'svg');
        svg.setAttributeNS(NS_XMLNS, 'xmlns', NS_SVG);
        svg.setAttributeNS(NS_XMLNS, 'xmlns:xlink', NS_XLINK);
        svg.setAttributeNS(null, 'version', '1.1');

        var w = '100%';
        var h = '100%';

        svg.setAttributeNS(null, 'width', w);
        svg.setAttributeNS(null, 'height', h);
        svg.setAttributeNS(null, 'viewBox', [0,0,w,h].join(' '));
        svg.setAttributeNS(null, 'enable-background', ['new',0,0,w,h].join(' '));

        var defs = document.createElementNS(NS_SVG, 'defs');
        svg.appendChild(defs);

        var symbol = document.createElementNS(NS_SVG, 'symbol');
        symbol.setAttributeNS(null, 'id', 'diamond');
        symbol.style.overflow = 'visible';
        defs.appendChild(symbol);

        var path = document.createElementNS(NS_SVG, 'path');
        path.setAttributeNS(null, 'd', diamondStr(200));
        path.style.fill = 'inherit';
        symbol.appendChild(path);

        // var bkgd = document.createElementNS(NS_SVG, 'rect');
        // bkgd.setAttributeNS(null, 'width', '100%');
        // bkgd.setAttributeNS(null, 'height', '100%');
        // bkgd.style.fill = 'cornflowerblue';
        // svg.appendChild(bkgd);

        var use;
        var frag = document.createDocumentFragment();

        var originX = document.body.offsetWidth / 2;
        var originY = document.body.offsetHeight / 2;
        var deltaX = 0;
        var deltaY = 0;

        var angle = 0;
        var radius = 1;
        var growth = 1;
        var decay = 0.99875;

        var r = Math.random() * 256 | 0;
        var g = Math.random() * 256 | 0;
        var b = Math.random() * 256 | 0;
        var a = ((r + g + b) / 3) / 255; // Math.random();
        var color = 'rgba(' + [r,g,b,a].join(',') + ')';
        // var color = '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6);
        for (var i = 0, l = 5000; i < l; ++i) {
            deltaX = Math.cos(angle * TO_RADS) * radius;
            deltaY = Math.sin(angle * TO_RADS) * radius;

            use = document.createElementNS(NS_SVG, 'use');
            use.setAttributeNS(NS_XLINK, 'xlink:href', '#diamond');
            use.setAttributeNS(null, 'transform', [
                'translate(' + (originX + deltaX) + ',' + (originY + deltaY) + ')',
                'rotate(' + angle + ')',
                'scale(' + Math.min(i * 4 / 300, 1) + ')'
            ].join(' '));
            use.style.fill = color;
            frag.appendChild(use);

            angle += G_DEGS;
            radius += growth;
            growth *= decay;
        }
        svg.appendChild(frag);

        var first = document.body.querySelector(':first-child');
        document.body.insertBefore(svg, first);
    };
});

/* ================================================================================================================== */
