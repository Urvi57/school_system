var SS = SS || {};
SS.schoolIndex = function() {
    this.initialize();
   
}
SS.schoolIndex.prototype ={
    initialize: function () {
    	//this.formSetup();// validation
        this.getSchoolDetails();
        this.saveSchoolData();
        //this.updateSchoolDetails();
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
        // do error handling here
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
                    '<td><a id="destroySchool" schoolId='+data.id+'>Destroy'+'</a></td>'+
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
		$('#newSchoolContainer #tblSchool #saveSchool').unbind();
		$('#newSchoolContainer #tblSchool #saveSchool').click(function(){
			
			var school_data = {name:$("#schoolName").val(), 
			address:$("#schoolAddress").val(),city:$("#schoolCity").val(),zipcode:$("#schoolZipcode").val(),
			state:$("#schoolState").val(),phone_no: $('#schoolPhoneno').val()}
			
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

	  });
	},
	editSchoolDetails: function(){
		var schoolId = '';
		$('#dvshowSchool #schoolDetails #editSchool').unbind();
			$('#dvshowSchool #schoolDetails #editSchool').click(function(){
				 schoolId = $(this).attr('schoolId');
				
           		 alert(schoolId);
           		 $('#dvshowSchool').addClass('hidden');
            	 $('#editSchoolContainer').removeClass('hidden');

       	//	if($(#editForm).valid()){


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
 updateSchoolDetails: function()
 {
 	$('#editSchoolContainer #editForm #btneditSchool').unbind();
		$('#editSchoolContainer #editForm #btneditSchool').click(function(){
			var self=this;
			var school_data = {name:$("#editForm #schoolName").val(), 
			address:$("#editForm #schoolAddress").val(),city:$("#editForm #schoolCity").val(),
			zipcode:$("#editForm #schoolZipcode").val(),
			state:$("#editForm #schoolState").val(),phone_no: $('#editForm #schoolPhoneno').val()}

			// console.log(school_data);
			//var school_id=$('#editSchoolContainer #editForm #schoolHidden').val();

			alert($('#editSchoolContainer #editForm #schoolHidden').val());
			 $.ajax({
            url: '/schools/'+$('#editSchoolContainer #editForm #schoolHidden').val(),

            type: 'PUT',
            data: {school:school_data},
            
            format: 'JSON',

            success: function (data, textStatus, jqXHR){
            	
                 self.showSchoolDetails();
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
      	});

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

          $("#createClassroomContainer #createClassForm #subject").empty()
		  
		  $.ajax({
            url: 'subjects',
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                console.log("Start");
                console.log(data);
                 // $.each(data, function(i,item){
                 // 	$("#ddlSubject").append($("<option />").val(item.id).text(item.Text));
                 // });
             },
             error: function (jqXHR, textStatus, errorThrown) {
        		// do error handling here
      		 }	

 	});
		});
 }
}


