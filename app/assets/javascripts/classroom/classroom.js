var SS = SS || {};
SS.classroomIndex = function() {
    this.initialize();
   
}
SS.classroomIndex.prototype ={
    initialize: function () {
    	
        this.createClassroom();
        this.getClassroomDetails();
       
    },
    createClassroom: function(){
 	$('#dvshowSchool #schoolDetails #createClassroom').unbind();
 	$('#dvshowSchool #schoolDetails #createClassroom').click(function(){
 		 $('#dvshowSchool').addClass('hidden');
          $('#createClassroomContainer').removeClass('hidden');
          schoolId = $(this).attr('schoolId');
          schoolName = $(this).attr('schoolName');
          alert(schoolName);
          $('#createClassroomContainer #createClassForm #schoolName').val(schoolName);
          $('#createClassroomContainer #createClassForm #classHidden').val(schoolId);

          $("#createClassroomContainer #createClassForm #ddlSubject").empty()
		  
		  $.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                console.log("Classroom");
                console.log(data);
                 $.each(data, function(i,item){
                  	// $("#ddlSubject").append($("<option />").val(data.id).text(data.Text));
                  	$("#createClassForm #ddlSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	

 		});
	});
 },
    getClassroomDetails:function(){
    	
    }

}