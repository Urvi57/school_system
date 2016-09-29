var SS = SS || {};

SS.schoolIndex = function() {
    this.initialize();
}

SS.schoolIndex.prototype = {

    initialize:function() {
       
        this.get_school_details();
        
    },
    get_school_details : function(){
        // var patient_id=$('.patient-header #user-id').val();
        alert("hello");
        var self=this;

         var table = $('#dvSchool #dvChildSchool #tableSchool').DataTable();
         table.clear();
        $.ajax({
            url: 'schools',
            type: 'GET',
           
            contentType: 'application/json',
             format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                
                console.log("Schools Details");
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                
            }
        });
    }
}
;
