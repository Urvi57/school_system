var SS = SS || {};

SS.schoolIndex = function () {
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
        var modal_box;
        $.ajax({
            url: 'schools',
            type: 'GET',
            //headers:{},
            contentType: 'application/json',
            // format: 'JSON',
            beforeSend:function(){
                // self.hideLoaderModal();
                // self.showLoaderModal('Loading Existing Schools....');
            },
            success: function (data, textStatus, jqXHR){
                // setTimeout(function(){
                //     self.hideLoaderModal();
                // }, 2000);
                // self.decorateFormForUpdate(data);
                console.log("Schools Details");
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // do error handling here
                //self.hideLoaderModal();
            }
        });
    }
}
;
