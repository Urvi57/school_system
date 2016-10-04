var SS = SS || {};
SS.schoolIndex = function() {
    this.initialize();
   
}
SS.schoolIndex.prototype ={
    initialize: function () {
        this.showSchoolData();
    	  this.schoolFormValid();// validation
        this.getSchoolDetails();
        this.saveSchoolData();
        
        this.showSchoolDetails();

    },
  getSchoolDetails: function () {
    var self=this;
    var table = $('#dvSchool #dvChildSchool #tableSchool').DataTable();
      table.clear();
      table.draw();
      console.log("Working");
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
            '<td><button type="button" id="showSchool" school_id='+item.id+' class="btn btn-info">'+'Show</button></td>'+
            '<tr>'
             )[0]).draw();
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
           		 // alert(schoolId);
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
                    '<td><button type="button" id="editSchool" schoolId='+data.id+' class="btn btn-info">Edit'+'</button></td>'+
                    '<td><button type="button" id="destroySchool" schoolId='+data.id+' data: { confirm: "Are you sure?" } class="btn btn-danger">Destroy'+'</button></td>'+
                    // '<td><a id="createClassroom" schoolId='+data.id+' schoolName='+data.name+'>Create Classroom'+'</a></td>'+
                    '<td><button type="button" id="viewClassroom" schoolId='+data.id+' schoolName='+data.name+' class="btn btn-info">View Classroom'+'</button></td>'+
                    '<td><button type="button" id="viewTeacher" school_id='+data.id+' school_name='+data.name+' class="btn btn-info">View Teacher</button></td>'+
                    
                    '<tr>'
                    )).draw();
                    // });
                 self.editSchoolDetails();
                 self.destroySchoolDetails();
                 // self.createClassroom();
                 self.viewClassroomDetails();
                 self.showTeacher();
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
				
           		 // alert(schoolId);
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
   var self=this;
 	  $('#editSchoolContainer #editForm #btneditSchool').unbind();
		$('#editSchoolContainer #editForm #btneditSchool').click(function(e){
			e.preventDefault();
			
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
           		 // alert(schoolId);
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

 createClassroom: function() {
    $('#dvshowSchool #schoolDetails #createClassroom').unbind();
    $('#dvshowSchool #schoolDetails #createClassroom').click(function(){
        // console.log("urvashi");
        schoolId = $(this).attr('schoolId');
        schoolName=$(this).attr('schoolName');

        $('#createClassroomContainer #createClassForm #classHidden').val(schoolId);
        $('#createClassroomContainer #createClassForm #schoolName').val(schoolName);

         $('#createClassroomContainer').removeClass('hidden');
         $('#dvshowSchool').addClass('hidden');
         var classroomIndex=new SS.classroomIndex();
    });
 },
 viewClassroomDetails: function(){

    $('#dvshowSchool #schoolDetails #viewClassroom').unbind();
    $('#dvshowSchool #schoolDetails #viewClassroom').click(function(){
        // console.log("urvashi");
        schoolId = $(this).attr('schoolId');
        schoolName=$(this).attr('schoolName');

        $('#allClassroom  #classHidden').val(schoolId);
        $('#allClassroom #classHiddenSchool').val(schoolName);

        $('#createClassroomContainer #createClassForm #classHidden').val(schoolId);
        $('#createClassroomContainer #createClassForm #schoolName').val(schoolName);

         $('#allClassroom').removeClass('hidden');
         $('#dvshowSchool').addClass('hidden');
         var classroomIndex=new SS.classroomIndex();
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
showTeacher: function(){
  
    $('#dvshowSchool #schoolDetails #viewTeacher').unbind();
      $('#dvshowSchool #schoolDetails #viewTeacher').click(function(e){
      e.preventDefault();
        // console.log("urvashi");
        // schoolId = $(this).attr('schoolId');
        school_name=$(this).attr('school_name');
        school_id = $(this).attr('school_id');
       
     
        // $('#allTeacher  #hdnSchool').val(school_id);
        $('#allTeacher  #hdnSchoolName').val(school_name);
        $('#allTeacher #hiddenSchoolId').val(school_id);
        $('#createTeacherContainer #createTeacherForm #schoolHidden').val(school_name);
        $('#createTeacherContainer #createTeacherForm #schoolIdHidden').val(school_id);
        $('#createTeacherContainer #createTeacherForm #schoolName').val(school_name);
        // $('#allTeacher #hdnClassName').val(classroom_name);

        // $('#createClassroomContainer #createClassForm #classHidden').val(schoolId);
        // $('#createClassroomContainer #createClassForm #schoolName').val(schoolName);

         $('#allTeacher').removeClass('hidden');
         $('#dvshowSchool').addClass('hidden');
         var teacherIndex=new SS.teacherIndex();
    });
 },
 showSchoolData: function () {
    var self=this;
    var schoolId =''; 
    $('#allTeacher #back').click(function(){
      schoolId = $('#allTeacher #hiddenSchoolId').val();
               // alert(schoolId);
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
            // '<td><a id="createClassroom" schoolId='+data.id+' schoolName='+data.name+'>Create Classroom'+'</a></td>'+
            '<td><a id="viewClassroom" schoolId='+data.id+' schoolName='+data.name+'>View Classroom'+'</a></td>'+
            '<td><a id="viewTeacher" school_id='+data.id+' school_name='+data.name+'>View Teacher</a></td>'+
            '<tr>'
             )).draw();
                    // });
           self.editSchoolDetails();
           self.destroySchoolDetails();
           // self.createClassroom();
           self.viewClassroomDetails();
           self.showTeacher();
          },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
          } 
          });
    });
  },
   showSchool: function () {
        var self=this;
        var schoolId =''; 
         $('#allClassroom #back').click(function(){
            schoolId = $('#allClassroom #hiddenSchoolId').val();
               // alert(schoolId);
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
                // '<td><a id="createClassroom" schoolId='+data.id+' schoolName='+data.name+'>Create Classroom'+'</a></td>'+
                '<td><a id="viewClassroom" schoolId='+data.id+' schoolName='+data.name+'>View Classroom'+'</a></td>'+
                '<td><a id="viewTeacher" school_id='+data.id+' school_name='+data.name+'>View Teacher</a></td>'+
                '<tr>'
              )).draw();
                    // });
            self.editSchoolDetails();
            self.destroySchoolDetails();
            // self.createClassroom();
            self.viewClassroomDetails();
            self.showTeacher();
          },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
          } 
        });
     });
  }

}


