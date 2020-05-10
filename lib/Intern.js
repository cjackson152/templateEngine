const Employee = require('./Employee');

class Intern extends Employee {
    constructor(name, position, email, school) {
        super(name, position, email);
        this.title = 'Intern';
        this.school = school;
    }
    getPosition() {
        return this.title;
    }

    getSchool() {
        return this.school;
    }
}
module.exports = Intern;