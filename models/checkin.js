const BaseModel = appRequire("models/base");
const Bookshelf = appRequire("config/bookshelf");

const checkin = BaseModel.extend({
  tableName: "checkin",
  itinerary() {
    this.belongsTo("itinerary");
  },
});

module.exports = Bookshelf.model("Checkin", checkin);
