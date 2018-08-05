$(document).ready(function() {


    $("#scrape").on("click", function() {


        event.preventDefault();
        $.ajax({
            url: "/scrape",
            method: "GET"
          }).done(function(res) {

            location.reload(true);

           });  
    });


    $(document).on("click", ".comment-btn", function() {

        event.preventDefault();

        let _id = $(this).data('id');
        let comment = $('#'+_id+'comment').val().trim();
        let username = $('#'+_id+'username').val().trim();

        if(comment === '' || username === ''){

            $('#errorModal').modal('show');
            return;

        }


        let commentToPost = {

            comment: comment,
            username: username        
        }


        $.ajax({
            url: `/${_id}`,
            method: "POST",
            data: commentToPost
            
          }).done(function(res) {

            location.reload(true);

           });  
    });


});

