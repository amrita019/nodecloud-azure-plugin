const msRestAzure = require("ms-rest-azure");
const virtualmachine = require("./compute/virtual-machine");
const blobStorage = require("./storage/blob-storage");
const queueStorage = require("./storage/queue-storage");
const tableStorage = require("./storage/table-storage");
const virtualNetwork = require("./network/azure-virtual-network");
const webSite = require("./webapps/app-service");
const database = require("./database/azure-database");
const api = require("./utilities/azure-api");
const dnsmanagement = require("./network/dns-management-client")

class Azure {
  constructor() {
    this._azureRestSdk = msRestAzure;

    if (
      !process.env.AZURE_TENANT_ID ||
      !process.env.AZURE_CLIENT_ID ||
      !process.env.AZURE_SUBSCRIPTION_ID ||
      !process.env.AZURE_CLIENT_SECRET
    ) {
      throw new Error("Provide credentials");
    }

    return {
      getSDK: () => this._azureRestSdk,
      compute: this.virtualmachine,
      blob: this.blobstorage,
      queue: this.queuestorage,
      table: this.tablestorage,
      network: this.virtualnetwork,
      website: this.website,
      sql: this.sql,
      api: this.api,
      dnsmanagement: this.dnsmanagement
    };
  }

  virtualmachine() {
    return new virtualmachine(this.getSDK());
  }

  blobstorage() {
    return new blobStorage();
  }

  queuestorage() {
    return new queueStorage();
  }

  tablestorage() {
    return new tableStorage();
  }

  virtualnetwork() {
    return new virtualNetwork(this.getSDK());
  }

  website() {
    return new webSite(this.getSDK());
  }

  sql() {
    return new database(this.getSDK());
  }

  api() {
    return new api(this.getSDK());
  }

  dnsmanagement() {
    return new dnsmanagement(this.getSDK());
  }
}

module.exports = Azure;
