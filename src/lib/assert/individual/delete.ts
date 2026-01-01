type Table =   'service' | 'payment' | 'certification' | 'provider' | 'provider_certification';
type TableItem = {
    service: "svc";
    payment: "pay";
    certification: "cert";
    provider: "prov";
    provider_certification: "prov_cert";
}

/** Class representing crud functions of a given table */
class CrudFunctions<TTable extends Table> {
  /**
   * @param {string} table - the name of the table from the database
   */
  constructor(table: TTable) {
    this.table = table;
  }

  table: TTable;
  /**
   * get all items from the table
   * @returns {Array<table>}
   */
  getAll(): Array<TableItem[TTable]> {
    // const { rows } = await handleQuery(`SELECT * FROM ${this.table}`);
    const rows = [1];
    return rows as any;
  }
}

const generateTableFunctions = <const TArr extends ReadonlyArray<Table>>(tableArray: TArr) => {
    type Key = TArr[number];
  const tableFunctions =
    {} as {
        [K in Key]: CrudFunctions<K>
    }

  tableArray.forEach((table) => {
    (tableFunctions as any)[table] = new CrudFunctions(table);
  });

  return tableFunctions;
};


const foo = generateTableFunctions([
  'service',
  'payment',
  'certification',
  'provider',
]);