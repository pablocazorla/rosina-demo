const account = {
  LOGIN: "account/login.php",
};

const charges = {
  CHARGE_LIST: "charge/list.php",
  CHARGE_GET: "charge/get.php",
  CHARGE_POST: "charge/create.php",
  CHARGE_PUT: "charge/update.php",
  CHARGE_DELETE: "charge/delete.php",
};

const clients = {
  CLIENT_LIST: "client/list.php",
  CLIENT_GET: "client/get.php",
  CLIENT_POST: "client/create.php",
  CLIENT_PUT: "client/update.php",
  CLIENT_DELETE: "client/delete.php",
};

const items = {
  ITEM_LIST: "item/list.php",
  ITEM_GET: "item/get.php",
  ITEM_POST: "item/create.php",
  ITEM_PUT: "item/update.php",
  ITEM_DELETE: "item/delete.php",
};

const turns = {
  TURN_LIST: "turn/list.php",
  TURN_GET: "turn/get.php",
  TURN_POST: "turn/create.php",
  TURN_PUT: "turn/update.php",
  TURN_DELETE: "turn/delete.php",
};

////////////////////////
const endpoints = {
  ...account,
  ...charges,
  ...clients,
  ...items,
  ...turns,
};

export default endpoints;
