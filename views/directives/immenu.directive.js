(function () {
	"use strict";
	angular.module('immenuDirectiveApp', []).directive('megaMenuDrt', megaMenuDrt);
	megaMenuDrt.$inject = [];

	function megaMenuDrt() {
		return {
			restrict: 'AE',
			scope: {
				iMmFont: '@',
				iMmConfig: '='
			},
			link: function (scope, mmElm, attr) {
				var mmRoot = mmElm['0'];
				var mmconfig = scope.iMmConfig || {};
				mmconfig.screen = mmconfig.screen !== undefined ? mmconfig.screen : 'full';
				mmRoot.classList.add('i-mmenu-wrap');
				// var window = angular.element($window);
				if(scope.iMmFont) {
					mmRoot.style.fontFamily = scope.iMmFont;
				}
				var mmStyle = document.createElement('style');
				var mmSsetId = "i-mmenu-style";
				var headDoc = document.head || document.getElementsByTagName('head')['0'];
				mmStyle.innerHTML = `
					@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i,700|Roboto:300,300i,400,400i,500,500i,700&display=swap&subset=vietnamese');
					.i-mmenu-wrap {
						font-family: 'Open Sans', sans-serif;
					}
					.i-mmenu-wrap a {
						text-decoration: none;
						color: #525252;
					}
					.i-mmenu-wrap a:hover,
					.i-mmenu-wrap a:focus,
					.i-mmenu-wrap a:focus:active {
						color: #2990f3;
					}
					.i-mmenu-wrap > ul,
					ul.i-mmenu-wrap {
						margin: 0;
						padding: 0;
						list-style: none;
					}
					
					.i-mmenu-wrap > ul > li,
					.i-mmenu-wrap > li {
						float: left;
					} 
					.i-mmenu-wrap li ul > li,
					.i-mmenu-wrap > li ul > li {
						float: none;
					}
					.i-mmenu-wrap > ul > li > a,
					.i-mmenu-wrap > li > a {
						padding: 15px; 
						display: block;
					}
					.i-mm-dropdown {
						position: relative;
					}
					.i-mm-dropdown > .i-submm-dropdown {
						position: absolute;
						background-color: white;
						box-shadow: 0 3px 4px 0 rgba(0,0,0,.18);
						left: 0;
						right: 0;
						flex-flow: row wrap;
						border-top: 2px solid #f1f1f1;
						display: none;
						z-index: 1987;
					}
					.i-mm-dropdown:hover {
						background-color: #f1f1f1;
					}
					.i-mm-dropdown:hover > .i-submm-dropdown {
						display: flex;
					}
					.i-submm-dropdown {
						display: none;
						border-bottom-left-radius: 3px;
						border-bottom-right-radius: 3px;
					}
					.i-submm-dropdown > .i-mm-col-item {
						padding: 10px 20px;
					}
					.i-submm-dropdown .i-mm-gr-title {
						font-size: 17px;
						font-weight: 600;
						color: #717171;
						margin: 0 0 10px;
					}
					.i-submm-dropdown .i-mm-header {
						padding: 0 10px;
						margin-bottom: 15px;
					}
					.i-submm-dropdown li > a:hover {
						background: none !important;
						border: none !important;
					}
					.i-submm-dropdown .i-mm-title {
						font-weight: 600;
						color: #414141;
						font-size: 15px;
						position: relative;
					}
					.i-submm-dropdown .i-mm-title:before {
						content: ' \\2023';
						position: absolute;
						left: -10px;
						font-size: 15px;
					}
					.i-submm-dropdown .i-mm-title:hover {
						color: #2990f3;
					}
					.i-submm-dropdown .i-mm-des {
						color: #616161;
						margin: 2px 0 0;
						font-size: 13px;
					}
					.i-submm-dropdown .i-mm-gr-list {
						padding-left: 10px;
						list-style: none;
					}
					.i-mm-gr-list .i-mm-gr-item {
						margin-bottom: 12px;
					}
					@media screen and (min-width: 1201px) {
						.i-submm-dropdown > .i-mm-col-item {
							flex: 0 1 calc((100% / 4) - 40px);
						}
					}
					@media screen and (min-width: 769px) and (max-width: 1200px) {
						.i-submm-dropdown > .i-mm-col-item {
							flex: 0 1 calc((100% / 3) - 40px);
						}
					}
					@media screen and (max-width: 768px) {
						.i-submm-dropdown > .i-mm-col-item {
							flex: 0 1 calc((100% / 2) - 40px);
						}
					}
					@media screen and (max-width: 480px) {
						.i-submm-dropdown > .i-mm-col-item {
							flex: 0 1 calc(100% - 40px);
						}
					}
				`;
				mmStyle.setAttribute('id', mmSsetId);
				if(document.getElementById(mmSsetId) == null) {
					headDoc.appendChild(mmStyle);
				}
				var mmDropdown = mmRoot.getElementsByClassName('i-mm-dropdown');
				var getSubDropdown = mmRoot.getElementsByClassName('i-submm-dropdown');
				mmRoot.addEventListener('mouseover', function (el) {
					if(el.target.parentElement.classList.contains('i-mm-dropdown')) {
						var getLeftImm = Math.round(el.target.parentElement.getBoundingClientRect().left);
						setL(getLeftImm, mmconfig.screen);
					}
				});
				function setL(vl, wd) {
					if(wd == 'df') {
						mmRoot.style.position = "relative";
					}
					if(getSubDropdown.length > 0) {
						angular.forEach(getSubDropdown, function (item) {
							if(wd !== 'df') {
								item.style.left = (0 - vl) + 'px';
								item.style.width = document.body.clientWidth + 'px';
							}
							else {
								item.style.left = '';
								item.parentElement.style.position = 'static';
							}
						})
					}
				}
			}
		}
	}
})();
