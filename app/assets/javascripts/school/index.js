var SS = SS || {};
SS.schoolIndex = function() {
    this.initialize();
   
}
SS.schoolIndex.prototype ={
    initialize: function () {
        this.getSchoolDetails();
        this.saveSchoolData();
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
       		});
     		var table = $('#dvshowSchool #dvChildSchool #tableShowSchool').DataTable();
         	table.clear();
        $.ajax({
            url: 'schools/'+schoolId,
            type: 'GET',
            contentType: 'application/json',
            format: 'JSON',
            
            success: function (data, textStatus, jqXHR){
                
                console.log("School Details");
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
                    '<tr>'
                    )).draw();
                    // });
                 
             },
             error: function (jqXHR, textStatus, errorThrown) {
        // do error handling here
      		}	
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
	}
     
}


