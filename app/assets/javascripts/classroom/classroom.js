var SS = SS || {};
SS.classroomIndex = function() {
    this.initialize();
   
}
SS.classroomIndex.prototype ={
    initialize: function () {
    	    this.classroomFormValid();
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
                  subjects="";
                
                var  total_subject = item.subject_details;
                    for (var j=0;j<total_subject.length;j++) {
                      subjects+=total_subject[j].name+', ';
                    }
                 subjects=subjects.substring(0, subjects.length-2);

                 table.row.add( $(
                 
                    '<tr>'+
                    '<td>'+item.school_details.name+'</td>'+
                    '<td>'+item.name+'</td>'+
                    '<td>'+item.number_of_students+'</td>'+
                    '<td>'+subjects+'</td>'+
                   
                    '<td><button type="button" id="editClassroom" classroom_id='+item.id+' school_name='+item.school_details.name+' school_id='+school_id+'>'+'Edit</button></td>'+
                    '<td><button type="button" id="destroyClassroom" classroom_id='+item.id+'>'+'Delete</button></td>'+
                    '<td><button type="button" id="viewStudent" school_id='+school_id+' school_name='+item.school_details.name+' classroom_id='+item.id+' classroom_name='+item.name+'>View Student</button></td>'+
                  
                    '<tr>'
                    )).draw();
                    });

                  self.editClassroom();
       						self.deleteClassroom();
       						// self.showTeacher();
             //      self.showTeacher();
                  self.showStudent();
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
			if($('#createClassroomContainer #createClassForm').valid()){
				console.log(classroom_data);
			 $.ajax({
            url: '/classrooms',

            type: 'POST',
            data: {classroom:classroom_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	alert("done");
               	$('#allClassroom').removeClass('hidden');
                $('#createClassroomContainer').addClass('hidden');
            	  var classroomIndex=new SS.classroomIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      	});
			}
			else{
				alert("Please Complete form first!!")
			}
			
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
    var subjects="";
		$('#allClassroom #editClassroom').unbind();
			$('#allClassroom #editClassroom').click(function(e){
				e.preventDefault();
				 classroom_id = $(this).attr('classroom_id');
				 school_name=$(this).attr('school_name');
				 school_id=$(this).attr('school_id');
           		 alert(classroom_id);
           		 $('#allClassroom').addClass('hidden');
            	 $('#editClassroomContainer').removeClass('hidden');

               $("#editClassroomContainer #editClassForm #ddSubject").empty();

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
        	$.ajax({
            // url: '/classrooms/'+classroom_id,
            // type: 'GET',
            // contentType: 'application/json',
            // format: 'JSON',
            url: '/classrooms/filtered_index_classroom',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{classroom_id:classroom_id},
            success: function (data, textStatus, jqXHR){

                var  total_subject = data[0].subject_details;
                    for (var j=0;j<total_subject.length;j++) {
                      subjects+=total_subject[j].id+',';
                    }
                
                console.log(subjects);
                 console.log("showing",data);
                 $('#editClassroomContainer #editClassForm #schoolName').val(school_name);
                 $('#editClassroomContainer #editClassForm #classroomName').val(data[0].name);
                 $('#editClassroomContainer #editClassForm #numberOfStudent').val(data[0].number_of_students);
                 
                 $('#editClassroomContainer #editClassForm #classHidden').val(data[0].id);
                  // $('#editClassroomContainer #editClassForm #ddSubject').val(subjects);
                 
                  $.each(subjects.split(","), function(i,e){
                      $("#ddSubject option[value='" + e + "']").prop("selected", true);
                     
                  });
                 self.updateClassroomDetails(classroom_id,school_id);
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
			
			var subject_ids=new Array();
			 $('#editClassForm #ddSubject :selected').each(function(i, selected){
                   subject_ids[i] = $(selected).val();
               });
			
			var classroom_data = {name:$("#editClassForm #classroomName").val(), 
			number_of_students:$("#editClassForm #numberOfStudent").val(),school_id:school_id,
			subject_ids:subject_ids}
			console.log(classroom_data);
			if($('#editClassroomContainer #editClassForm').valid()){
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
		 	}
		 else{
		 	alert("Please Complete form first!!");

		 }

	  });
 },
 
 showStudent:function(){
  $('#allClassroom #tableClassroom #viewStudent').unbind();
      $('#allClassroom #tableClassroom #viewStudent').click(function(e){
      e.preventDefault();

        school_name=$(this).attr('school_name');
        school_id = $(this).attr('school_id');
        classroom_name=$(this).attr('classroom_name');
        class_id = $(this).attr('classroom_id');
     
         
        $('#allStudent  #hdnSchoolName').val(school_name);
        $('#allStudent #hdnSchoolId').val(school_id);
        $('#allStudent #hdnClassId').val(class_id);
        $('#allStudent  #hdnClassName').val(classroom_name);
           
        $('#createStudentContainer #createStudentForm #classroomName').val(classroom_name);
        $('#createStudentContainer #createStudentForm #hdnClassId').val(class_id);
        $('#createStudentContainer #createStudentForm #hdnSchoolId').val(school_id);
        $('#createStudentContainer #createStudentForm #schoolName').val(school_name);

         $('#allStudent').removeClass('hidden');
         $('#allClassroom').addClass('hidden');
         var studentIndex=new SS.studentIndex();
    });
 },
  classroomFormValid: function(){
   $("#createClassroomContainer #createClassForm").validate ({
      rules: {
        
        classroom_name: {
          required: true
        },
        no_of_student: {
          required: true
        },
        classroom_subject: {
          required: true
        },
        
        
        no_of_student: {
          required: true,
          digits: true
          
        }
        
      },
      messages : {
        classroom_name: {
            required: 'Classroom Name Required'
        },
        no_of_student:{
          required: 'Number Of Students Required'
        },
        classroom_subject:{
          required: 'Subject Requiredd'
        },
         teacher_subject: {
            required: 'Subject Required'
        }
        
       
      }
    });
    $("#editClassroomContainer #editClassForm").validate ({
      rules: {
        
        classroom_name: {
          required: true
        },
        no_of_student: {
          required: true
        },
        classroom_subject: {
          required: true
        },
        
        
        no_of_student: {
          required: true,
          digits: true
          
        }
        
      },
      messages : {
        classroom_name: {
            required: 'Classroom Name Required'
        },
        no_of_student:{
          required: 'Number Of Students Required'
        },
        classroom_subject:{
          required: 'Subject Requiredd'
        },
         teacher_subject: {
            required: 'Subject Required'
        }
       
      }
    });
}

}