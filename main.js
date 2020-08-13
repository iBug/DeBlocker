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
    if (window.mdpDeBlockerDestroyer !== undefined) {
      return;
    }

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
      e.innerHTML = `
        .${t}-style-compact .${t}-blackout,
        .${t}-style-compact-right-top .${t}-blackout,
        .${t}-style-compact-left-top .${t}-blackout,
        .${t}-style-compact-right-bottom .${t}-blackout,
        .${t}-style-compact-left-bottom .${t}-blackout,
        .${t}-style-compact .${t}-blackout {
            position: fixed;
            z-index: 9997;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: none;
        }

        .${t}-style-compact .${t}-blackout.active,
        .${t}-style-compact-right-top .${t}-blackout.active,
        .${t}-style-compact-left-top .${t}-blackout.active,
        .${t}-style-compact-right-bottom .${t}-blackout.active,
        .${t}-style-compact-left-bottom .${t}-blackout.active,
        .${t}-style-compact .${t}-blackout.active {
            display: block;
            -webkit-animation: deblocker-appear;
            animation: deblocker-appear;
            -webkit-animation-duration: .2s;
            animation-duration: .2s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-compact .${t}-wrapper,
        .${t}-style-compact-right-top .${t}-wrapper,
        .${t}-style-compact-left-top .${t}-wrapper,
        .${t}-style-compact-right-bottom .${t}-wrapper,
        .${t}-style-compact-left-bottom .${t}-wrapper,
        .${t}-style-compact .${t}-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
        }

        .${t}-style-compact .${t}-modal,
        .${t}-style-compact-right-top .${t}-modal,
        .${t}-style-compact-left-top .${t}-modal,
        .${t}-style-compact-right-bottom .${t}-modal,
        .${t}-style-compact-left-bottom .${t}-modal,
        .${t}-style-compact .${t}-modal {
            height: auto;
            width: auto;
            position: relative;
            max-width: 40%;
            padding: 4rem;
            opacity: 0;
            z-index: 9999;
            transition: all 0.5s ease-in-out;
            border-radius: 1rem;
            margin: 1rem;
        }

        .${t}-style-compact .${t}-modal.active,
        .${t}-style-compact-right-top .${t}-modal.active,
        .${t}-style-compact-left-top .${t}-modal.active,
        .${t}-style-compact-right-bottom .${t}-modal.active,
        .${t}-style-compact-left-bottom .${t}-modal.active,
        .${t}-style-compact .${t}-modal.active {
            opacity: 1;
            -webkit-animation: deblocker-appear;
            animation: deblocker-appear;
            -webkit-animation-delay: .1s;
            animation-delay: .1s;
            -webkit-animation-duration: .5s;
            animation-duration: .5s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-compact .${t}-modal h4,
        .${t}-style-compact-right-top .${t}-modal h4,
        .${t}-style-compact-left-top .${t}-modal h4,
        .${t}-style-compact-right-bottom .${t}-modal h4,
        .${t}-style-compact-left-bottom .${t}-modal h4,
        .${t}-style-compact .${t}-modal h4 {
            margin: 0 0 1rem 0;
            padding-right: .8rem;
        }

        .${t}-style-compact .${t}-modal p,
        .${t}-style-compact-right-top .${t}-modal p,
        .${t}-style-compact-left-top .${t}-modal p,
        .${t}-style-compact-right-bottom .${t}-modal p,
        .${t}-style-compact-left-bottom .${t}-modal p,
        .${t}-style-compact .${t}-modal p {
            margin: 0;
        }

        @media only screen and (max-width: 1140px) {
            .${t}-style-compact .${t}-modal,
            .${t}-style-compact-right-top .${t}-modal,
            .${t}-style-compact-left-top .${t}-modal,
            .${t}-style-compact-right-bottom .${t}-modal,
            .${t}-style-compact-left-bottom .${t}-modal,
            .${t}-style-compact .${t}-modal {
                min-width: 60%;
            }
        }

        @media only screen and (max-width: 768px) {
            .${t}-style-compact .${t}-modal,
            .${t}-style-compact-right-top .${t}-modal,
            .${t}-style-compact-left-top .${t}-modal,
            .${t}-style-compact-right-bottom .${t}-modal,
            .${t}-style-compact-left-bottom .${t}-modal,
            .${t}-style-compact .${t}-modal {
                min-width: 80%;
            }
        }

        @media only screen and (max-width: 420px) {
            .${t}-style-compact .${t}-modal,
            .${t}-style-compact-right-top .${t}-modal,
            .${t}-style-compact-left-top .${t}-modal,
            .${t}-style-compact-right-bottom .${t}-modal,
            .${t}-style-compact-left-bottom .${t}-modal,
            .${t}-style-compact .${t}-modal {
                min-width: 90%;
            }
        }

        .${t}-style-compact .${t}-close,
        .${t}-style-compact-right-top .${t}-close,
        .${t}-style-compact-left-top .${t}-close,
        .${t}-style-compact-right-bottom .${t}-close,
        .${t}-style-compact-left-bottom .${t}-close,
        .${t}-style-compact .${t}-close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            display: inline-block;
            cursor: pointer;
            opacity: .3;
            width: 32px;
            height: 32px;
            -webkit-animation: deblocker-close-appear;
            animation: deblocker-close-appear;
            -webkit-animation-delay: 1s;
            animation-delay: 1s;
            -webkit-animation-duration: .4s;
            animation-duration: .4s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-compact .${t}-close:hover,
        .${t}-style-compact-right-top .${t}-close:hover,
        .${t}-style-compact-left-top .${t}-close:hover,
        .${t}-style-compact-right-bottom .${t}-close:hover,
        .${t}-style-compact-left-bottom .${t}-close:hover,
        .${t}-style-compact .${t}-close:hover {
            opacity: 1;
        }

        .${t}-style-compact .${t}-close:before,
        .${t}-style-compact .${t}-close:after,
        .${t}-style-compact-right-top .${t}-close:before,
        .${t}-style-compact-right-top .${t}-close:after,
        .${t}-style-compact-left-top .${t}-close:before,
        .${t}-style-compact-left-top .${t}-close:after,
        .${t}-style-compact-right-bottom .${t}-close:before,
        .${t}-style-compact-right-bottom .${t}-close:after,
        .${t}-style-compact-left-bottom .${t}-close:before,
        .${t}-style-compact-left-bottom .${t}-close:after,
        .${t}-style-compact .${t}-close:before,
        .${t}-style-compact .${t}-close:after {
            position: absolute;
            left: 15px;
            content: ' ';
            height: 33px;
            width: 2px;
        }

        .${t}-style-compact .${t}-close:before,
        .${t}-style-compact-right-top .${t}-close:before,
        .${t}-style-compact-left-top .${t}-close:before,
        .${t}-style-compact-right-bottom .${t}-close:before,
        .${t}-style-compact-left-bottom .${t}-close:before,
        .${t}-style-compact .${t}-close:before {
            transform: rotate(45deg);
        }

        .${t}-style-compact .${t}-close:after,
        .${t}-style-compact-right-top .${t}-close:after,
        .${t}-style-compact-left-top .${t}-close:after,
        .${t}-style-compact-right-bottom .${t}-close:after,
        .${t}-style-compact-left-bottom .${t}-close:after,
        .${t}-style-compact .${t}-close:after {
            transform: rotate(-45deg);
        }

        .${t}-style-compact-right-top .${t}-wrapper {
            justify-content: flex-end;
            align-items: flex-start;
        }

        .${t}-style-compact-left-top .${t}-wrapper {
            justify-content: flex-start;
            align-items: flex-start;
        }

        .${t}-style-compact-right-bottom .${t}-wrapper {
            justify-content: flex-end;
            align-items: flex-end;
        }

        .${t}-style-compact-left-bottom .${t}-wrapper {
            justify-content: flex-start;
            align-items: flex-end;
        }

        .${t}-style-full .${t}-blackout {
            position: fixed;
            z-index: 9998;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: none;
        }

        .${t}-style-full .${t}-blackout.active {
            display: block;
            -webkit-animation: deblocker-appear;
            animation: deblocker-appear;
            -webkit-animation-delay: .4s;
            animation-delay: .4s;
            -webkit-animation-duration: .4s;
            animation-duration: .4s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-full .${t}-modal {
            height: 100%;
            width: 100%;
            max-width: 100%;
            max-height: 100%;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 45px;
            opacity: 0;
            z-index: 9999;
            transition: all 0.5s ease-in-out;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .${t}-style-full .${t}-modal.active {
            opacity: 1;
            -webkit-animation: mdp-deblocker-appear;
            animation: mdp-deblocker-appear;
            -webkit-animation-duration: .4s;
            animation-duration: .4s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-full .${t}-modal h4 {
            margin: 0 0 1rem 0;
        }

        .${t}-style-full .${t}-modal p {
            margin: 0;
        }

        .${t}-style-full .${t}-close {
            position: absolute;
            right: 10px;
            top: 10px;
            width: 32px;
            height: 32px;
            display: inline-block;
            cursor: pointer;
            opacity: .3;
            -webkit-animation: mdp-deblocker-close-appear;
            animation: mdp-deblocker-close-appear;
            -webkit-animation-delay: 1s;
            animation-delay: 1s;
            -webkit-animation-duration: .4s;
            animation-duration: .4s;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
        }

        .${t}-style-full .${t}-close:hover {
            opacity: 1;
        }

        .${t}-style-full .${t}-close:before,
        .${t}-style-full .${t}-close:after {
            position: absolute;
            left: 15px;
            content: ' ';
            height: 33px;
            width: 2px;
        }

        .${t}-style-full .${t}-close:before {
            transform: rotate(45deg);
        }

        .${t}-style-full .${t}-close:after {
            transform: rotate(-45deg);
        }

        @-webkit-keyframes mdp-deblocker-appear {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes mdp-deblocker-appear {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @-webkit-keyframes mdp-deblocker-close-appear {
            from {
                opacity: 0;
                transform: scale(0.2);
            }
            to {
                opacity: .3;
                transform: scale(1);
            }
        }

        @keyframes mdp-deblocker-close-appear {
            from {
                opacity: 0;
                transform: scale(0.2);
            }
            to {
                opacity: .3;
                transform: scale(1);
            }
        }

        body.${t}-blur {
            -webkit-backface-visibility: none;
        }

        body.${t}-blur > *:not(#wpadminbar):not(.${t}-modal):not(.${t}-wrapper):not(.${t}-blackout) {
            -webkit-filter: blur(5px);
            filter: blur(5px);
        }
        `;
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

    function adsBlocked(blockedHandler) {
      let req = new Request(
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
        { method: "HEAD", mode: "no-cors" }
      );
      fetch(req)
        .then((response) => response)
        .then(function (e) {
          blockedHandler(false);
        })
        .catch(function (e) {
          blockedHandler(true);
        });
    }

    window.mdpDeBlockerDestroyer = true;

    adsBlocked(function (isBlocked) {
      if (isBlocked) {
        showModal();
      } else if (document.getElementById("mdp-deblocker-ads") === null) {
        showModal();
      }
    });
  },
  false
);
