let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../routes/index');
let should = chai.should();



chai.use(chaiHttp);

describe('/GET restaurants', () => {
    it('it should GET all the restaurants', (done) => {
      chai.request(server)
          .get('/getAllRestros')
          .end((err, res) => {
              console.log(res);
                res.body.should.be.a('array');
                
            done();
          });
    });
});