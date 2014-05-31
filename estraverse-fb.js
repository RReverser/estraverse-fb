var estraverse = module.exports = require('estraverse');

var VisitorKeys = {
	XJSIdentifier: [],
	XJSNamespacedName: ['namespace', 'name'],
	XJSMemberExpression: ['object', 'property'],
	XJSEmptyExpression: [],
	XJSExpressionContainer: ['expression'],
	XJSElement: ['openingElement', 'closingElement', 'children'],
	XJSClosingElement: ['name'],
	XJSOpeningElement: ['name', 'attributes'],
	XJSAttribute: ['name', 'value'],
	XJSText: null
};

for (var nodeType in VisitorKeys) {
	estraverse.Syntax[nodeType] = nodeType;

	var keys = VisitorKeys[nodeType];
	
	if (keys) {
		estraverse.VisitorKeys[nodeType] = keys;
	}
}