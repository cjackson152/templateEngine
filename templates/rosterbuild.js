class buildRoster {
    constructor(team) {
        this.team = team;

        this.html =
            `
            <!doctype html>
            <html lang="en">
            <head>
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <!-- Bootstrap CSS -->
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <title>Vick Houston Team</title>

            <style>

            .employeePosition {
                font-size: 1.15rem;
            }

            .badge {
                width: 50%;
            }

            </style>

            </head>

            <body>


            <h2 class="text-center">Meet The Team</h1>

            <div class="container">

            <div id="htmlbase" class="row">

            ${this.team}

            </div>

            </div>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"></script>
            </body>
            </html> 
            `;
    }

    buildTeam() {
        return this.html;
    }
}

module.exports = buildRoster;
