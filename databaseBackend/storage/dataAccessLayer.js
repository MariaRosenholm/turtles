"use strict";

const { MESSAGES } = require("./statusCodes");
const Database = require("./database");
const sql = require("./sqlStatements.json");

const options = require("../config/options.json");

const PRIMARY_KEY = sql.primarykey;

module.exports = class Datastorage {
  constructor() {
    this.db = new Database(options);
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(sql.getAll);
        resolve(result.queryResult);
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  getOne(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(sql.get, [key]);
        if (result.queryResult.length > 0) {
          resolve(result.queryResult[0]);
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key));
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  insert(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!resource.number === Number && !resource.number.trim()) {
          reject(MESSAGES.NOT_INSERTED());
        } else {
          await this.db.doQuery(sql.insert, [
            +resource.number,
            resource.name,
            +resource.age,
            resource.speed,
            +resource.weightKg,
          ]);
          resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(key, resource) {
    return new Promise(async (resolve, reject) => {
      try {
        if (key && resource) {
          if (resource[PRIMARY_KEY] != key) {
            reject(MESSAGES.KEYS_DO_NOT_MATCH());
          } else {
            const resultGet = await this.db.doQuery(sql.get, [key]);
            if (resultGet.queryResult.length > 0) {
              const result = await this.db.doQuery(sql.update, [
                resource.name,
                +resource.age,
                resource.speed,
                +resource.weightKg,
                +resource.number,
              ]);
              if (result.queryResult.rowsChanged === 0) {
                resolve(MESSAGES.NOT_UPDATED());
              } else {
                resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
              }
            } else {
              this.insert(resource)
                .then((status) => resolve(status))
                .catch((err) => reject(err));
            }
          }
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }

  remove(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(sql.remove, [key]);
        if (result.queryResult.rowsChanged === 1) {
          resolve(MESSAGES.DELETE_OK(PRIMARY_KEY, key));
        } else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, key));
        }
      } catch (err) {
        console.log(err);
        reject(MESSAGES.PROGRAM_ERROR());
      }
    });
  }
};
