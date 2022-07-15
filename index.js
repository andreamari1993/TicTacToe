var arr = new Array(3);
var move_count = 1;

// A $( document ).ready() block.
$(document).ready(function() {
    $("#btn-play-again").hide();
    $("#row-1").hide();
    $("#row-2").hide();
    $("#row-3").hide();
    $("#row-4").hide();
    var d = new Date();

    $("#p-footer").html("&copy;" + d.getFullYear() + " Copyright by: ");
    // create 2D
    for (i = 0; i < arr.length; i++) {
        arr[i] = new Array(3);
    }
    // create 3D
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < arr[0].length; j++) {
            arr[i][j] = new Array(3);
        }
    }
});

$("#player1").change(function() {
    //debugger;
    var p1 = $("#player1").val();
    var p2 = $("#player2").val();
    if (move_count % 2 == 0) {

        $("#player").html(p2);
    } else {

        $("#player").html(p1);
    }
    checkP1AndP2NotEmpty(p1, p2);

});

$("#player2").change(function() {
    var p1 = $("#player1").val();
    var p2 = $("#player2").val();
    if (move_count % 2 == 0) {
        $("#player").html(p2);
    } else {

        $("#player").html(p1);
    }

    checkP1AndP2NotEmpty(p1, p2);
});

$("#move").change(function() {
    var char = '';
    var bg_color = '';
    var p1 = $("#player1").val();
    var p2 = $("#player2").val();
    var choice = parseInt($("#move").val());
    if (isNaN(choice) || (choice <= 0 || choice > 9)) {
        alert("Si prega di inserire un numero compreso tra 1 e 9");
        return;
    }

    console.log(move_count);
    if (move_count % 2 == 0) {
        char = "O";


    } else {
        char = "X";
    }

    if (choice >= 1 && choice <= 3) {

        var j = 0;
        switch (choice) {
            case 2:
                j = 1
                break;
            case 3:
                j = 2;
                break;
        }
        var checkIsFree = checkCellIsFree(0, j);
        if (checkIsFree) {
            setChoice(0, j, char);
        } else {
            console.log(move_count);
            alert("La cella selezionata \u00E9 gi\u00E0 stata marcata!");
            return;
        }

    }
    if (choice >= 4 && choice <= 6) {
        var j = 0;
        switch (choice) {
            case 5:
                j = 1
                break;
            case 6:
                j = 2;
                break;
        }
        var checkIsFree = checkCellIsFree(1, j);
        if (checkIsFree) {
            setChoice(1, j, char);
        } else {
            console.log(move_count);
            alert("La cella selezionata \u00E9 gi\u00E0 stata marcata!");
            return;
        }
    }

    if (choice >= 7 && choice <= 9) {
        var j = 0;
        switch (choice) {
            case 8:
                j = 1
                break;
            case 9:
                j = 2;
                break;
        }
        var checkIsFree = checkCellIsFree(2, j);
        if (checkIsFree) {
            setChoice(2, j, char);
        } else {
            console.log(move_count);
            alert("La cella selezionata \u00E9 gi\u00E0 stata marcata!");
            return;
        }
    }

    if (move_count % 2 == 0) {

        bg_color = "beige";

        $("#player").html(p1);


    } else {
        bg_color = "cadetblue";
        $("#player").html(p2);
    }


    $("#span-" + choice).html(char);

    $("#col-" + choice).css("background-color", bg_color);

    $("#move").val('');

    var hasWin = checkWin();
    if (hasWin) {
        $("#move").attr("disabled", "disabled");
        $("#btn-play-again").show();
        if (move_count % 2 == 0) {
            alert('Ha vinto il giocatore: ' + p2);

        } else {
            alert('Ha vinto il giocatore: ' + p1);
        }
        move_count = 10;
        return;
    }
    move_count++;
    //console.log(move_count);
    if (move_count >= 10) {
        $("#move").attr("disabled", "disabled");
        alert("La partita \u00E9 terminata ed avete pareggiato!");
        $("#btn-play-again").show();
    }
});

function checkWin() {
    var ret = false;

    //Horizontal Winning Condtion
    //Winning Condition For First Row
    if (arr[0][0] == arr[0][1] && arr[0][1] == arr[0][2]) {
        ret = true;
    }
    //Winning Condition For Second Row
    if (arr[1][0] == arr[1][1] && arr[1][1] == arr[1][2]) {
        ret = true;
    }
    //Winning Condition For Third Row
    if (arr[2][0] == arr[2][1] && arr[2][1] == arr[2][2]) {
        ret = true;
    }

    //vertical Winning Condtion
    //Winning Condition For First Column
    else if (arr[0][0] == arr[1][0] && arr[1][0] == arr[2][0]) {
        ret = true;
    }
    //Winning Condition For Second Column
    else if (arr[0][1] == arr[1][1] && arr[1][1] == arr[2][1]) {
        ret = true;
    }
    //Winning Condition For Third Column
    else if (arr[0][3] == arr[1][2] && arr[1][2] == arr[2][2]) {
        ret = true;
    }

    //Diagonal Winning Condition
    else if (arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2]) {
        ret = true;
    } else if (arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0]) {
        ret = true;
    }

    return ret;
}

function checkCellIsFree(i, j) {
    return arr[i][j] != "X" && arr[i][j] != "O";
}

function setChoice(i, j, value) {
    arr[i][j] = value;
    // console.log(arr);
}

function playAgain() {
    window.location.href = window.location.href;
}

function checkP1AndP2NotEmpty(p1, p2) {
    if (!stringIsNullOrWhiteSpace(p1) && !stringIsNullOrWhiteSpace(p2)) {
        $("#row-1").show();
        $("#row-2").show();
        $("#row-3").show();
        $("#row-4").show();
    }
}

//This method is used to check if a string is null or empty or undefined or with white space.
function stringIsNullOrWhiteSpace(input) {
    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}