/**
 * Most effective way to detect ad blockers. Ask the visitors to disable their ad blockers.
 * Exclusively on Envato Market: https://1.envato.market/deblocker
 *
 * @encoding        UTF-8
 * @version         2.0.3
 * @copyright       Copyright (C) 2018 - 2020 Merkulove ( https://merkulov.design/ ). All rights reserved.
 * @license         Commercial Software
 * @contributors    Alexander Khmelnitskiy (info@alexander.khmelnitskiy.ua), Dmitry Merkulov (dmitry@merkulov.design)
 * @support         help@merkulov.design
 **/
document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (void 0 !== window.mdpDeBlockerDestroyer) return;
    function disableTextSelection(t) {
      void 0 !== t.onselectstart
        ? (t.onselectstart = function () {
            return !1;
          })
        : void 0 !== t.style.MozUserSelect
        ? (t.style.MozUserSelect = "none")
        : void 0 !== t.style.webkitUserSelect
        ? (t.style.webkitUserSelect = "none")
        : (t.onmousedown = function () {
            return !1;
          }),
        (t.style.cursor = "default");
    }
    function enableSelection(t) {
      void 0 !== t.onselectstart
        ? (t.onselectstart = function () {
            return !0;
          })
        : void 0 !== t.style.MozUserSelect
        ? (t.style.MozUserSelect = "text")
        : void 0 !== t.style.webkitUserSelect
        ? (t.style.webkitUserSelect = "text")
        : (t.onmousedown = function () {
            return !0;
          }),
        (t.style.cursor = "auto");
    }
    function disableContextMenu() {
      (document.oncontextmenu = function (t) {
        var e = t || window.event;
        if ("A" != (e.target || e.srcElement).nodeName) return !1;
      }),
        (document.body.oncontextmenu = function () {
          return !1;
        }),
        (document.ondragstart = function () {
          return !1;
        });
    }
    function enableContextMenu() {
      (document.oncontextmenu = null),
        (document.body.oncontextmenu = null),
        (document.ondragstart = null);
    }
    let h_win_disableHotKeys, h_mac_disableHotKeys;
    function disableHotKeys() {
      (h_win_disableHotKeys = function (t) {
        !t.ctrlKey ||
          (65 != t.which &&
            66 != t.which &&
            67 != t.which &&
            70 != t.which &&
            73 != t.which &&
            80 != t.which &&
            83 != t.which &&
            85 != t.which &&
            86 != t.which) ||
          t.preventDefault();
      }),
        window.addEventListener("keydown", h_win_disableHotKeys),
        (document.keypress = function (t) {
          if (
            t.ctrlKey &&
            (65 == t.which ||
              66 == t.which ||
              70 == t.which ||
              67 == t.which ||
              73 == t.which ||
              80 == t.which ||
              83 == t.which ||
              85 == t.which ||
              86 == t.which)
          )
            return !1;
        }),
        (h_mac_disableHotKeys = function (t) {
          !t.metaKey ||
            (65 != t.which &&
              66 != t.which &&
              67 != t.which &&
              70 != t.which &&
              73 != t.which &&
              80 != t.which &&
              83 != t.which &&
              85 != t.which &&
              86 != t.which) ||
            t.preventDefault();
        }),
        window.addEventListener("keydown", h_mac_disableHotKeys),
        (document.keypress = function (t) {
          if (
            t.metaKey &&
            (65 == t.which ||
              66 == t.which ||
              70 == t.which ||
              67 == t.which ||
              73 == t.which ||
              80 == t.which ||
              83 == t.which ||
              85 == t.which ||
              86 == t.which)
          )
            return !1;
        }),
        (document.onkeydown = function (t) {
          (123 == t.keyCode ||
            ((t.ctrlKey || t.metaKey) && t.shiftKey && 73 == t.keyCode)) &&
            t.preventDefault();
        });
    }
    function disableDeveloperTools() {
      let checkStatus;
      window.addEventListener("keydown", function (t) {
        (123 === t.keyCode ||
          ((t.ctrlKey || t.metaKey) && t.shiftKey && 73 === t.keyCode)) &&
          t.preventDefault();
      });
      let element = new Image();
      Object.defineProperty(element, "id", {
        get: function () {
          throw ((checkStatus = "on"), new Error("Dev tools checker"));
        },
      }),
        requestAnimationFrame(function check() {
          (checkStatus = "off"),
            console.dir(element),
            "on" === checkStatus
              ? (document.body.parentNode.removeChild(document.body),
                document.head.parentNode.removeChild(document.head),
                setTimeout(function () {
                  for (;;) eval("debugger");
                }, 100))
              : requestAnimationFrame(check);
        });
    }
    function enableHotKeys() {
      window.removeEventListener("keydown", h_win_disableHotKeys),
        (document.keypress = function (t) {
          if (
            t.ctrlKey &&
            (65 == t.which ||
              66 == t.which ||
              70 == t.which ||
              67 == t.which ||
              73 == t.which ||
              80 == t.which ||
              83 == t.which ||
              85 == t.which ||
              86 == t.which)
          )
            return !0;
        }),
        window.removeEventListener("keydown", h_mac_disableHotKeys),
        (document.keypress = function (t) {
          if (
            t.metaKey &&
            (65 == t.which ||
              66 == t.which ||
              70 == t.which ||
              67 == t.which ||
              73 == t.which ||
              80 == t.which ||
              83 == t.which ||
              85 == t.which ||
              86 == t.which)
          )
            return !0;
        }),
        (document.onkeydown = function (t) {
          if (
            123 == (t = t || window.event).keyCode ||
            18 == t.keyCode ||
            (t.ctrlKey && t.shiftKey && 73 == t.keyCode)
          )
            return !0;
        });
    }
    function addStyles() {
      let t = mdpDeBlocker.prefix,
        e = document.createElement("style");
      e.innerHTML = `\n            .${t}-style-compact .${t}-blackout,\n            .${t}-style-compact-right-top .${t}-blackout,\n            .${t}-style-compact-left-top .${t}-blackout,\n            .${t}-style-compact-right-bottom .${t}-blackout,\n            .${t}-style-compact-left-bottom .${t}-blackout,\n            .${t}-style-compact .${t}-blackout {\n                position: fixed;\n                z-index: 9997;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n                display: none;\n            }\n\n            .${t}-style-compact .${t}-blackout.active,\n            .${t}-style-compact-right-top .${t}-blackout.active,\n            .${t}-style-compact-left-top .${t}-blackout.active,\n            .${t}-style-compact-right-bottom .${t}-blackout.active,\n            .${t}-style-compact-left-bottom .${t}-blackout.active,\n            .${t}-style-compact .${t}-blackout.active {\n                display: block;\n                -webkit-animation: deblocker-appear;\n                animation: deblocker-appear;\n                -webkit-animation-duration: .2s;\n                animation-duration: .2s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-compact .${t}-wrapper,\n            .${t}-style-compact-right-top .${t}-wrapper,\n            .${t}-style-compact-left-top .${t}-wrapper,\n            .${t}-style-compact-right-bottom .${t}-wrapper,\n            .${t}-style-compact-left-bottom .${t}-wrapper,\n            .${t}-style-compact .${t}-wrapper {\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                position: fixed;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                z-index: 9998;\n            }\n\n            .${t}-style-compact .${t}-modal,\n            .${t}-style-compact-right-top .${t}-modal,\n            .${t}-style-compact-left-top .${t}-modal,\n            .${t}-style-compact-right-bottom .${t}-modal,\n            .${t}-style-compact-left-bottom .${t}-modal,\n            .${t}-style-compact .${t}-modal {\n                height: auto;\n                width: auto;\n                position: relative;\n                max-width: 40%;\n                padding: 4rem;\n                opacity: 0;\n                z-index: 9999;\n                transition: all 0.5s ease-in-out;\n                border-radius: 1rem;\n                margin: 1rem;\n            }\n\n            .${t}-style-compact .${t}-modal.active,\n            .${t}-style-compact-right-top .${t}-modal.active,\n            .${t}-style-compact-left-top .${t}-modal.active,\n            .${t}-style-compact-right-bottom .${t}-modal.active,\n            .${t}-style-compact-left-bottom .${t}-modal.active,\n            .${t}-style-compact .${t}-modal.active {\n                opacity: 1;\n                -webkit-animation: deblocker-appear;\n                animation: deblocker-appear;\n                -webkit-animation-delay: .1s;\n                animation-delay: .1s;\n                -webkit-animation-duration: .5s;\n                animation-duration: .5s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-compact .${t}-modal h4,\n            .${t}-style-compact-right-top .${t}-modal h4,\n            .${t}-style-compact-left-top .${t}-modal h4,\n            .${t}-style-compact-right-bottom .${t}-modal h4,\n            .${t}-style-compact-left-bottom .${t}-modal h4,\n            .${t}-style-compact .${t}-modal h4 {\n                margin: 0 0 1rem 0;\n                padding-right: .8rem;\n            }\n\n            .${t}-style-compact .${t}-modal p,\n            .${t}-style-compact-right-top .${t}-modal p,\n            .${t}-style-compact-left-top .${t}-modal p,\n            .${t}-style-compact-right-bottom .${t}-modal p,\n            .${t}-style-compact-left-bottom .${t}-modal p,\n            .${t}-style-compact .${t}-modal p {\n                margin: 0;\n            }\n\n            @media only screen and (max-width: 1140px) {\n                .${t}-style-compact .${t}-modal,\n                .${t}-style-compact-right-top .${t}-modal,\n                .${t}-style-compact-left-top .${t}-modal,\n                .${t}-style-compact-right-bottom .${t}-modal,\n                .${t}-style-compact-left-bottom .${t}-modal,\n                .${t}-style-compact .${t}-modal {\n                    min-width: 60%;\n                }\n            }\n\n            @media only screen and (max-width: 768px) {\n                .${t}-style-compact .${t}-modal,\n                .${t}-style-compact-right-top .${t}-modal,\n                .${t}-style-compact-left-top .${t}-modal,\n                .${t}-style-compact-right-bottom .${t}-modal,\n                .${t}-style-compact-left-bottom .${t}-modal,\n                .${t}-style-compact .${t}-modal {\n                    min-width: 80%;\n                }\n            }\n\n            @media only screen and (max-width: 420px) {\n                .${t}-style-compact .${t}-modal,\n                .${t}-style-compact-right-top .${t}-modal,\n                .${t}-style-compact-left-top .${t}-modal,\n                .${t}-style-compact-right-bottom .${t}-modal,\n                .${t}-style-compact-left-bottom .${t}-modal,\n                .${t}-style-compact .${t}-modal {\n                    min-width: 90%;\n                }\n            }\n\n            .${t}-style-compact .${t}-close,\n            .${t}-style-compact-right-top .${t}-close,\n            .${t}-style-compact-left-top .${t}-close,\n            .${t}-style-compact-right-bottom .${t}-close,\n            .${t}-style-compact-left-bottom .${t}-close,\n            .${t}-style-compact .${t}-close {\n                position: absolute;\n                right: 1rem;\n                top: 1rem;\n                display: inline-block;\n                cursor: pointer;\n                opacity: .3;\n                width: 32px;\n                height: 32px;\n                -webkit-animation: deblocker-close-appear;\n                animation: deblocker-close-appear;\n                -webkit-animation-delay: 1s;\n                animation-delay: 1s;\n                -webkit-animation-duration: .4s;\n                animation-duration: .4s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-compact .${t}-close:hover,\n            .${t}-style-compact-right-top .${t}-close:hover,\n            .${t}-style-compact-left-top .${t}-close:hover,\n            .${t}-style-compact-right-bottom .${t}-close:hover,\n            .${t}-style-compact-left-bottom .${t}-close:hover,\n            .${t}-style-compact .${t}-close:hover {\n                opacity: 1;\n            }\n\n            .${t}-style-compact .${t}-close:before,\n            .${t}-style-compact .${t}-close:after,\n            .${t}-style-compact-right-top .${t}-close:before,\n            .${t}-style-compact-right-top .${t}-close:after,\n            .${t}-style-compact-left-top .${t}-close:before,\n            .${t}-style-compact-left-top .${t}-close:after,\n            .${t}-style-compact-right-bottom .${t}-close:before,\n            .${t}-style-compact-right-bottom .${t}-close:after,\n            .${t}-style-compact-left-bottom .${t}-close:before,\n            .${t}-style-compact-left-bottom .${t}-close:after,\n            .${t}-style-compact .${t}-close:before,\n            .${t}-style-compact .${t}-close:after {\n                position: absolute;\n                left: 15px;\n                content: ' ';\n                height: 33px;\n                width: 2px;\n            }\n\n            .${t}-style-compact .${t}-close:before,\n            .${t}-style-compact-right-top .${t}-close:before,\n            .${t}-style-compact-left-top .${t}-close:before,\n            .${t}-style-compact-right-bottom .${t}-close:before,\n            .${t}-style-compact-left-bottom .${t}-close:before,\n            .${t}-style-compact .${t}-close:before {\n                transform: rotate(45deg);\n            }\n\n            .${t}-style-compact .${t}-close:after,\n            .${t}-style-compact-right-top .${t}-close:after,\n            .${t}-style-compact-left-top .${t}-close:after,\n            .${t}-style-compact-right-bottom .${t}-close:after,\n            .${t}-style-compact-left-bottom .${t}-close:after,\n            .${t}-style-compact .${t}-close:after {\n                transform: rotate(-45deg);\n            }\n\n            .${t}-style-compact-right-top .${t}-wrapper {\n                justify-content: flex-end;\n                align-items: flex-start;\n            }\n\n            .${t}-style-compact-left-top .${t}-wrapper {\n                justify-content: flex-start;\n                align-items: flex-start;\n            }\n\n            .${t}-style-compact-right-bottom .${t}-wrapper {\n                justify-content: flex-end;\n                align-items: flex-end;\n            }\n\n            .${t}-style-compact-left-bottom .${t}-wrapper {\n                justify-content: flex-start;\n                align-items: flex-end;\n            }\n\n            .${t}-style-full .${t}-blackout {\n                position: fixed;\n                z-index: 9998;\n                left: 0;\n                top: 0;\n                width: 100%;\n                height: 100%;\n                display: none;\n            }\n\n            .${t}-style-full .${t}-blackout.active {\n                display: block;\n                -webkit-animation: deblocker-appear;\n                animation: deblocker-appear;\n                -webkit-animation-delay: .4s;\n                animation-delay: .4s;\n                -webkit-animation-duration: .4s;\n                animation-duration: .4s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-full .${t}-modal {\n                height: 100%;\n                width: 100%;\n                max-width: 100%;\n                max-height: 100%;\n                position: fixed;\n                left: 50%;\n                top: 50%;\n                transform: translate(-50%, -50%);\n                padding: 45px;\n                opacity: 0;\n                z-index: 9999;\n                transition: all 0.5s ease-in-out;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                flex-direction: column;\n            }\n\n            .${t}-style-full .${t}-modal.active {\n                opacity: 1;\n                -webkit-animation: mdp-deblocker-appear;\n                animation: mdp-deblocker-appear;\n                -webkit-animation-duration: .4s;\n                animation-duration: .4s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-full .${t}-modal h4 {\n                margin: 0 0 1rem 0;\n            }\n\n            .${t}-style-full .${t}-modal p {\n                margin: 0;\n            }\n\n            .${t}-style-full .${t}-close {\n                position: absolute;\n                right: 10px;\n                top: 10px;\n                width: 32px;\n                height: 32px;\n                display: inline-block;\n                cursor: pointer;\n                opacity: .3;\n                -webkit-animation: mdp-deblocker-close-appear;\n                animation: mdp-deblocker-close-appear;\n                -webkit-animation-delay: 1s;\n                animation-delay: 1s;\n                -webkit-animation-duration: .4s;\n                animation-duration: .4s;\n                -webkit-animation-fill-mode: both;\n                animation-fill-mode: both;\n            }\n\n            .${t}-style-full .${t}-close:hover {\n                opacity: 1;\n            }\n\n            .${t}-style-full .${t}-close:before,\n            .${t}-style-full .${t}-close:after {\n                position: absolute;\n                left: 15px;\n                content: ' ';\n                height: 33px;\n                width: 2px;\n            }\n\n            .${t}-style-full .${t}-close:before {\n                transform: rotate(45deg);\n            }\n\n            .${t}-style-full .${t}-close:after {\n                transform: rotate(-45deg);\n            }\n\n            @-webkit-keyframes mdp-deblocker-appear {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n\n            @keyframes mdp-deblocker-appear {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n\n            @-webkit-keyframes mdp-deblocker-close-appear {\n                from {\n                    opacity: 0;\n                    transform: scale(0.2);\n                }\n                to {\n                    opacity: .3;\n                    transform: scale(1);\n                }\n            }\n\n            @keyframes mdp-deblocker-close-appear {\n                from {\n                    opacity: 0;\n                    transform: scale(0.2);\n                }\n                to {\n                    opacity: .3;\n                    transform: scale(1);\n                }\n            }\n\n            body.${t}-blur { \n                -webkit-backface-visibility: none;\n            }\n\n            body.${t}-blur > *:not(#wpadminbar):not(.${t}-modal):not(.${t}-wrapper):not(.${t}-blackout) {\n                -webkit-filter: blur(5px);\n                filter: blur(5px);\n            }\n        `;
      let n = document.querySelectorAll("script"),
        o = n[Math.floor(Math.random() * n.length)];
      o.parentNode.insertBefore(e, o);
    }
    function showModal() {
      setTimeout(function () {
        let t = mdpDeBlocker.prefix;
        addStyles(),
          document.body.classList.add(`${t}-style-` + mdpDeBlocker.style),
          "on" === mdpDeBlocker.blur &&
            document.body.classList.add(`${t}-blur`);
        let e = document.createElement("div");
        e.classList.add(`${t}-blackout`),
          (e.style.backgroundColor = mdpDeBlocker.bg_color),
          e.classList.add("active"),
          document.body.appendChild(e);
        let n = document.createElement("div");
        n.classList.add(`${t}-wrapper`), document.body.appendChild(n);
        let o = document.createElement("div");
        if (
          (o.classList.add(`${t}-modal`),
          (o.style.backgroundColor = mdpDeBlocker.modal_color),
          o.classList.add("active"),
          n.appendChild(o),
          "on" === mdpDeBlocker.closeable)
        ) {
          let e = document.createElement("span");
          e.classList.add(`${t}-close`),
            (e.innerHTML = "&nbsp;"),
            e.setAttribute("href", "#");
          let n = document.createElement("style");
          (n.type = "text/css"),
            (n.innerHTML =
              `.${t}-close:after,` +
              `.${t}-close:before {` +
              "background-color: " +
              mdpDeBlocker.text_color +
              ";}"),
            (
              document.head || document.getElementsByTagName("head")[0]
            ).appendChild(n),
            e.addEventListener("click", function (e) {
              e.preventDefault();
              let n = document.querySelector(`.${t}-modal`);
              n.parentNode.removeChild(n),
                (n = document.querySelector(`.${t}-wrapper`)),
                n.parentNode.removeChild(n),
                (n = document.querySelector(`.${t}-blackout`)),
                n.parentNode.removeChild(n),
                document.body.classList.remove(`${t}-blur`),
                enableSelection(document.body),
                enableContextMenu(),
                enableHotKeys();
            }),
            o.appendChild(e);
        }
        let c = document.createElement("h4");
        (c.innerHTML = mdpDeBlocker.title),
          (c.style.color = mdpDeBlocker.text_color),
          o.appendChild(c);
        let a = document.createElement("div");
        a.classList.add(`${t}-content`),
          (a.innerHTML = mdpDeBlocker.content),
          (a.style.color = mdpDeBlocker.text_color),
          o.appendChild(a),
          disableTextSelection(document.body),
          disableContextMenu(),
          disableHotKeys(),
          disableDeveloperTools();
      }, mdpDeBlocker.timeout);
    }
    function adsBlocked(t) {
      let e = new Request(
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        { method: "HEAD", mode: "no-cors" }
      );
      fetch(e)
        .then(function (t) {
          return t;
        })
        .then(function (e) {
          t(!1);
        })
        .catch(function (e) {
          t(!0);
        });
    }
    (window.mdpDeBlockerDestroyer = !0),
      adsBlocked(function (t) {
        t
          ? showModal()
          : document.getElementById("mdp-deblocker-ads") || showModal();
      });
  },
  !1
);
