    $('#add_user').submit(function(event) {
         alert("User Created Succesfully!");
        });


        //  after fixing the axios.get error this is the submit function to save the updated user, map function is to save the user info to the id
        $('update_user').submit( (event) => {
            event.preventDefault();

            const unindexed_array = $(this).serializedArray();
            var data = []

                $.map(unindexed_array, function(n, i) {
                        data[n['name']]=['value']
                })
            console.log(unindexed_array);

            const req = {
                "url":' http://localhost:5000/api/users/$(data.id)',
                "method" : "PUT",
                "data": data
            }

            $.ajax(req).done(function(res){
                alert('Data Updated Successfully!');
            })
        })

        // Delete
        if(window.location.pathname =="/"){
            $ondelete = $(".table tbody td a.delete");
            $ondelete.click(function(){
                var id = $(this).attr("data-id")

                
            const req = {
                "url":' http://localhost:5000/api/users/$(id)',
                "method" : "DELETE",
            }

             if(confirm("Do you really want to delete this record")){

                $.ajax(req).done(function(res){
                    alert('Data Deleted Successfully!');
                    location.reload();
                })
             }

            })
        }