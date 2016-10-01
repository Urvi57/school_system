var SS = SS || {};
SS.classroomIndex = function() {
    this.initialize();
   
}
SS.classroomIndex.prototype ={
    initialize: function () {
    	
          this.fillDataClass();
          this.saveClassroomData();
          this.getClassroomDetails();
       		
    },
    fillDataClass: function(){
    	var self=this;
    	// alert("1111");
    	
      // $("#createClassroomContainer #createClassForm #ddSubject").empty()
		  $('#allClassroom #createClassroom').unbind();
		  $('#allClassroom #createClassroom').click(function(e){
		  	
		 	      $('#allClassroom').addClass('hidden');
          	$('#createClassroomContainer').removeClass('hidden');
            var classroomIndex=new SS.classroomIndex();

		  $.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                // console.log("Classroom///");
                // console.log("con",data);
                 $.each(data, function(i,item){
                   	// $("#ddlSubject").append($("<option />").val(data.id).text(data.Text));
                   	$("#createClassroomContainer #createClassForm #ddSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	
 		});
		});
	
 },
    getClassroomDetails:function(){
    	 var self=this;
         var table = $('#allClassroom #tableClassroom').DataTable();
         table.clear();
        
         var school_id=$('#allClassroom #classHidden').val();
         var school_name=$('#allClassroom #classHiddenSchool').val();
         var subjects="";
          alert(school_id);
        $.ajax({
            url: '/classrooms/filtered_index',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{school_id:school_id},
            success: function (data, textStatus, jqXHR){
                
                console.log("Classroom Details");
                console.log(data);
                 $.each(data, function(i,item){
                 
                 table.row.add( $(
                 
                    '<tr>'+
                    '<td>'+item.school_details.name+'</td>'+
                    '<td>'+item.name+'</td>'+
                    '<td>'+item.number_of_students+'</td>'+
                    '<td>'+item.subject_details[i].name+'</td>'+
                   
                    '<td><a id="editClassroom" classroom_id='+item.id+' school_name='+item.school_details.name+' school_id='+school_id+'>'+'Edit</a></td>'+
                    '<td><a id="destroyClassroom" classroom_id='+item.id+'>'+'Delete</a></td>'+
                    
                    '<tr>'
                    )).draw();
                    });

                  self.editClassroom();
       						self.deleteClassroom();
       						self.showTeacher();
       						// subjects=item.subject_details[i][].name
             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	 });
    },
    saveClassroomData :function(){
    	$('#createClassroomContainer #createClassForm #btnCreateClass').unbind();
		  $('#createClassroomContainer #createClassForm #btnCreateClass').click(function(e){
		  	alert("Join");
			// var dataString = $('#newSchoolContainer #createForm').serialize();
			// e.preventdefault();
			var subject_ids=new Array();
			 $('#ddSubject :selected').each(function(i, selected){
                   subject_ids[i] = $(selected).val();
               });
			
			 console.log(subject_ids);

			var classroom_data = {name:$("#classroomName").val(), 
			number_of_students:$("#numberOfStudent").val(),school_id:$("#classHidden").val(),
			subject_ids:subject_ids}
			// if($('#newSchoolContainer #createForm').valid()){
				console.log(classroom_data);
			 $.ajax({
            url: '/classrooms',

            type: 'POST',
            data: {classroom:classroom_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	alert("done");
             //   	$('#dvSchool').removeClass('hidden');
             //    $('#newSchoolContainer').addClass('hidden');
            	// var schoolIndex=new SS.schoolIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      	});
			// }
			// else{
			// 	alert("Please form first!!")
			// }
			
	  });
    },
    deleteClassroom : function(){
    	$('#allClassroom #destroyClassroom').unbind();
			$('#allClassroom #destroyClassroom').click(function(){
				 classroom_id = $(this).attr('classroom_id');
				
           		 alert(classroom_id);
           		if(confirm('Are you sure!'))
				{
        	$.ajax({
            url: '/classrooms/'+classroom_id,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#allClassroom').removeClass('hidden');
                
            	 	 var classroomIndex=new SS.classroomIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      		}

	});
 },
editClassroom: function(){
	var self = this;
		var schoolId = '';
		$('#allClassroom #editClassroom').unbind();
			$('#allClassroom #editClassroom').click(function(e){
				e.preventDefault();
				 classroom_id = $(this).attr('classroom_id');
				 school_name=$(this).attr('school_name');
				 school_id=$(this).attr('school_id');
           		 alert(classroom_id);
           		 $('#allClassroom').addClass('hidden');
            	 $('#editClassroomContainer').removeClass('hidden');

        	$.ajax({
            url: '/classrooms/'+classroom_id,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#editClassroomContainer #editClassForm #schoolName').val(school_name);
                 $('#editClassroomContainer #editClassForm #classroomName').val(data.name);
                 $('#editClassroomContainer #editClassForm #numberOfStudent').val(data.number_of_students);
                 
                 $('#editClassroomContainer #editClassForm #classHidden').val(data.id);
                    
                 self.updateClassroomDetails(classroom_id,school_id);
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});

      		$.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                // console.log("Classroom///");
                // console.log("con",data);
                 $.each(data, function(i,item){
                   	// $("#ddlSubject").append($("<option />").val(data.id).text(data.Text));
                   	$("#editClassroomContainer #editClassForm #ddSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	
 		});

			});
},
updateClassroomDetails: function(classroom_id,school_id)
 {
   var self=this;
 	  $('#editClassroomContainer #editClassForm #btnEditClass').unbind();
		$('#editClassroomContainer #editClassForm #btnEditClass').click(function(e){
			e.preventDefault();
			alert("fgvljhgkjuh.kj");
			var subject_ids=new Array();
			 $('#editClassForm #ddSubject :selected').each(function(i, selected){
                   subject_ids[i] = $(selected).val();
               });
			
			var classroom_data = {name:$("#editClassForm #classroomName").val(), 
			number_of_students:$("#editClassForm #numberOfStudent").val(),school_id:school_id,
			subject_ids:subject_ids}
			console.log(classroom_data);
			// if($('#editSchoolContainer #editForm').valid()){
				 $.ajax({
	            url: '/classrooms/'+classroom_id,

	            type: 'PUT',
	            data: {classroom:classroom_data},
	            
	            format: 'JSON',

	            success: function (data, textStatus, jqXHR){
	            	
	               	$('#allClassroom').removeClass('hidden');
                	$('#editClassroomContainer').addClass('hidden');
            		  var classroomIndex=new SS.classroomIndex();
            		  // self.getClassroomDetails();
	             },
	             error: function (jqXHR, textStatus, errorThrown) {
	        		// do error handling here
	      		}	

	      		});
		 // 	}
		 // else{
		 // 	alert("Complete form first");

		 // }

	  });
 }
 

}