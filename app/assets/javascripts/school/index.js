var SS = SS || {};
SS.schoolIndex = function() {
    this.initialize();
   
}
SS.schoolIndex.prototype ={
    initialize: function () {
    	this.schoolFormValid();// validation
        this.getSchoolDetails();
        this.saveSchoolData();
        
        this.showSchoolDetails();
    },
     getSchoolDetails: function () {
     		var self=this;
     		var table = $('#dvSchool #dvChildSchool #tableSchool').DataTable();
         table.clear();
         
        $.ajax({
            url: 'schools',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                
                console.log("School Details");
                console.log(data);
                 $.each(data, function(i,item){
                 
                 table.row.add( $(
                    '<tr>'+
                    '<td>'+item.name+'</td>'+
                    '<td>'+item.phone_no+'</td>'+
                    '<td>'+item.address+'</td>'+
                    '<td>'+item.city+'</td>'+
                    '<td>'+item.zipcode+'</td>'+
                    '<td>'+item.state+'</td>'+
                    '<td><a id="showSchool" school_id='+item.id+'>'+'Show</a></td>'+
                    '<tr>'
                    )).draw();
                    });
                 self.showSchoolDetails();
             },
             error: function (jqXHR, textStatus, errorThrown) {
       
      		}	
      	
      	});
  },
  showSchoolDetails: function () {
     		var self=this;
     		var schoolId = '';
     		 $('#dvSchool #dvChildSchool #showSchool').click(function(){
         		 schoolId = $(this).attr('school_id');
           		 alert(schoolId);
           		 $('#dvSchool').addClass('hidden');
            	 $('#dvshowSchool').removeClass('hidden');

       		
     		var table = $('#dvshowSchool #schoolDetails #tableShowSchool').DataTable();
         	table.clear();
        $.ajax({
            url: '/schools/'+schoolId,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                
                console.log("Show School");
                console.log(data);
                 // $.each(data, function(i,item){
                 
                 table.row.add( $(
                    '<tr>'+
                    '<td>'+data.name+'</td>'+
                    '<td>'+data.phone_no+'</td>'+
                    '<td>'+data.address+'</td>'+
                    '<td>'+data.city+'</td>'+
                    '<td>'+data.zipcode+'</td>'+
                    '<td>'+data.state+'</td>'+
                    '<td><a id="editSchool" schoolId='+data.id+'>Edit'+'</a></td>'+
                    '<td><a id="destroySchool" schoolId='+data.id+' data: { confirm: "Are you sure?" }>Destroy'+'</a></td>'+
                    '<td><a id="createClassroom" schoolId='+data.id+' schoolName='+data.name+'>Create Classroom'+'</a></td>'+
                    '<tr>'
                    )).draw();
                    // });
                 self.editSchoolDetails();
                 self.destroySchoolDetails();
                 self.createClassroom();
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      		});
      	});
	},
