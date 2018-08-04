$(document).ready(function() {

        

    $("#scrape").on("click", function() {

        event.preventDefault();

        console.log(`scrape button`);

        $.ajax({
            url: "/scrape",
            method: "GET"
          }).done(function(res) {

            console.log(`res from scrape: ${res}`);

           });  
    });

});