// document.addEventListener('DOMContentLoaded', function () {
// 	const accordionItems = document.querySelectorAll('.accordion-item');

// 	accordionItems.forEach((item, index) => {
// 		item.addEventListener('click', () => {
// 			const content = item.querySelector('.accordion-content');

// 			if (content.classList.contains('active')) {
// 				content.classList.remove('active');
// 				item.classList.remove('active');
// 			} else {
// 				content.classList.add('active');
// 				item.classList.add('active');
// 			}
// 		});

// 		// Open the first item by default
// 		if (index === 0) {
// 			item.querySelector('.accordion-content').classList.add('active');
// 			item.classList.add('active');
// 		}
// 	});
// });

const circles = document.querySelectorAll('.facts-element__circle');
circles.forEach(el => {

	if (el.dataset.percentage == 'true') {
		let progress = el.querySelector('.progress');
		let valueBlock = el.querySelector('.facts-element__value');
		let radius = progress.getAttribute('r');
		let circleLength = 2 * Math.PI * radius;
		let full = el.dataset.full;
		let value = el.dataset.value;
		let percentageProgress = Math.floor(value / full * 100);
		valueBlock.textContent = value;
		progress.setAttribute('stroke-dasharray', circleLength);
		progress.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);
	} else {
		let progress = el.querySelector('.progress');
		let valueBlock = el.querySelector('.facts-element__value');
		let radius = progress.getAttribute('r');
		let circleLength = 2 * Math.PI * radius;
		let percent = el.dataset.percent;
		let percentageProgress = Math.floor(percent);
		valueBlock.textContent = percent + '%';
		progress.setAttribute('stroke-dasharray', circleLength);
		progress.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);
	}

});


/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';

/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {

	const homeSwiper = document.querySelector('.home__swiper')

	if (homeSwiper) {
		new Swiper(homeSwiper, {

			modules: [Navigation, Pagination, Autoplay],
			navigation: {
				nextEl: ".home__arrow-right",
				prevEl: ".home__arrow-left",
			},
			speed: 600,

			autoplay: {
				delay: 7000,
			},

			pagination: {
				el: ".home__pag",
			},

			on: {
				init: function () {
					const pag = document.querySelectorAll('.swiper-pagination-bullet')

					pag.forEach(el => {
						el.innerHTML = '<span class="home__line"></span>'
					})
				}
			}
		});
	}

	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	const historySlider = document.querySelector('.history__swiper')

	if (historySlider) {
		const mainModern = new Swiper(historySlider, {
			modules: [Navigation, Thumbs],
			spaceBetween: 20,
			slidesPerView: 1,
			loop: true,
			navigation: {
				nextEl: ".history-button__right",
				prevEl: ".history-button__left",
			}
		})

		const historyBtns = document.querySelectorAll('.history__link');

		const setActiveBtn = (index) => {
			historyBtns.forEach((btn, idx) => {
				btn.classList.toggle('history-nav__btn--active', idx == index);
				btn.setAttribute('data-index', idx);
			});
		};

		mainModern.on('slideChange', () => {
			console.log(mainModern.realIndex)
			setActiveBtn(mainModern.realIndex)
		})

		historyBtns.forEach(btn => {
			btn.addEventListener('click', e => {
				const index = e.currentTarget.dataset.index;
				setActiveBtn(index);
				mainModern.slideTo(index)
			});
		});
	}

	const mainModern = document.querySelector('.dev-modern__main')

	if (mainModern) {
		const mainModern = new Swiper('.dev-modern__nav', {
			spaceBetween: 20,
			slidesPerView: 10,
			freeMode: true,
			watchSlidesProgress: true,
		});
		const navModern = new Swiper('.dev-modern__main', {
			modules: [Navigation, Thumbs],
			slidesPerView: 1,
			speed: 900,
			spaceBetween: 10,
			navigation: {
				nextEl: '.dev-modern__right',
				prevEl: '.dev-modern__left',
			},
			thumbs: {
				swiper: mainModern,
			},
		})
	}
	if (document.querySelector('.works__swiper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.works__swiper', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку

			modules: [Navigation],

			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 20,
			//autoHeight: true,
			speed: 1800,



			breakpoints: {

				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30,
				},

			},



			//touchRatio: 0,
			// simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			
			*/

			// coverflowEffect: {
			// 	rotate: 50,
			// 	stretch: 0,
			// 	depth: 100,
			// 	modifier: 1,
			// 	slideShadows: true,

			// },
			// effect: 'coverflow',

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.works-button__left',
				nextEl: '.works-button__right',
			},




			// Події
			on: {

			}
		});
	}

	if (document.querySelector('.clients-swiper')) {
		new Swiper('.clients-swiper', {
			navigation: {
				prevEl: '.clients-button-left',
				nextEl: '.clients-button-right',
			},

			loop: true,
			speed: 800,
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});