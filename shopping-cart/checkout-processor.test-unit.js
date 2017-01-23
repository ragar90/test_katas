var chai = require('chai')
var expect = chai.expect
var assert = chai.assert
var _ = require('lodash')
var data = require('./test-data')
var procesor = require('./index')

describe('CheckoutProcessor', function () {

	beforeEach(function () {
		procesor.setShoppingList(data)
	})

	afterEach(function () {
		procesor.clearShoppingList()
	})

	describe('getShoppingList()', function () {
		it('should retrive an array with the items about to purchase', function () {
			var items = procesor.getShoppingList()
			expect(items).to.be.an('array')
		})
	})

	describe('getShoppingListCount()', function () {
		it('should return a number', function () {
			assert.isNumber(procesor.getShoppingListCount(), "should be a integer number")
		})
	})

	describe('clearShoppingList()', function () {
		it('should clear all item from the current shopping list', function () {
			procesor.clearShoppingList()
			expect(procesor.getShoppingListCount()).to.be.equal(0)
		})
	})

	describe('getTotalBeforeTaxes()', function () {
		var totalExpected
		before(function () {
			totalExpected = _.reduce(data, function(total, item){
				return total + (item.price * item.quantity)
			}, 0)
		})

		it('should retrive the total amout before taxes', function () {
			var total = procesor.getTotalBeforeTaxes()
			expect(total).to.be.equal(totalExpected)
		})
	})

	describe('getTaxes()', function () {

		it('should retrive the amout of taxes to be charge over the total amount (13%)', function () {
			var expectedTaxes = procesor.getTotalBeforeTaxes() * 0.13
			var taxes = procesor.getTaxes()
			expect(taxes).to.be.equal(expectedTaxes)
		})
	})


	describe('addItem(item)', function(){
		var item
		before(function () {
			item = {
				name: 'New Item',
				price: 14.25,
				quantity: 2
			}
			
		})
		describe('WHEN a new item is added to the shopping cart', function () {
			it('should update the number of total items in the shopping cart list', function () {
				expectedTotalItems = procesor.getShoppingListCount()
				procesor.addItem(item)
				var totalItems = procesor.getShoppingListCount()
				expect(totalItems).to.be.equal(expectedTotalItems+1)
			})

			it('should update the total amount before taxes', function () {
				currentAmountBeforeTaxes = procesor.getTotalBeforeTaxes()
				expectedAmountBeforeTaxes = currentAmountBeforeTaxes + (item.price * item.quantity)
				procesor.addItem(item)
				var amountBeforeTaxes = procesor.getTotalBeforeTaxes()
				expect(amountBeforeTaxes).to.be.equal(expectedAmountBeforeTaxes)
			})
		})
	})

})