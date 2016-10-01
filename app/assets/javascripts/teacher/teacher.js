var SS = SS || {};
SS.teacherIndex = function() {
    this.initialize();
   
}
SS.teacherIndex.prototype ={
    initialize: function () {
    	
          this.fillAllTeacher();
          this.saveTeacher();
          this.getTeacherDetails();
       		
    },
    getTeacherDetails:function(){
    	 var self=this;
         var table = $('#allTeacher #tableTeacher').DataTable();
         table.clear();
        
         // var school_id=$('#allTeacher #hdnSchool').val();
         // var school_name=$('#allTeacher #hiddenSchoolName').val();
         var school_id=$('#allTeacher #hiddenSchoolId').val();
         // var class_name=$('#allTeacher #hdnClassName').val(); 
         var subjects="";

          alert(school_id);
        $.ajax({
            url: '/teachers/filtered_index',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{school_id:school_id},
            success: function (data, textStatus, jqXHR){
                
                console.log("Teacher Details");
                console.log(data);
                 $.each(data, function(i,item){
                 
                 table.row.add( $(
                 	// alert(item.name);
                    '<tr>'+
                    '<td>'+item.school_details.name+'</td>'+
                    '<td>'+item.classroom_details[0].name+'</td>'+
                    '<td>'+item.name+'</td>'+
                    '<td>'+item.gender+'</td>'+
                    '<td>'+item.phone_no+'</td>'+
                    '<td>'+item.subject_details[0].name+'</td>'+
                   
                   
                    '<td><a id="editTeacher" teacher_id='+item.id+' school_name='+item.school_details.name+' school_id='+school_id+'>'+'Edit</a></td>'+
                    '<td><a id="destroyTeacher" teacher_id='+item.id+'>'+'Delete</a></td>'+
                    
                    '<tr>'
                    )).draw();
                    });

                   self.editTeacher();
       			  		 self.deleteTeacher();
       						// subjects=item.subject_details[i][].name
             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	 });
    },
    fillAllTeacher:function(){
    	$('#allTeacher #createTeacher').unbind();
		  $('#allTeacher #createTeacher').click(function(e){
		  	var school_id=$('#createTeacherContainer #createTeacherForm #schoolIdHidden').val();

		  		alert(school_id);
		 	      $('#allTeacher').addClass('hidden');
          	$('#createTeacherContainer').removeClass('hidden');
            var teacherIndex=new SS.teacherIndex();

		  $.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                
                 $.each(data, function(i,item){
                   	// $("#ddlSubject").append($("<option />").val(data.id).text(data.Text));
                   	$("#createTeacherContainer #createTeacherForm #ddSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	
 		});
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
                 	$("#createTeacherContainer #createTeacherForm #ddClassroom").append('<option value="' + item.id + '">' + item.name + '</option>');
                 });

             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	 });
		});
    },
    deleteTeacher:function(){
    	$('#allTeacher #destroyTeacher').unbind();
			$('#allTeacher #destroyTeacher').click(function(){
				 teacher_id = $(this).attr('teacher_id');
				
           		 alert(teacher_id);
           		if(confirm('Are you sure!'))
				{
        	$.ajax({
            url: '/teachers/'+teacher_id,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#allTeacher').removeClass('hidden');
                
            	 	 var teacherIndex=new SS.teacherIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      		}

	});
    },
    editTeacher:function(){
    	var self = this;
		var schoolId = '';
		$('#allTeacher #editTeacher').unbind();
			$('#allTeacher #editTeacher').click(function(e){
				e.preventDefault();
				 teacher_id = $(this).attr('teacher_id');
				 school_name=$(this).attr('school_name');
				 school_id=$(this).attr('school_id');
           		 alert(teacher_id);
           		 $('#allTeacher').addClass('hidden');
            	 $('#editTeacherContainer').removeClass('hidden');

        	$.ajax({
            url: '/teachers/'+teacher_id,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#editTeacherContainer #editTeacherForm #schoolName').val(school_name);
                 $('#editTeacherContainer #editTeacherForm #teacherName').val(data.name);
                 $('#editTeacherContainer #editTeacherForm #phoneNo').val(data.phone_no);
                 $('#editTeacherContainer #editTeacherForm #schoolIdHidden').val(data.id);
                 // var selected = $(data.gender).val();
								 // $("#editTeacherContainer #editTeacherForm #gender :selected").val(data.gender);   
                 self.updateTeacherDetails(school_id,teacher_id);
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
                   	$("#editTeacherContainer #editTeacherForm #ddSubject").append('<option value="' + item.id + '">' + item.name + '</option>');

                  });
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	
 			});
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
                 	$("#editTeacherContainer #editTeacherForm #ddClassroom").append('<option value="' + item.id + '">' + item.name + '</option>');
                 });

             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	 });
		});
		

    },
    saveTeacher:function(){
    	$('#createTeacherContainer #createTeacherForm #btnCreateTeacher').unbind();
		  $('#createTeacherContainer #createTeacherForm #btnCreateTeacher').click(function(e){
		  	alert("Join");
			
			 e.preventDefault();
			var subject_ids=new Array();
			var classroom_ids=new Array();
			 $('#createTeacherContainer #createTeacherForm #ddSubject :selected').each(function(i, selected){
                   subject_ids[i] = $(selected).val();
               });

			$('#createTeacherContainer #createTeacherForm #ddClassroom :selected').each(function(i, selected){
                   classroom_ids[i] = $(selected).val();
               });

			 console.log(subject_ids);
			 console.log(classroom_ids);

			var teacher_data = {name:$("#teacherName").val(), phone_no:$("#phoneNo").val(),
			gender:$("#gender :selected").val(),school_id:$("#schoolIdHidden").val(),
			subject_ids:subject_ids,classroom_ids:classroom_ids}
			// if($('#newSchoolContainer #createForm').valid()){
				console.log(teacher_data);
			 $.ajax({
            url: '/teachers',

            type: 'POST',
            data: {teacher:teacher_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	alert("done");
               	$('#allTeacher').removeClass('hidden');
                $('#createTeacherContainer').addClass('hidden');
            	 var teacherIndex=new SS.teacherIndex();
                
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
    updateTeacherDetails:function(school_id,teacher_id){
    	var self=this;
 	  $('#editTeacherContainer #editTeacherForm #btnEditTeacher').unbind();
		$('#editTeacherContainer #editTeacherForm #btnEditTeacher').click(function(e){
			e.preventDefault();
			alert("fgvljhgkjuh.kj");
			var subject_ids=new Array();
			var classroom_ids=new Array();
			 $('#editTeacherContainer #editTeacherForm #ddSubject :selected').each(function(i, selected){
                   subject_ids[i] = $(selected).val();
               });
				$('#editTeacherContainer #editTeacherForm #ddClassroom :selected').each(function(i, selected){
                   classroom_ids[i] = $(selected).val();
               });

			 console.log(subject_ids);
			 console.log(classroom_ids);

			var teacher_data = {name:$("#editTeacherForm  #teacherName").val(), phone_no:$(" #editTeacherForm  #phoneNo").val(),
			gender:$("#editTeacherForm #gender :selected").val(),school_id:school_id,
			subject_ids:subject_ids,classroom_ids:classroom_ids}
			// if($('#newSchoolContainer #createForm').valid()){
				console.log(teacher_data);
			
			// if($('#editSchoolContainer #editForm').valid()){
				 $.ajax({
	            url: '/teachers/'+teacher_id,

	            type: 'PUT',
	            data: {teacher:teacher_data},
	            
	            format: 'JSON',

	            success: function (data, textStatus, jqXHR){
	            	
	               	$('#allTeacher').removeClass('hidden');
                	$('#editTeacherContainer').addClass('hidden');
            		  var teacherIndex=new SS.teacherIndex();
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