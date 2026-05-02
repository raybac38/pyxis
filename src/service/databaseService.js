import Database from "better-sqlite3";
import { AccountRepository } from "../repository/accountRepository.js";
import { ProductRepository } from "../repository/productRepository.js";
import { ProductVariantRepository } from "../repository/productVariantRepository.js";
import { StoreBrandRepository } from "../repository/storeBrandRepository.js";
import { TransactionItemRepository } from "../repository/transactionItemRepository.js";
import { StoreRepository } from "../repository/storeRepository.js";
import { TransactionsRepository } from "../repository/transactionsRepositorys.js";

import fs from "fs";

class DatabaseService {
  constructor() {
    this.database = new Database("db.sqlite");
    this.init();
    this.accountRepository = new AccountRepository(this.database);
    this.productRepository = new ProductRepository(this.database);
    this.productVariantRepository = new ProductVariantRepository(this.database);
    this.storeBrandRepository = new StoreBrandRepository(this.database);
    this.transactionsRepository = new TransactionsRepository(this.database);
    this.transactionItemRepository = new TransactionItemRepository(
      this.database,
    );
    this.storeRepository = new StoreRepository(this.database);
  }

  init() {
    const initSQL = fs.readFileSync("./init.sql", "utf-8");
    this.database.exec(initSQL);
    console.log("bd initialized");
  }

  getAccountRepository() {
    return this.accountRepository;
  }

  getProductRepository() {
    return this.productRepository;
  }

  getProductVariantRepository() {
    return this.productVariantRepository;
  }

  getStoreBrandRepository() {
    return this.storeBrandRepository;
  }

  getTransactionsRepository() {
    return this.transactionsRepository;
  }

  getTransactionItemRepository() {
    return this.transactionItemRepository;
  }

  getStoreRepository() {
    return this.storeRepository;
  }
}

export { DatabaseService };