saveSchoolData: function () {
		$('#newSchoolContainer #createForm #saveSchool').unbind();
		$('#newSchoolContainer #createForm #saveSchool').click(function(){
			
			var school_data = {name:$("#schoolName").val(), 
			address:$("#schoolAddress").val(),city:$("#schoolCity").val(),zipcode:$("#schoolZipcode").val(),
			state:$("#schoolState").val(),phone_no: $('#schoolPhoneNo').val()}
			if($('#newSchoolContainer #createForm').valid()){
			 $.ajax({
            url: '/schools',

            type: 'POST',
            data: {school:school_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){

               	$('#dvSchool').removeClass('hidden');
                $('#newSchoolContainer').addClass('hidden');
            	var schoolIndex=new SS.schoolIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      	});
			}
			else{
				alert("Please form first!!")
			}
			
	  });
	},
	editSchoolDetails: function(){
		var self = this;
		var schoolId = '';
		$('#dvshowSchool #schoolDetails #editSchool').unbind();
			$('#dvshowSchool #schoolDetails #editSchool').click(function(e){
				e.preventDefault();
				 schoolId = $(this).attr('schoolId');
				
           		 alert(schoolId);
           		 $('#dvshowSchool').addClass('hidden');
            	 $('#editSchoolContainer').removeClass('hidden');

       		//if($('#editForm').valid()){


        	$.ajax({
            url: '/schools/'+schoolId,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#editSchoolContainer #editForm #schoolName').val(data.name);
                 $('#editSchoolContainer #editForm #schoolPhoneNo').val(data.phone_no);
                 $('#editSchoolContainer #editForm #schoolAddress').val(data.address);
                 $('#editSchoolContainer #editForm #schoolCity').val(data.city);
                 $('#editSchoolContainer #editForm #schoolZipcode').val(data.zipcode);
                 $('#editSchoolContainer #editForm #schoolState').val(data.state);
                 $('#editSchoolContainer #editForm #schoolHidden').val(data.id);
                    
                self.updateSchoolDetails(schoolId);
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      		// }
      		// else
      		// {
      		// 	alert("pls check form first");
      		// }

			});
	},
 updateSchoolDetails: function(schoolId)
 {
 	$('#editSchoolContainer #editForm #btneditSchool').unbind();
		$('#editSchoolContainer #editForm #btneditSchool').click(function(e){
			e.preventDefault();
			var self=this;
			var school_data = {name:$("#editForm #schoolName").val(), 
			address:$("#editForm #schoolAddress").val(),city:$("#editForm #schoolCity").val(),
			zipcode:$("#editForm #schoolZipcode").val(),
			state:$("#editForm #schoolState").val(),phone_no: $('#editForm #schoolPhoneNo').val()}
			if($('#editSchoolContainer #editForm').valid()){
				 $.ajax({
	            url: '/schools/'+schoolId,

	            type: 'PUT',
	            data: {school:school_data},
	            
	            format: 'JSON',

	            success: function (data, textStatus, jqXHR){
	            	
	               	$('#dvSchool').removeClass('hidden');
                	$('#editSchoolContainer').addClass('hidden');
            		var schoolIndex=new SS.schoolIndex();
	             },
	             error: function (jqXHR, textStatus, errorThrown) {
	        		// do error handling here
	      		}	

	      		});
		 	}
		 else{
		 	alert("Complete form first");

		 }

	  });
 },
 destroySchoolDetails: function(){
 		$('#dvshowSchool #schoolDetails #destroySchool').unbind();
			$('#dvshowSchool #schoolDetails #destroySchool').click(function(){
				 schoolId = $(this).attr('schoolId');
				
           		 alert(schoolId);
           		
        	$.ajax({
            url: '/schools/'+schoolId,
            type: 'DELETE',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){

                 console.log(data.name);
                 $('#dvSchool').removeClass('hidden');
                 $('#newSchoolContainer').addClass('hidden');
            	 var schoolIndex=new SS.schoolIndex();
                
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      			}	
      		});
      		

	});
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
schoolFormValid: function(){
	 $("#newSchoolContainer #createForm").validate ({
      rules: {
        school_name: {
          required: true
        },
        school_phone: {
          required: true
        },
        school_address: {
          required: true
        },
        school_city: {
          required: true
        },
        school_zipcode: {
          required: true
        },
        school_state: {
          required: true
        },
        
        school_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        school_zipcode:{
          required: true,
          digits: true,
         
        }
      },
      messages : {
        school_name: {
            required: 'School Name Required'
        },
        school_phone: {
            required: 'Phone No Required'
        },
        school_address: {
            required: 'School Address Required'
        },
        school_city: {
            required: 'City Required'
        },
        school_zipcode: {
          required: 'Zipcode Required'
        },
        school_state: {
          required: 'State Required'
        }
      }
    });
	 $("#editSchoolContainer #editForm").validate ({
      rules: {
        school_name: {
          required: true
        },
        school_phone: {
          required: true
        },
        school_address: {
          required: true
        },
        school_city: {
          required: true
        },
        school_zipcode: {
          required: true
        },
        school_state: {
          required: true
        },
        
        school_phone: {
          required: true,
          digits: true,
          minlength: 10,
          maxlength: 10
        },
        school_zipcode:{
          required: true,
          digits: true,
         
        }
      },
      messages : {
        school_name: {
            required: 'School Name Required'
        },
        school_phone: {
            required: 'Phone No Required'
        },
        school_address: {
            required: 'School Address Required'
        },
        school_city: {
            required: 'City Required'
        },
        school_zipcode: {
          required: 'Zipcode Required'
        },
        school_state: {
          required: 'State Required'
        }
      }
    });
},

}


