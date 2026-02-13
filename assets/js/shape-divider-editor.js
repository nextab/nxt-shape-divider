(function() {
	'use strict';

	const { addFilter } = wp.hooks;
	const { createHigherOrderComponent } = wp.compose;
	const { InspectorControls, PanelColorSettings } = wp.blockEditor;
	const { PanelBody, ToggleControl, SelectControl, RangeControl } = wp.components;
	const { Fragment, createElement } = wp.element;
	const { __ } = wp.i18n;

	const shapes = window.NxtShapeDividerShapes || {};
	const shapeOptions = Object.keys(shapes).map(key => ({
		label: shapes[key].label,
		value: key
	}));

	addFilter(
		'blocks.registerBlockType',
		'nxt-shape-divider/add-attributes',
		(settings, name) => {
			if (name !== 'core/group') {
				return settings;
			}

			return {
				...settings,
				attributes: {
					...settings.attributes,
					enableTopDivider: {
						type: 'boolean',
						default: false
					},
					enableBottomDivider: {
						type: 'boolean',
						default: false
					},
					topDividerShape: {
						type: 'string',
						default: 'wave'
					},
					bottomDividerShape: {
						type: 'string',
						default: 'wave'
					},
					topDividerColor: {
						type: 'string',
						default: ''
					},
					bottomDividerColor: {
						type: 'string',
						default: ''
					},
					topDividerHeight: {
						type: 'number',
						default: 100
					},
					bottomDividerHeight: {
						type: 'number',
						default: 100
					},
					topDividerFlip: {
						type: 'boolean',
						default: false
					},
					bottomDividerFlip: {
						type: 'boolean',
						default: false
					},
					topDividerInvert: {
						type: 'boolean',
						default: false
					},
					bottomDividerInvert: {
						type: 'boolean',
						default: false
					}
				}
			};
		}
	);

	const withShapeDividerControls = createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (props.name !== 'core/group') {
				return createElement(BlockEdit, props);
			}

			const { attributes, setAttributes } = props;
			const {
				enableTopDivider,
				enableBottomDivider,
				topDividerShape,
				bottomDividerShape,
				topDividerColor,
				bottomDividerColor,
				topDividerHeight,
				bottomDividerHeight,
				topDividerFlip,
				bottomDividerFlip,
				topDividerInvert,
				bottomDividerInvert
			} = attributes;

			return createElement(
				Fragment,
				null,
				createElement(BlockEdit, props),
				createElement(
					InspectorControls,
					{ group: 'settings' },
					createElement(
						PanelBody,
						{
							title: __('Shape Divider', 'nxt-shape-divider'),
							initialOpen: false
						},
						createElement(ToggleControl, {
							label: __('Enable Top Divider', 'nxt-shape-divider'),
							checked: enableTopDivider,
							onChange: (value) => setAttributes({ enableTopDivider: value })
						}),
						enableTopDivider && createElement(
							Fragment,
							null,
							createElement(SelectControl, {
								label: __('Shape', 'nxt-shape-divider'),
								value: topDividerShape,
								options: shapeOptions,
								onChange: (value) => setAttributes({ topDividerShape: value })
							}),
							createElement(RangeControl, {
								label: __('Height (px)', 'nxt-shape-divider'),
								value: topDividerHeight,
								onChange: (value) => setAttributes({ topDividerHeight: value }),
								min: 20,
								max: 200,
								step: 5
							}),
							createElement(ToggleControl, {
								label: __('Flip Horizontal', 'nxt-shape-divider'),
								checked: topDividerFlip,
								onChange: (value) => setAttributes({ topDividerFlip: value })
							}),
							createElement(ToggleControl, {
								label: __('Invert Vertical', 'nxt-shape-divider'),
								checked: topDividerInvert,
								onChange: (value) => setAttributes({ topDividerInvert: value })
							})
						),
						enableTopDivider && createElement(PanelColorSettings, {
							title: __('Top Divider Color', 'nxt-shape-divider'),
							initialOpen: false,
							colorSettings: [
								{
									value: topDividerColor,
									onChange: (color) => setAttributes({ topDividerColor: color ?? '' }),
									label: __('Color', 'nxt-shape-divider'),
									clearable: true
								}
							]
						}),
						createElement('hr', { style: { margin: '20px 0' } }),
						createElement(ToggleControl, {
							label: __('Enable Bottom Divider', 'nxt-shape-divider'),
							checked: enableBottomDivider,
							onChange: (value) => setAttributes({ enableBottomDivider: value })
						}),
						enableBottomDivider && createElement(
							Fragment,
							null,
							createElement(SelectControl, {
								label: __('Shape', 'nxt-shape-divider'),
								value: bottomDividerShape,
								options: shapeOptions,
								onChange: (value) => setAttributes({ bottomDividerShape: value })
							}),
							createElement(RangeControl, {
								label: __('Height (px)', 'nxt-shape-divider'),
								value: bottomDividerHeight,
								onChange: (value) => setAttributes({ bottomDividerHeight: value }),
								min: 20,
								max: 200,
								step: 5
							}),
							createElement(ToggleControl, {
								label: __('Flip Horizontal', 'nxt-shape-divider'),
								checked: bottomDividerFlip,
								onChange: (value) => setAttributes({ bottomDividerFlip: value })
							}),
							createElement(ToggleControl, {
								label: __('Invert Vertical', 'nxt-shape-divider'),
								checked: bottomDividerInvert,
								onChange: (value) => setAttributes({ bottomDividerInvert: value })
							})
						),
						enableBottomDivider && createElement(PanelColorSettings, {
							title: __('Bottom Divider Color', 'nxt-shape-divider'),
							initialOpen: false,
							colorSettings: [
								{
									value: bottomDividerColor,
									onChange: (color) => setAttributes({ bottomDividerColor: color ?? '' }),
									label: __('Color', 'nxt-shape-divider'),
									clearable: true
								}
							]
						})
					)
				)
			);
		};
	}, 'withShapeDividerControls');

	addFilter(
		'editor.BlockEdit',
		'nxt-shape-divider/controls',
		withShapeDividerControls
	);

	function getShapeSVG(shape, color, flip, invert) {
		if (!shapes[shape]) {
			return '';
		}

		const useColor = color || '#000000';
		let svg = shapes[shape].svg.replace(/\{\{COLOR\}\}/g, useColor);

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

	const withShapeDividerPreview = createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			if (props.name !== 'core/group') {
				return createElement(BlockListBlock, props);
			}

			const { attributes } = props;
			const {
				enableTopDivider,
				enableBottomDivider,
				topDividerShape,
				bottomDividerShape,
				topDividerColor,
				bottomDividerColor,
				topDividerHeight,
				bottomDividerHeight,
				topDividerFlip,
				bottomDividerFlip,
				topDividerInvert,
				bottomDividerInvert
			} = attributes;

		if (!enableTopDivider && !enableBottomDivider) {
			return createElement(BlockListBlock, props);
		}

		return createElement(
			'div',
			{ 
				style: {
					position: 'relative',
					overflow: 'visible',
					width: '100%',
					maxWidth: '100%'
				}
			},
			enableTopDivider && createElement('div', {
				className: 'nxt-shape-divider nxt-shape-divider--top',
				style: {
					position: 'absolute',
					top: 0,
					left: '50%',
					width: '100%',
					maxWidth: '100%',
					height: topDividerHeight + 'px',
					transform: 'translateY(0) translateX(-50%)',
					pointerEvents: 'none',
					zIndex: 1,
					lineHeight: 0
				},
				dangerouslySetInnerHTML: {
					__html: getShapeSVG(topDividerShape, topDividerColor, topDividerFlip, topDividerInvert)
				}
			}),
			createElement(BlockListBlock, props),
			enableBottomDivider && createElement('div', {
				className: 'nxt-shape-divider nxt-shape-divider--bottom',
				style: {
					position: 'absolute',
					bottom: 0,
					left: '50%',
					width: '100%',
					maxWidth: '100%',
					height: bottomDividerHeight + 'px',
					transform: 'translateY(0) translateX(-50%)',
					pointerEvents: 'none',
					zIndex: 1,
					lineHeight: 0
				},
				dangerouslySetInnerHTML: {
					__html: getShapeSVG(bottomDividerShape, bottomDividerColor, bottomDividerFlip, bottomDividerInvert)
				}
			})
		);
		};
	}, 'withShapeDividerPreview');

	addFilter(
		'editor.BlockListBlock',
		'nxt-shape-divider/preview',
		withShapeDividerPreview
	);

	addFilter(
		'blocks.getSaveContent.extraProps',
		'nxt-shape-divider/save-data',
		(extraProps, blockType, attributes) => {
			if (blockType.name !== 'core/group') {
				return extraProps;
			}

			if (attributes.enableTopDivider) {
				const topData = {
					shape: attributes.topDividerShape,
					color: attributes.topDividerColor,
					height: attributes.topDividerHeight,
					flip: attributes.topDividerFlip,
					invert: attributes.topDividerInvert
				};
				extraProps['data-shape-divider-top'] = JSON.stringify(topData);
			}

			if (attributes.enableBottomDivider) {
				const bottomData = {
					shape: attributes.bottomDividerShape,
					color: attributes.bottomDividerColor,
					height: attributes.bottomDividerHeight,
					flip: attributes.bottomDividerFlip,
					invert: attributes.bottomDividerInvert
				};
				extraProps['data-shape-divider-bottom'] = JSON.stringify(bottomData);
			}

			return extraProps;
		}
	);

})();
