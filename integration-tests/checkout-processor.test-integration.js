var chai = require('chai')
var expect = chai.expect
var assert = chai.assert
var shoppingCart = require('../shopping-cart')

describe('CHECKOUT PROCESS SCENARIO', function () {
	describe('GIVEN a catalog of products for sale',function () {
		var products
		before(function () {
			products = require('../shopping-cart/test-data')
		})
		describe('WHEN a customer add a new product to his/her shopping cart', function () {
			describe('THEN the shopping cart', function () {
				it('should increase the item list', function () {

					// EXPECTATIONS
					var currentListCount = shoppingCart.getShoppingListCount()
					var product =  products[0]
					
					shoppingCart.addItem(product)
					var newListCount = shoppingCart.getShoppingListCount()

					assert.equal(newListCount, (currentListCount + 1), "should be equal")
					expect(newListCount).to.be.equal((currentListCount + 1))



				})
				it('should calculate the total amount to paid per item/quantity')
				it('should calculate the total amount to paid for all the selected items')
				it('should calculate the amount of taxes to be paid')
				it('should calculate the total amount to be paid')
			})
		})
	})
})