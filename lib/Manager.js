const Employee = require('./Employee');
class Manager extends Employee {
    constructor(name, position, email, phone) {
        super(name, position, email);
        this.title = 'Manager';
        this.phone = phone;
    }
    getPosition(){
        return this.position;
    }
    getPhone() {
        return this.phone;
    }
}
module.exports = Manager