// skin-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'skin';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    id: {type: String, default: ''} ,
    url: {type: String, default: ''}, 
    caption: {type: String, default: ''},
    date: {type: String, default:  ''},
    age: {type: String, default:  ''},
    memo: {type: String, default:  '메모를 입력하세요'},
    result: {type: String, default:  ''},
    bookmark: {type: Boolean, default: false},
    detect: {type: Boolean, default: false},
    detected_image: {type: String, default: ''}
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};
