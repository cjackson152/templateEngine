class Employee {
    constructor(name, employeeId, email){
        this.name = name;
        this.employeeId = employeeId;
        this.email = email;
        this.title = 'Employee';
       
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.employeeId;
    }




    getPosition(){
        return this.title;
    }

    getEmail(){
        return this.email;
    }
}
module.exports = Employee