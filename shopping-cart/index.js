var _ = require('lodash')
var items = []
exports.getShoppingListCount = function () {
	return items.length
}

exports.clearShoppingList = function () {
	items = []
}

exports.getShoppingList = function () {
	return items
}

exports.getTotalBeforeTaxes = function () {
	var total = _.reduce(items, function(total, item){
		return total + (item.price * item.quantity)
	}, 0)
	return total
}

exports.addItem = function(item){
	items.push(item)
}

exports.setShoppingList = function (existingList) {
	items = existingList
}

exports.getTaxes = function () {
	var totalBeforeTaxes = this.getTotalBeforeTaxes()
	return totalBeforeTaxes * 0.13
}