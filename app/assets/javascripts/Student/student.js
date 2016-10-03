var SS = SS || {};
SS.studentIndex = function() {
    this.initialize();
   
}
SS.studentIndex.prototype ={
    initialize: function () {
    	
          this.studentFormValid();
          this.createStudent();
          this.getStudentDetails();

       		
    },
    getStudentDetails:function(){
    	 var self=this;
         var table = $('#allStudent #tableStudent').DataTable();
         table.clear();
        
         var school_id=$('#allStudent #hdnSchoolId').val();
         var school_name=$('#allStudent #hdnSchoolName').val();
         var classroom_id=$('#allStudent #hdnClassId').val();
         var class_name=$('#allStudent #hdnClassName').val(); 
         var subjects="";

          alert(school_id);
        $.ajax({
            url: '/students/filtered_index',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            data:{classroom_id:classroom_id},
            success: function (data, textStatus, jqXHR){
                
                console.log("Student Details");
                console.log(data);
                 $.each(data, function(i,item){

                 table.row.add( $(
                 	
                    '<tr>'+
                    '<td>'+item.name+'</td>'+
                    '<td>'+item.school_details.name+'</td>'+
                    '<td>'+item.classroom.name+'</td>'+
                  
                    '<td>'+item.father_name+'</td>'+
                    '<td>'+item.mother_name+'</td>'+
                    '<td>'+item.phone_no+'</td>'+
                    '<td>'+item.address+'</td>'+
                    '<td>'+item.city+'</td>'+
					          '<td>'+item.zipcode+'</td>'+
					          '<td>'+item.state+'</td>'+
                    
                    '<td><button type="button" class="btn btn-info" id="editStudent" student_id='+item.id+' school_name='+item.school_details.name+' school_id='+school_id+'>'+'Edit</button></td>'+
                    '<td><button type="button" class="btn btn-info" id="destroyStudent" student_id='+item.id+'>'+'Delete</button></td>'+
                    
                    '<tr>'
                    )).draw();
                    });

                   self.editStudent();
       			   self.deleteStudent();
       					
             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	 });
    },
    editStudent:function(){
    	var self = this;
		
		$('#allStudent #editStudent').unbind();
			$('#allStudent #editStudent').click(function(e){
				e.preventDefault();
				 student_id = $(this).attr('student_id');
				 school_name=$(this).attr('school_name');
				 school_id=$(this).attr('school_id');
           		 alert(student_id);
           		 $('#allStudent').addClass('hidden');
            	 $('#editStudentContainer').removeClass('hidden');

        	$.ajax({
            url: '/students/'+student_id,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#editStudentContainer #editStudentForm #schoolName').val(school_name);
                 $('#editStudentContainer #editStudentForm #classroomName').val(classroom_name);
                 $('#editStudentContainer #editStudentForm #studentName').val(data.name);
                 $('#editStudentContainer #editStudentForm #fatherName').val(data.father_name);
                 $('#editStudentContainer #editStudentForm #motherName').val(data.mother_name);
                 $('#editStudentContainer #editStudentForm #phoneNo').val(data.phone_no);
                 $('#editStudentContainer #editStudentForm #address').val(data.address);
                 $('#editStudentContainer #editStudentForm #city').val(data.city);
                 $('#editStudentContainer #editStudentForm #zipcode').val(data.zipcode);
                 $('#editStudentContainer #editStudentForm #state').val(data.state);
                // :father_name, :mother_name, :phone_no, :address, :city, :zipcode, :state  
                 $('#editStudentContainer #editStudentForm #hdnStudentId').val(data.id);
                 $('#editStudentContainer #editStudentForm #hdnClassId').val(data.classroom_id);
                 $('#editStudentContainer #editStudentForm #hdnSchoolId').val(data.school_id);
                 self.updateStudentDetails(data.id,data.classroom_id,school_id);
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
        	});
    },
    deleteStudent:function(){
      $('#allStudent #destroyStudent').unbind();
      $('#allStudent #destroyStudent').click(function(){
         student_id = $(this).attr('student_id');
        
  
        if(confirm('Are you sure!'))
        {
          $.ajax({
            url: '/students/'+student_id,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#allStudent').removeClass('hidden');
                
                 var studentIndex=new SS.studentIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
            } 
          });
          }

    });
    },
    createStudent:function(){
    	$('#createStudentContainer #createStudentForm #btnCreateStudent').unbind();
		  $('#createStudentContainer #createStudentForm #btnCreateStudent').click(function(e){
		  	alert("Join");
			
			e.preventDefault();
			
			var student_data = {school_id:$("#hdnSchoolId").val(), classroom_id:$("#hdnClassId").val(),
			name:$("#studentName").val(),father_name:$("#fatherName").val(),
			mother_name:$("#motherName").val(),phone_no:$("#createStudentForm #phoneNo").val(),
			address:$("#address").val(),city:$("#city").val(),zipcode:$("#zipcode").val(),
			state:$("#state").val()
			}
			 if($('#createStudentContainer #createStudentForm').valid()){
				console.log(student_data);
			 $.ajax({
            url: '/students',

            type: 'POST',
            data: {student:student_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	// alert("done");
                 $('#allStudent').removeClass('hidden');
                 $('#createStudentContainer').addClass('hidden');
            	   var studentIndex=new SS.studentIndex();
                
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
    updateStudentDetails:function(student_id,classroom_id,school_id){
    	var self=this;
 	  $('#editStudentContainer #editStudentForm #btnEditStudent').unbind();
		$('#editStudentContainer #editStudentForm #btnEditStudent').click(function(e){
			e.preventDefault();
			
			var student_data = {school_id:school_id, classroom_id:classroom_id,
			name:$("#editStudentForm #studentName").val(),father_name:$("#editStudentForm #fatherName").val(),
			mother_name:$("#editStudentForm #motherName").val(),phone_no:$("#editStudentForm #phoneNo").val(),
			address:$("#editStudentForm #address").val(),city:$("#editStudentForm #city").val(),zipcode:$("#editStudentForm #zipcode").val(),
			state:$("#editStudentForm #state").val()
			}
			console.log(student_data);
			 if($('#editStudentContainer #editStudentForm').valid()){
				 $.ajax({
	            url: '/students/'+student_id,

	            type: 'PUT',
	            data: {student:student_data},
	            
	            format: 'JSON',

	            success: function (data, textStatus, jqXHR){
	            	
	               	$('#allStudent').removeClass('hidden');
                	$('#editStudentContainer').addClass('hidden');
            		  var studentIndex=new SS.studentIndex();
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
    studentFormValid: function(){
	 $("#createStudentContainer #createStudentForm").validate ({
      rules: {
        student_name: {
          required: true
        },
        father_name:{
        	required:true
        },
        mother_name:{
        	required:true
        },
        student_phone: {
          required: true
        },
        student_address: {
          required: true
        },
        student_city: {
          required: true
        },
        student_zipcode: {
          required: true
        },
        student_state: {
          required: true
        },
        
        student_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        student_zipcode:{
          required: true,
          digits: true,
         
        }
      },
      messages : {
        student_name: {
            required: 'Student Name Required'
        },
        father_name:{
        	required: 'Father Name Required'
        },
        mother_name:{
        	required: 'Mother Name Required'
        },
        student_phone: {
            required: 'Phone No Required'
        },
        student_address: {
            required: 'School Address Required'
        },
        student_city: {
            required: 'City Required'
        },
        student_zipcode: {
          required: 'Zipcode Required'
        },
        student_state: {
          required: 'State Required'
        }
      }
    });
	  $("#editStudentContainer #editStudentForm").validate ({
      rules: {
        student_name: {
          required: true
        },
        father_name:{
        	required:true
        },
        mother_name:{
        	required:true
        },
        student_phone: {
          required: true
        },
        student_address: {
          required: true
        },
        student_city: {
          required: true
        },
        student_zipcode: {
          required: true
        },
        student_state: {
          required: true
        },
        
        student_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        student_zipcode:{
          required: true,
          digits: true,
         
        }
      },
      messages : {
        student_name: {
            required: 'Student Name Required'
        },
        father_name:{
        	required: 'Father Name Required'
        },
        mother_name:{
        	required: 'Mother Name Required'
        },
        student_phone: {
            required: 'Phone No Required'
        },
        student_address: {
            required: 'School Address Required'
        },
        student_city: {
            required: 'City Required'
        },
        student_zipcode: {
          required: 'Zipcode Required'
        },
        student_state: {
          required: 'State Required'
        }
      }
    });
}
}