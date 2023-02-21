import fs from 'fs';
import crypto from 'crypto';

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename!');
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch(err) {
      // Creates a file in file system
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: 'utf8' })
    );
  }

  async create(attrs) {
    attrs.Id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);
  };

  async writeAll(records) {
    // write updated records to users.json <this.filename>
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  };

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  };

  async getOne(id) {
    const records = await this.getAll();

    return records.find(record => record.Id === id);
  };

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.Id !== id);

    await this.writeAll(filteredRecords);
  };

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.Id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found.`);
    }

    Object.assign(record, attrs);
    await this.writeAll(records);
  };

  async getOneBy(filters) {
    const records = await this.getAll();

    // for (let record of records) {
    //   let found = true;

    //   for (let key in filters) {
    //     if (record[key] !== filters[key]) {
    //       found = false;
    //     }

    //     if (found) {
    //       return record;
    //     }
    //   }
    // }

    const record = records.filter(record => {
      for (let key in filters) {
         if (record[key] !== filters[key]) return false;
      }
      return true;
   });
   return record[0];
  }
};

export default new UsersRepository('users.json');
