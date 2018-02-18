/*

Copyright (C) 2016, TMO NextGen Base Styles
Description
@author - Razorfish Dev Team
@version - 1.0

*/

var TMONextGen = TMONextGen || {};

TMONextGen = function ($, window, document, undefined) {
	//Initializes the app. Kick it off.
    function init() {
    	initDynamicVerticalAlignment();
    	initColorPicker();
    	initTabSubNav();
    	initSectionSelector();
    }

    function initDynamicVerticalAlignment() {
    	//Vertically align any div element with the js-verically-align class
    	var elements = $('div.js-vertical-align');
    	setDynamicVerticalAlignment(elements);

    	$(window).on('resize', function(e) {
    		setDynamicVerticalAlignment(elements);
    	});
    	
    }

    function setDynamicVerticalAlignment(elements) {
    	//Determine amount of top margin needed for each element to vertically 
    	//align them within their parent elements.
    	for(var i=0; i<elements.length; i++) {
    		var $element = $(elements[i]);
    		var topMargin = ($element.parent().height()/2) - ($element.height()/2);
    		$element.css('margin-top', topMargin + 'px');
    	}
    }

    function initColorPicker() {
    	var colorPickers = $('div.color-picker');
    	var colorBoxes = colorPickers.find('label.rad');

    	colorBoxes.on('click', function(e) {
    		var $this = $(this);
    		var selectedColorLabel = $this.children('[data-color-label]').attr('data-color-label');

    		var $colorPickerHeader = $this.siblings('h6.header');
    		$colorPickerHeader.children('.selected-color').html(selectedColorLabel);

		});
    }

    function initTabSubNav() {
    	var tabs = $('ul.nav-tabs');
    	if(!tabs.length) return;

    	var tabLinks = tabs.find('a[data-toggle]');

    	tabLinks.on('click', function(e) {
    		$tabLink = $(this);
    		if($tabLink.closest('.tab-sub-nav').length) return;

    		var $tabWrapper = $tabLink.closest('.tabs-wrapper');
    		$tab = $tabLink.parent();

    		//Hide any tab sub nav that is currently visible
    		$tabWrapper.find('ul.tab-sub-nav').removeClass('active');

    		//If selected tab is linked to tab sub nav, show the sub nav.
    		if($tabLink.attr('data-toggle') == "tab-sub-nav") {
    			e.preventDefault();

    			//Show and highlight selected tab and sub nav tab
    			var tabSubNavSelector = $tabLink.attr('href');
    			var $tabSubNav = $tabWrapper.find(tabSubNavSelector);
    			$tabSubNav.addClass('active');
    			$tab.siblings('li').removeClass('active');
    			$tab.addClass('active');
    			
    			//Display content of selected
    			var subNavTabs = $tabSubNav.children('li');
    			var $activeSubNavTab = $tabSubNav.children('li.active');
    			var $tabContent = $tabWrapper.find('div.tab-content');

    			//Activate first sub nav tab if one isn't already set to active
    			if(!$activeSubNavTab.length || $activeSubNavTab.length > 1){
    				$activeSubNavTab = $(subNavTabs[0]);
    				$activeSubNavTab.siblings('li').removeClass('active');
    				$activeSubNavTab.addClass('active');
    			}

    			var activeTabContentSelector = $activeSubNavTab.children('a').attr('href');
    			var $activeTabContent = $tabContent.find(activeTabContentSelector);
				$activeTabContent.siblings('.tab-pane').removeClass('active');
				$activeTabContent.addClass('active');
    		}
    	});

		//Tab sub nav arrow controls
	    var prevArrows = tabs.siblings('a.tab-sub-nav-arrow.prev');
	    var nextArrows = tabs.siblings('a.tab-sub-nav-arrow.next');
	    var tabSubMenuIndex = 0;

	    for(var g=0; g<tabs.length; g++) {
	    	var $thisTab = $(tabs[g]);

	    	if($thisTab.is('.tab-sub-nav')) {
		    	var $thisTabWrapper = $thisTab.closest('.tabs-wrapper');
		    	var thisTabSubNavWidth = $thisTab.parent().width();
		    	var thisTabSubNavTabs = $thisTab.children('li');

		    	var widthOfTheseRemaningSubTabs = 0;
		    	var indexOfThisSubTabInPartialView = -1;
			    for(var i=0; i<thisTabSubNavTabs.length; i++) {
					widthOfTheseRemaningSubTabs += $(thisTabSubNavTabs[i]).width();

					if(widthOfTheseRemaningSubTabs > thisTabSubNavWidth && indexOfThisSubTabInPartialView == -1) {
						indexOfThisSubTabInPartialView = i;
					}
				}

				if(widthOfTheseRemaningSubTabs <= thisTabSubNavWidth) {
					$thisTab.siblings('.tab-sub-nav-arrow').css('display', 'none');
				} else if(indexOfThisSubTabInPartialView != -1) {

					for(var h=indexOfThisSubTabInPartialView; h<thisTabSubNavTabs.length; h++) {
						$(thisTabSubNavTabs[h]).css('display', 'none');
					}
				}
			}
		}

	    nextArrows.on('click', function(e) {
	    	e.preventDefault();

	    	var $this = $(this);
	    	var $tabsWrapper = $this.closest('.tabs-wrapper');
	    	var $tabSubNav = $this.siblings('ul.tab-sub-nav');
	    	var tabSubNavWidth = $tabSubNav.parent().width();
	    	var tabSubNavTabs = $tabSubNav.children('li');

	    	if($this.is('.disabled') || tabSubMenuIndex >= tabSubNavTabs.length-1) {
				return;
			}

			var tabSubMenuTabWidth = $(tabSubNavTabs[tabSubMenuIndex]).width();
			var currentSubMenuTabLeftMargin = $tabSubNav.css('margin-left');
			var newLeftMargin = Number(currentSubMenuTabLeftMargin.substr(0, currentSubMenuTabLeftMargin.length-2)) - tabSubMenuTabWidth;
			tabSubMenuIndex++;
			tabSubNavTabs.css('display', 'block');
			$tabSubNav.animate({marginLeft: newLeftMargin + 'px'}, 500);
			$this.siblings('.tab-sub-nav-arrow.prev').removeClass('disabled');

			//Check to see if the rest of the sub nav tabs fit in the width of the tabSubNav wrapper
			var widthOfRemaningSubTabs = 0;
			var indexOfSubTabInPartialView = -1;
			for(var i=tabSubMenuIndex; i<tabSubNavTabs.length; i++) {
				widthOfRemaningSubTabs += $(tabSubNavTabs[i]).width();

				if(widthOfRemaningSubTabs > tabSubNavWidth && indexOfSubTabInPartialView == -1) {
					indexOfSubTabInPartialView = i;
				}
			}

			if(widthOfRemaningSubTabs <= tabSubNavWidth) {
				$this.addClass('disabled');
			} else if(indexOfSubTabInPartialView != -1) {
				$(tabSubNavTabs[indexOfSubTabInPartialView]).css('display', 'none');
			}
	    });

	    prevArrows.on('click', function(e) {
			e.preventDefault();

			if(tabSubMenuIndex === 0) {
				return;
			}

			var $this = $(this);
	    	var $tabsWrapper = $this.closest('.tabs-wrapper');
	    	var $tabSubNav = $this.siblings('ul.tab-sub-nav');
	    	var tabSubNavWidth = $tabSubNav.parent().width();
	    	var tabSubNavTabs = $tabSubNav.children('li');

	    	var tabSubMenuTabWidth = $(tabSubNavTabs[tabSubMenuIndex-1]).width();
	    	var currentSubMenuTabLeftMargin = $tabSubNav.css('margin-left');
	    	var newLeftMargin = Number(currentSubMenuTabLeftMargin.substr(0, currentSubMenuTabLeftMargin.length-2)) + tabSubMenuTabWidth;
	    	tabSubMenuIndex--;
	    	tabSubNavTabs.css('display', 'block');
			$tabSubNav.animate({marginLeft: newLeftMargin + 'px'}, 500);
			$this.siblings('.tab-sub-nav-arrow.next').removeClass('disabled');

			//Check to see if the rest of the sub nav tabs fit in the width of the tabSubNav wrapper
			var widthOfRemaningSubTabs = 0;
			var indexOfSubTabInPartialView = -1;
			for(var i=tabSubMenuIndex; i<tabSubNavTabs.length; i++) {
				widthOfRemaningSubTabs += $(tabSubNavTabs[i]).width();

				if(widthOfRemaningSubTabs > tabSubNavWidth && indexOfSubTabInPartialView == -1) {
					indexOfSubTabInPartialView = i;
				}
			}

			if(tabSubMenuIndex === 0) {
				$this.addClass('disabled');
			}

			if(indexOfSubTabInPartialView != -1) {
				$(tabSubNavTabs[indexOfSubTabInPartialView]).css('display', 'none');
			}
	    });
    }

    function initSectionSelector() {
    	var $sections = $('#sections');

   		$sections.on('change', function(e) {
   			var val = $sections.val();

   			if(val.length) {
   				window.location.hash = '#' + $sections.val();
   			}
   		});
    }

	//initializer... 
    return {
        init: init
    };
};

$(document).ready(function () {
    TMONextGen = new TMONextGen(jQuery, window, document, undefined);
    TMONextGen.init();
});