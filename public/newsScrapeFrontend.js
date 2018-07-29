$(document).ready(function() {

        

    $("#scrape").on("click", function() {

        event.preventDefault();

        console.log(`scrape button`);

        $.ajax({
            url: "/scrape",
            method: "GET"
          }).done(function(res) {

            window.location.replace("/");

           });  
    });

});