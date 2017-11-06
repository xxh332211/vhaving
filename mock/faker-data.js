module.exports = function () {
 var faker = require("faker");
 faker.locale = "zh_CN";
 var _ = require("lodash");
 return {
     people: _.times(100, function (n) {
         return {
             id: n,
             name: faker.name.findName(),
             avatar: faker.internet.avatar()
         }
     }),
     address: _.times(100, function (n) {
         return {
             id: faker.random.uuid(),
             city: faker.address.city(),
             county: faker.address.county()
         }
     }),
     tennet:_.times(20, function () {
         return {
             id: faker.random.uuid(),
             PayDate: faker.random.word(),
             Type: faker.random.word(),
             No: faker.random.word(),
             Name: faker.random.word(),
             SubDomain: faker.random.word(),
             BizType: faker.random.word(),
             Trade: faker.random.word(),
             Province: faker.random.word(),
             District: faker.random.word(),
             Address: faker.random.word(),
             PostCode: faker.random.word(),
             FaxPhone: faker.random.word(),
             Phone: faker.random.word(),
             ContactName: faker.random.word(),
             ContactEmail: faker.random.word(),
             ContactPhone: faker.random.words(),
             JobLv: faker.random.word(),
             Scale: faker.random.word(),
             Description: faker.random.word(),
             Remark: faker.random.word(),
             DispIndex: faker.random.number(),
             Create_time: faker.date.past()
         }
     }),
     stock:_.times(20, function () {
         return {
             id: faker.random.uuid(),
             Description: faker.random.word(),
             No: faker.random.word(),
             Name: faker.random.word(),
             Name1: faker.random.word(),
             Name2: faker.random.word(),
             Name3: faker.random.word(),
             Name4: faker.random.word(),
             Name5: faker.random.word(),
             Name6: faker.random.word(),
             Name7: faker.random.word(),
             Name8: faker.random.word(),
             DispIndex: faker.random.number()
         }
     }),
     category:_.times(20, function () {
         return {
             id: faker.random.uuid(),
             Description: faker.random.word(),
             No: faker.random.word(),
             Name: faker.random.word(),
             Type: faker.database.type()
         }
     })
 }
}