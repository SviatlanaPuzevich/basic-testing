import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from './index';
import lodash from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = new BankAccount(95);
    expect(account.getBalance()).toEqual(95);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = new BankAccount(5);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = new BankAccount(15);
    const account2 = new BankAccount(2);
    expect(() => account1.transfer(25, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = new BankAccount(15);
    expect(() => account.transfer(2, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = new BankAccount(15);
    account.deposit(4);
    expect(account.getBalance()).toEqual(19);
  });

  test('should withdraw money', () => {
    const account = new BankAccount(15);
    account.withdraw(4);
    expect(account.getBalance()).toEqual(11);
  });

  test('should transfer money', () => {
    const account1 = new BankAccount(15);
    const account2 = new BankAccount(2);
    account1.transfer(6, account2);
    expect(account1.getBalance()).toEqual(9);
    expect(account2.getBalance()).toEqual(8);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const account = new BankAccount(15);
    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
    jest.restoreAllMocks();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = new BankAccount(15);
    account.fetchBalance = jest.fn().mockReturnValueOnce(89);
    await account.synchronizeBalance();
    expect(account.getBalance()).toEqual(89);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = new BankAccount(15);
    account.fetchBalance = jest.fn().mockReturnValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
