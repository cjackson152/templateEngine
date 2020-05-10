class Employee {
    constructor(name, position, email){
        this.name = name;
        this.position = position;
        this.email = email;
    }

    getname(){
        return this.name;
    }

    getPosition(){
        return this.position;
    }

    getEmail(){
        return this.email;
    }
}
module.exports = Employee