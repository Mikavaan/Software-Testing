import chai from "chai"
import add from "../src/add.js"

const expect = chai.expect

describe("testiTesti", () => {
 it("Testaa testauksen", () =>{
     expect(add(1,2)).to.eql(3)
 });
})