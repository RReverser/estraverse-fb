var assert = require('chai').assert;
var parse = require('esprima-fb').parse;
var traverse = require('./').traverse;

it('test', function () {
	var code = '<namespace:tag textAttr="value" exprAttr={expr}><object.prop>!</object.prop>{}</namespace:tag>';
	var ast = parse(code);

	var actualKeys = [];

	traverse(ast, {
		enter: function (node) {
			if (node.type.slice(0, 3) === 'XJS') {
				actualKeys.push(node.type);
			}
		}
	});

	var expectedKeys = [
		'XJSElement',
		'XJSOpeningElement',
		'XJSNamespacedName',
		'XJSIdentifier',
		'XJSIdentifier',
		'XJSAttribute',
		'XJSIdentifier',
		'XJSAttribute',
		'XJSIdentifier',
		'XJSExpressionContainer',
		'XJSClosingElement',
		'XJSNamespacedName',
		'XJSIdentifier',
		'XJSIdentifier',
		'XJSElement',
		'XJSOpeningElement',
		'XJSMemberExpression',
		'XJSIdentifier',
		'XJSIdentifier',
		'XJSClosingElement',
		'XJSMemberExpression',
		'XJSIdentifier',
		'XJSIdentifier',
		'XJSExpressionContainer',
		'XJSEmptyExpression'
	];

	assert.deepEqual(actualKeys, expectedKeys);
});