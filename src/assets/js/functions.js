$(document).ready(function () {
  $(".button_toogle-nav").click(function () {
    $('.top__line-menu').slideToggle();
  });
  $(".monitor__item-head").click(function () {
    if ($(this).next().hasClass("monitor__item-content")) {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        $(this).next().slideDown();
      } else {
        $(this).removeClass("active");
      }
    } else {
      $(".monitor__item-content").slideUp();
    }
  });
  $(".monitor__item-list").click(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
  });
  $(".btn-clear").click(function (e) {
    e.preventDefault();
    $(".monitor__item-head").removeClass("active");
    $(".monitor__item-list").removeClass("active");
    $(".monitor__item-content").slideUp();
  });
  $(".button_toogle-monitor").click(function () {
    $('.monitor-nav').slideToggle();
  });
  $(".button_toogle-routes").click(function () {
    $('.routes__control-left').toggleClass("show");
  });
  $(".button_toogle-routes-mob").click(function () {
    $('.settings__routes-bottom').slideToggle();
  });
  $(".btn-sidebar").click(function () {
    handler()
  });
  $(".button_toogle-sidebar").click(function () {
    $("#navbar__menu").slideToggle();
  });
  $(".button_toogle-settings").click(function () {
    $("#navbar__menu").slideToggle();
  });
  $(".js-more-group").click(function () {
    $(".settings__view-step-one").hide().removeClass("active");
    $(".step-groups").show().addClass("active");
    $(".settings__routes-button").addClass("hide");
  });
  $(".js-more-social").click(function () {
    $(".settings__view-step-one").hide().removeClass("active");
    $(".step-social").show().addClass("active");
    $(".settings__routes-button").addClass("hide");
  });
  $(".js-groups").click(function (e) {
    e.preventDefault();
    $(".settings__routes-button").removeClass("hide");
    $(".step-groups").hide().removeClass("active");
    $(".settings__view-step-one").show().addClass("active");
  });
  $(".js-social").click(function (e) {
    e.preventDefault();
    $(".settings__routes-button").removeClass("hide");
    $(".step-social").hide().removeClass("active");
    $(".settings__view-step-one").show().addClass("active");
  });
  $(".btn-routes").click(function (e) {
    e.preventDefault();
    $(".routes__control-right").addClass("show");
  });
  $(".btn-reload-routes").click(function (e) {
    e.preventDefault();
    $(".routes__control-right").removeClass("show");
    $(".settings__item").removeClass("no-blur");
    $(".btn-routes").addClass("disable");
    $(".groups-li").removeClass("selected")
  });
  $(".groups__list a, .settings__groups a").click(function () {
    blurSettings()
  });

  function blurSettings() {
    if ($(".groups__list").children(".selected")) {
      $(".settings__item").addClass("no-blur");
      $(".btn-routes").removeClass("disable");
    } else {
      $(".settings__item").removeClass("no-blur");
    }
  }

  // selected themes
  $(".groups-themes a").click(function (e) {
    e.preventDefault();
    $(".groups-themes a").removeClass("selected");
    $(".groups-theme-main a").removeClass("selected")
    var theme = $(this).data("theme");
    var item = $('.groups-theme-main').children('[data-theme="' + theme + '"]');
    item.insertBefore('.groups-theme-main a:eq(0)').css("display", "inline-flex").addClass("selected");
  });
  $(".groups-social a").click(function (e) {
    e.preventDefault();
    $(".groups-social a").removeClass("selected");
    $(".groups-social-main a").removeClass("selected")
    var group = $(this).data("group");
    var itemGroup = $('.groups-social-main').children('[data-group="' + group + '"]');
    itemGroup.insertBefore('.groups-social-main a:eq(0)').css("group", "inline-flex").addClass("selected");
  });
  // function hideAllElement(){
  //   if($(".groups-theme-main").children("a").length > 4){
  //      $('.groups-theme-main a:nth-child(n+5)').css("display", "none")
  //   }
  // }
  // Slider range
  var sliderRange = $('#slider-min');
  var sliderMin = sliderRange.data('min');
  var sliderMax = sliderRange.data('max');
  var sliderStep = sliderRange.data('step');
  $('.slider-min-value .min-range').html(sliderMin);
  $('.slider-min-value .max-range').html(sliderMax);
  sliderRange.slider({
    animate: "slow",
    range: "min",
    min: sliderMin,
    max: sliderMax,
    value: sliderMin,
    step: sliderStep,
    slide: function (event, ui) {
      sliderRange.find(".price-range").text(ui.value);
      if (ui.value == sliderMin) {
        $(".slider-min-value .min-range").addClass("hide");
      } else if (ui.value == sliderMax) {
        $(".slider-min-value .max-range").addClass("hide");
      } else {
        $(".slider-min-value .min-range").removeClass("hide");
        $(".slider-min-value .max-range").removeClass("hide");
      }
    }
  });
  sliderRange.find('.ui-slider-handle').append('<span class="price-range value">' + sliderRange.slider('value') + '</span>');
  var sliderRangeRoutes = $('#slider-routes');
  var sliderMinRoutes = sliderRangeRoutes.data('min');
  var sliderMaxRoutes = sliderRangeRoutes.data('max');
  var sliderStepRoutes = sliderRangeRoutes.data('step');
  $('.slider-routes-value .min-range').html(sliderMinRoutes);
  $('.slider-routes-value .max-range').html(sliderMaxRoutes);
  sliderRangeRoutes.slider({
    animate: "slow",
    range: "min",
    min: sliderMinRoutes,
    max: sliderMaxRoutes,
    value: sliderStepRoutes,
    step: sliderStepRoutes,
    slide: function (event, ui) {
      sliderRangeRoutes.find(".price-range").text(ui.value);
      if (ui.value == sliderMinRoutes) {
        $(".slider-routes-value .min-range").addClass("hide");
      } else if (ui.value == sliderMaxRoutes) {
        $(".slider-routes-value .max-range").addClass("hide");
      } else {
        $(".slider-routes-value .min-range").removeClass("hide");
        $(".slider-routes-value .max-range").removeClass("hide");
      }
    }
  });
  sliderRangeRoutes.find('.ui-slider-handle').append('<span class="price-range value">' + sliderRangeRoutes.slider('value') + '</span>');
  // Slider range end
  $(".groups-theme-main a").click(function (e) {
    e.preventDefault();
    $(".groups-theme-main a").removeClass("selected");
  });
  $(".groups-social-main a").click(function (e) {
    e.preventDefault();
    $(".groups-social-main a").removeClass("selected");
  });
  $(".groups-li").click(function (e) {
    e.preventDefault();
    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
    } else {
      $(this).addClass("selected");
    }
  });
  $("#navbar__menu").slideToggle();
  var handler = function () {
    var show = $(this).attr('show'); // проверяем атрибут, в котором записано - отображен спойлер или скрыт
    if (show == 1) { // если отображен, то прячем
      $(this).attr('show', 0);
      $(".btn-sidebar").parent().removeClass("rotate");
      $('#sidebar').removeClass("hidden-sidebar");
      $('.dashboard-right').removeClass("active");
    } else { // если спрятан, то показываем
      $(this).attr('show', 1);
      $(".btn-sidebar").parent().addClass("rotate");
      $('#sidebar').addClass("hidden-sidebar");
      $('.dashboard-right').addClass("active");
    }
  };
  $(".drop-arrow").click(function () {
    $(this).toggleClass("active");
    $(this).prev().slideToggle();
  });
  $('.pop').magnificPopup({
    type: 'inline', removalDelay: 500, callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      }
    }, midClick: true
  });
  $('.m-close,.btn-close').on("click", function () {
    $.magnificPopup.close();
  });
  $(".top__line_menu a").on("click", function (e) {
    var anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $(anchor.attr('href')).offset().top - 80
    }, 777);
    e.preventDefault();
    return false;
  });
  (function () {
    "use strict";
    var toggles = document.querySelectorAll(".c-hamburger");
    for (var i = toggles.length - 1; i >= 0; i--) {
      var toggle = toggles[i];
      toggleHandler(toggle);
    }


    function toggleHandler(toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this
          .classList.add("is-active");
      });
    }
  })();
  $(function () {
    $('.sidebar_group-list').slimScroll({
      height: 'auto', railVisible: 'true', touchScrollStep: 50, alwaysVisible: 'true', disableFadeOut: 'true'
    });
    // scroll element on map
    $('.groups__list').slimScroll({
      height: 'auto',
      scroll: 50,
      railVisible: 'true',
      touchScrollStep: 50,
      alwaysVisible: 'true',
      disableFadeOut: 'true'
    });
  });
  $(window).on('load resize', function (e) {
    var init = $(".map__items").data('init-slider');
    // Если мобильный
    if (window.innerWidth < 992) {
      // Если слайдер не запущен
      $(".map__items").slimScroll({
        destroy: false
      });
      $(".map__items").css("height", "inherit")
      if (init != 1) {
        $('.map__items').slick({
          slidesToShow: 1, slidesToScroll: 1, dots: false, focusOnSelect: true, arrows: false
        }).data({
          'init-slider': 1
        });
      }
    } else {
      $(".map__items").css("height", "750px")
      $('.map__items').slimScroll({
        height: 'auto',
        scroll: 50,
        railVisible: 'true',
        touchScrollStep: 50,
        alwaysVisible: 'true',
        disableFadeOut: 'true'
      });
      if (init == 1) {
        $('.map__items').slick('unslick').data({
          'init-slider': 0
        });
      }
    }
  }).trigger('resize');
  var map = L.map('map').setView([38.8486555, -104.824], 4);
  var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';
  var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
  }).addTo(map);
});
// График
$(function () {
  var barChartData = {
    labels: ["Группа 1", "Группа 2", "Группа 3"], datasets: [{
      label: "Обозначение 1", backgroundColor: "#5E60F3", data: [3, 5, 6]
    }, {
      label: "Обозначение 2", backgroundColor: "#FE7062", data: [4, 7, 3]
    }, {
      label: "Обозначение 3", backgroundColor: "#CCDAFD", data: [10, 7, 4]
    }]
  };
  var chartOptions = {
    responsive: true, legend: {
      position: "right"
    }, scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  window.onload = function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myBar = new Chart(ctx, {
      type: "bar", data: barChartData, options: chartOptions
    });
  };
  // Tooltip global resets
  Chart.defaults.global.tooltips.backgroundColor = '#9C9C9C'
  // Gridlines global resets
  // Chart.defaults.scale.gridLines.zeroLineColor = 'white'
  Chart.defaults.scale.gridLines.color = '#9C9C9C'
  var marksCanvas = document.getElementById("marksChart");
  var marksData = {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"], datasets: [{
      label: "Student A",
      backgroundColor: "rgba(200,0,0,0.4)",
      pointBackgroundColor: "red",
      borderColor: "red",
      data: [65, 75, 70, 80, 60, 80]
    }, {
      label: "Student B",
      backgroundColor: "rgba(0,0,200,0.4)",
      pointBackgroundColor: "blue",
      borderColor: "blue",
      data: [54, 65, 60, 70, 70, 75]
    }]
  };
  var radarChart = new Chart(marksCanvas, {
    type: 'radar', data: marksData
  });
  var marksCanvas2 = document.getElementById("marksChart2");
  var marksData2 = {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"], datasets: [{
      label: "Student A",
      backgroundColor: "rgba(200,0,0,0.4)",
      pointBackgroundColor: "red",
      borderColor: "red",
      backgroundColor: "rgba(200,0,0,0.4)",
      data: [65, 75, 70, 80, 60, 80]
    }, {
      label: "Student B",
      backgroundColor: "rgba(200,0,0,0.4)",
      pointBackgroundColor: "blue",
      borderColor: "blue",
      backgroundColor: "rgba(0,0,200,0.4)",
      data: [54, 65, 60, 70, 70, 75]
    }]
  };
  var radarChart2 = new Chart(marksCanvas2, {
    type: 'radar', data: marksData2
  });
  var marksCanvas3 = document.getElementById("marksChart3");
  var marksData3 = {
    labels: ["English", "Maths", "Physics", "Chemistry", "Biology", "History"], datasets: [{
      label: "Student A",
      backgroundColor: "rgba(200,0,0,0.4)",
      pointBackgroundColor: "red",
      borderColor: "red",
      backgroundColor: "rgba(200,0,0,0.4)",
      data: [65, 75, 70, 80, 60, 80]
    }, {
      label: "Student B",
      backgroundColor: "rgba(200,0,0,0.4)",
      pointBackgroundColor: "blue",
      borderColor: "blue",
      backgroundColor: "rgba(0,0,200,0.4)",
      data: [54, 65, 60, 70, 70, 75]
    }]
  };
  var radarChart3 = new Chart(marksCanvas3, {
    type: 'radar', data: marksData3
  });
  var night = document.getElementById('night');
  var day = document.getElementById('day');
  $('#toggle--daynight').on('click', function () {
    if ($(this).prop('checked')) {
      $(this).parent().addClass("active");
      $("#dashboard").addClass("dark");
      updateStyleRadarDark();
    } else {
      $(this).parent().removeClass("active");
      $("#dashboard").removeClass("dark");
      updateStyleRadarLight();
    }
  });
  var updateStyleRadarDark = function () {
    var radarChart2 = new Chart(marksCanvas2, {
      type: 'radar', data: marksData2, options: {
        scale: {
          ticks: {
            backdropColor: '#1F1F25'
          }
        }
      }
    });
    var radarChart = new Chart(marksCanvas, {
      type: 'radar', data: marksData, options: {
        scale: {
          ticks: {
            backdropColor: '#1F1F25'
          }
        }
      }
    });
    var radarChart3 = new Chart(marksCanvas3, {
      type: 'radar', data: marksData3, options: {
        scale: {
          ticks: {
            backdropColor: '#1F1F25'
          }
        }
      }
    });
    marksCanvas2.update();
    marksCanvas3.update();
    marksCanvas.update();
  };
  var updateStyleRadarLight = function () {
    var radarChart2 = new Chart(marksCanvas2, {
      type: 'radar', data: marksData2, options: {
        scale: {
          ticks: {
            backdropColor: '#ffffff'
          }
        }
      }
    });
    var radarChart = new Chart(marksCanvas, {
      type: 'radar', data: marksData, options: {
        scale: {
          ticks: {
            backdropColor: '#ffffff'
          }
        }
      }
    });
    var radarChart3 = new Chart(marksCanvas3, {
      type: 'radar', data: marksData3, options: {
        scale: {
          ticks: {
            backdropColor: '#ffffff'
          }
        }
      }
    });
    marksCanvas2.update();
    marksCanvas3.update();
    marksCanvas.update();
  };
});

// Select
$(document).ready(function () {
  $('select').each(function () {
    var $this = $(this), numberOfOptions = $(this).children('option').length;
    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled start"></div>');
    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
      'class': 'select-options'
    }).insertAfter($styledSelect);
    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(), rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }
    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.select-styled.active').not(this).each(function () {
        $(this).removeClass('active').next('ul.select-options').hide();
      });
      $(this).toggleClass('active').next('ul.select-options').toggle();
    });
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.removeClass("start");
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();
    });
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });
  });
  $('.accord-title').click(function () {
    $(this).toggleClass("active");
    $(".accord-txt").slideToggle();
  });
});
