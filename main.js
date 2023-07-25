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
    let currentBalance = this.balance();
    if (amt <= currentBalance) {
      let chargeTransaction = new Transaction(-amt, payee);
      this.transaction.push(chargeTransaction);
    }
  }

  deposit(amt) {
    if (amt > 0) {
      let depositTransaction = new Transaction(amt, "Deposit");
      this.transaction.push(depositTransaction);
    }
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

    it("should not allow a negative deposit", function () {
      let acct1 = new BankAccount("xx4432", "James Doe");
      assert.equal(acct1.balance(), 0);
      acct1.deposit(100);
      assert.equal(acct1.balance(), 100);
      acct1.deposit(-30);
      assert.equal(acct1.balance(), 100);
    });

    it("should not allow charging to overdraft", function () {
      let acct1 = new BankAccount("xx4432", "James Doe");
      assert.equal(acct1.balance(), 0);
      acct1.charge("Target", 30);
      assert.equal(acct1.balance(), 0);
    });

    it("should allow a refund", function () {
      let acct1 = new BankAccount("xx4432", "James Doe");
      assert.equal(acct1.balance(), 0);
      acct1.charge("Target", -30);
      assert.equal(acct1.balance(), 30);
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
  describe("#Bunch of transactions and tests", function () {
    let bigAccount = new BankAccount("11223344", "Maggie Smith");
    it("test account created correctly", function () {
      assert.equal("11223344", bigAccount.accountNumber);
      assert.equal("Maggie Smith", bigAccount.owner);
      assert.equal(bigAccount.balance(), 0);
    });

    it("test deposit", function () {
      bigAccount.deposit(30); //30
      bigAccount.deposit(20); //50
      bigAccount.deposit(-3); //50
      bigAccount.deposit(34.25); //84.25
      bigAccount.deposit(10000.45); //10084.70
      assert.equal(10084.7, bigAccount.balance());
      bigAccount.charge("Clearout", 10084.7);
      assert.equal(0, bigAccount.balance());
    });

    it("test charges", function () {
      bigAccount.deposit(10000); 
      bigAccount.charge("Target", 40); //9960
      bigAccount.charge("Freebirds", 10.32); //9949.68
      bigAccount.charge("Texaco", 40); //9909.68
      bigAccount.charge("Bob's", -20); // 9929.68
      assert.equal("9929.68",  bigAccount.balance());
      assert.equal(10, bigAccount.transaction.length);
    });

    it("test overdraft", function () {
        bigAccount.charge("Target", 20000); 
        assert.equal(10, bigAccount.transaction.length);
        assert.equal("9929.68",  bigAccount.balance());
      });

      it("test a zero deposit", function () {
        bigAccount.deposit(0); 
        assert.equal(10, bigAccount.transaction.length);
        assert.equal("9929.68",  bigAccount.balance());
      });
  });
}
