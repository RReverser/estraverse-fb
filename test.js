var assert = require('chai').assert;
var parse = require('esprima-fb').parse;

describe('works', function () {
	var code = '<namespace:tag textAttr="value" exprAttr={expr} {...spreadAttr}><object.prop>!</object.prop>{}</namespace:tag>';
	var ast = parse(code);

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
		'XJSSpreadAttribute',
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

	beforeEach(function () {
		for (var key in require.cache) {
			delete require.cache[key];
		}
	});

	it('directly from dependency', function () {
		var traverse = require('./').traverse;
		var actualKeys = [];

		traverse(ast, {
			enter: function (node) {
				if (node.type.slice(0, 3) === 'XJS') {
					actualKeys.push(node.type);
				}
			}
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});

	it('in injected mode', function () {
		require('./');
		var traverse = require('estraverse').traverse;
		var actualKeys = [];

		traverse(ast, {
			enter: function (node) {
				if (node.type.slice(0, 3) === 'XJS') {
					actualKeys.push(node.type);
				}
			}
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});

	it('in single-pass mode', function () {
		var traverse = require('estraverse').traverse;
		var keys = require('./keys');

		var actualKeys = [];

		traverse(ast, {
			enter: function (node) {
				if (node.type.slice(0, 3) === 'XJS') {
					actualKeys.push(node.type);
				}
			},
			keys: keys
		});

		assert.throws(function () {
			traverse(ast, {
				enter: function () {}
			});
		});

		assert.deepEqual(actualKeys, expectedKeys);
	});
});