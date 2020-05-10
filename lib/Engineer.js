const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, position, email, github) {
        super(name, position, email);
        this.title = 'Engineer';
        this.github = github;
    }

    getPosition(){
        return this.title;
    }
    getGithub(){
        return this.github;
    }
}
module.exports = Engineer;