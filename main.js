"use strict";

class BankAccount {
  constructor(accountNumber, owner, transaction) {
    (this.accountNumber = accountNumber),
      (this.owner = owner),
      (this.transaction = []);
  }

  balance() {
    let sum = 0;
    for (let i = 0; i < this.transaction.length; i++) {
      sum += this.transaction[i].amount;
    }
    return sum;
  }

  charge(payee, amt) {
    let chargeTransaction = new Transaction(-amt, payee);
    this.transaction.push(chargeTransaction);
  }

  deposit(amt) {
    let depositTransaction = new Transaction(amt, 'Deposit');
    this.transaction.push(depositTransaction)
  }
}

//transaction
class Transaction {
  constructor(amount, payee) {
    (this.amount = amount), (this.payee = payee), (this.date = new Date());
  }
}

//test
if (typeof describe === "function") {
  const assert = require("assert");

  describe("#testing account creation", function () {
    it("should create a new account correctly", function () {
      let acct1 = new BankAccount("xx4432", "James Doe");
      assert.equal(acct1.owner, "James Doe");
      assert.equal(acct1.accountNumber, "xx4432");
      assert.equal(acct1.transaction.length, 0);
      assert.equal(acct1.balance(), 0);
    });
  });

  describe("#testing account balance", function () {
    it("should create a new account correctly", function () {
      let acct1 = new BankAccount("xx4432", "James Doe");
      assert.equal(acct1.balance(), 0);
      acct1.deposit(100);
      assert.equal(acct1.balance(), 100);
      acct1.charge("Target", 10);
      assert.equal(acct1.balance(), 90);
    });
  });

  //testing transaction
  describe("#Testing transaction creation", function () {
    it("should create a transaction correctly for deposit", function () {
      let t1 = new Transaction(50, "Deposit");
      assert.equal(t1.amount, 50);
      assert.equal(t1.payee, "Deposit");
      assert.notEqual(t1.date, undefined);
      assert.notEqual(t1.date, null);
    });
    it("should create a transaction correctly for a charge", function () {
      let t1 = new Transaction(-35.03, "Target");
      assert.equal(t1.amount, -35.03);
      assert.equal(t1.payee, "Target");
      assert.notEqual(t1.date, undefined);
      assert.notEqual(t1.date, null);
    });
  });
}
