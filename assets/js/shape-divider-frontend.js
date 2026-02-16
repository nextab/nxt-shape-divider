(function() {
	'use strict';

	const shapes = window.NxtShapeDividerShapes || {};

	function getShapeSVG(shape, color, flip, invert) {
		if (!shapes[shape]) {
			return '';
		}

		let svg = shapes[shape].svg.replace(/\{\{COLOR\}\}/g, color);

		let styles = 'display: block; width: 100%; max-width: 100%; height: 100%;';
		if (flip || invert) {
			let transform = '';
			if (flip) transform += 'scaleX(-1) ';
			if (invert) transform += 'scaleY(-1)';
			styles += ` transform: ${transform.trim()};`;
		}

		svg = svg.replace('<svg', `<svg style="${styles}"`);

		return svg;
	}

	function getComputedBackgroundColor(element) {
		const computed = window.getComputedStyle(element);
		let bgColor = computed.backgroundColor;

		if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
			let parent = element.parentElement;
			while (parent) {
				const parentBg = window.getComputedStyle(parent).backgroundColor;
				if (parentBg !== 'rgba(0, 0, 0, 0)' && parentBg !== 'transparent') {
					bgColor = parentBg;
					break;
				}
				parent = parent.parentElement;
			}
			if (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
				bgColor = 'rgb(255, 255, 255)';
			}
		}

		return rgbToHex(bgColor);
	}

	function rgbToHex(rgb) {
		const rgbMatch = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
		if (!rgbMatch) {
			return rgb;
		}

		const hex = (x) => {
			const hexValue = parseInt(x).toString(16);
			return hexValue.length === 1 ? '0' + hexValue : hexValue;
		};

		return '#' + hex(rgbMatch[1]) + hex(rgbMatch[2]) + hex(rgbMatch[3]);
	}

	function createShapeDivider(blockElement, position, config) {
		const color = config.color || getComputedBackgroundColor(blockElement);
		const svg = getShapeSVG(config.shape, color, config.flip, config.invert);

		if (!svg) {
			return;
		}

		const divider = document.createElement('div');
		divider.className = 'nxt-shape-divider nxt-shape-divider--' + position;
		divider.style.position = 'absolute';
		divider.style.left = '50%';
		divider.style.width = '100%';
		divider.style.maxWidth = '100%';
		divider.style.height = config.height + 'px';
		divider.style.pointerEvents = 'none';
		divider.style.zIndex = '1';
		divider.style.lineHeight = '0';

		if (position === 'top') {
			divider.style.top = '0';
			divider.style.transform = 'translateY(0) translateX(-50%)';
		} else {
			divider.style.bottom = '0';
			divider.style.transform = 'translateY(0) translateX(-50%)';
		}

		divider.innerHTML = svg;

		if (position === 'top') {
			blockElement.insertBefore(divider, blockElement.firstChild);
		} else {
			blockElement.appendChild(divider);
		}
	}

	function initShapeDividers() {
		const blocks = document.querySelectorAll(
			'.wp-block-group[data-shape-divider-top], .wp-block-group[data-shape-divider-bottom], ' +
			'.wp-block-cover[data-shape-divider-top], .wp-block-cover[data-shape-divider-bottom]'
		);

		blocks.forEach(block => {
			const computedStyle = window.getComputedStyle(block);
			const currentPosition = computedStyle.position;

			if (currentPosition === 'static') {
				block.style.position = 'relative';
			}

			const topData = block.getAttribute('data-shape-divider-top');
			if (topData) {
				try {
					const config = JSON.parse(topData);
					createShapeDivider(block, 'top', config);
				} catch (e) {
					console.error('Failed to parse top divider data:', e);
				}
			}

			const bottomData = block.getAttribute('data-shape-divider-bottom');
			if (bottomData) {
				try {
					const config = JSON.parse(bottomData);
					createShapeDivider(block, 'bottom', config);
				} catch (e) {
					console.error('Failed to parse bottom divider data:', e);
				}
			}
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initShapeDividers);
	} else {
		initShapeDividers();
	}

})();
