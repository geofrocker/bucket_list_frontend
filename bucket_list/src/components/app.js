import $ from 'jquery';


function animate(options) {
	let animationName = "animated " + options.name;
	let animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	$(options.selector)
	.addClass(animationName)
	.one(animationEnd, 
		function(){
			$(this).removeClass(animationName);
		}
	);
}

$(function() {
	let $itemActions = $(".item-actions-dropdown");

	$(document).on('click',function(e) {
		if (!$(e.target).closest('.item-actions-dropdown').length) {
			$itemActions.removeClass('active');
		}
	});

	$('.item-actions-toggle-btn').on('click',function(e){
		e.preventDefault();

		let $thisActionList = $(this).closest('.item-actions-dropdown');

		$itemActions.not($thisActionList).removeClass('active');

		$thisActionList.toggleClass('active');
	});
});

$(function() {
	setSameHeights();

	let resizeTimer;

	$(window).resize(function() {
		clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setSameHeights, 150);
	});
});


function setSameHeights($container) {

	$container = $container || $('.sameheight-container');

	$container.each(function() {

		let $items = $(this).find(".sameheight-item");

		// Get max height of items in container
		let maxHeight = 0;

		$items.each(function() {
			$(this).css({height: 'auto'});
			maxHeight = Math.max(maxHeight, $(this).innerHeight());
		});


		// Set heights of item
	});
}

$(function() {

    function drawDashboardItemsListSparklines(){
		$(".dashboard-page .items .sparkline").each(function() {
			let type = $(this).data('type');

			// There is predefined data
			if ($(this).data('data')) {
				let data = $(this).data('data').split(',').map(function(item) {
					if (item.indexOf(":") > 0) {
						return item.split(":");
					}
					else {
						return item;
					}
				});
			}
			// Generate random data
			else {
				let data = [];
				for (let i = 0; i < 17; i++) {
					data.push(Math.round(100 * Math.random()));
				}
			}

		});
	}

	drawDashboardItemsListSparklines();

	$(document).on("themechange", function(){
        drawDashboardItemsListSparklines();
    });
});
$(function() {

    if (!$('#select-all-items').length) {
        return false;
    }


    $('#select-all-items').on('change', function() {
        let $this = $(this).children(':checkbox').get(0);    

        $(this).parents('li')
            .siblings()
            .find(':checkbox')
            .prop('checked', $this.checked)
            .val($this.checked)
            .change();
    });

});
$(function() {
	$('.nav-profile > li > a').on('click', function() {
		let $el = $(this).next();

		animate({
			name: 'flipInX',
			selector: $el
		});
	});
})
$(function() {

	$("body").addClass("loaded");

});

