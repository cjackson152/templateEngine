// base constructor for all profiles
class EmployeeProfile {
    constructor(employeeInfo){
        this.name = employeeInfo.name;
        this.position = employeeInfo.position;
        this.email = employeeInfo.email;
        this.title = employee.getPosition();

        this.html;
    }
// generates html
    createHtml() {
        this.html = 
        `<div class ='col col-md-4 col-lg-6 col-xl-6'>

        <div class='employeeProfile'>

        <div class='info mt-3 p-3'>

        <span class='employeePosition'>${this.position}</span>

        </div>`;

        this.html +=
        
        `<div class='body'>


        <h4 class='title'>${this.name}</h2>

        <ol class ='text list-roster'>

        <li class='list-group-item><span class='font-weight-bolder'>Phone:</span> ${this.phone}</li>

        <li class='list-group-item><span class='font-weight-bolder'>Email:</span> ${this.email}</li>`;


        switch(this.position.toLowerCase()){
            case 'engineer':
                this.html += `<li class='list-group-item'><span class='font-weight-bolder'>Github: </span>${this.github}</li>`;
                break;
            case 'intern' :
                this.html += `<li class='list-group-item'><span class='font-weight-bolder'>School: </span>${this.school}</li>`;
                break;
            default:
                break;
        }
        this.html +=
        `</ol>

        </div>

        </div>

        </div>`;
    }

    buildProfile(){
        return this.html;
    }
}
module.exports = EmployeeProfile;